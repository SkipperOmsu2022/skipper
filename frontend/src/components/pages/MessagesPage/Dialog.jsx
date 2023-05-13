import addBtn from "../../../resources/icons/add-btn.svg"
import sendBtn from "../../../resources/icons/send-btn.svg"

import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { Link } from 'react-router-dom';

import { observer } from "mobx-react-lite";
import messagesStore from "../../../store/messagesStore";

import ReviewForm from "../../ReviewForm/ReviewForm";
import reviewFormStore from "../../../store/reviewFormStore";

function addZero(str) {
    return ('0' + str).slice(-2)
}

const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

const Message = ({item, i}) => {
    const {userId, imageUserResource, lastName, firstName, messages} = messagesStore.activeInterlocutor
    const photo = item.userFrom ===  userId ? imageUserResource : messagesStore.user.imageUserResource

    const name = item.userFrom === userId ?
        `${lastName} ${firstName}` :
        `${messagesStore.user.lastName} ${messagesStore.user.firstName}`

    const date = new Date(item.dateTimeSend)
    const previousDate = new Date(messages[i-1]?.dateTimeSend)

    const newDay = date.getDate() <= previousDate.getDate() ? null :
        <div className="chat-body__date">
            {`${date.getDate()} ${months[date.getMonth()]}`}
        </div>
    const newBlock = date.getTime() - previousDate.getTime() > 600000 ||
        item.userFrom !== messages?.slice().sort(comparator)[i-1]?.userFrom

    return (
        <>
            {newDay}
            {newBlock || newDay ? 
                <div className='chat-body__message'>
                    <Link
                        to={`/profile/${item.userFrom}`}
                    >
                        <img className="chat-body__message-user-photo" src={photo} alt="" />
                    </Link>
                    <div className="chat-body__message-content">
                        <div className='chat-body__message-header'>
                        <Link
                            to={`/profile/${item.userFrom}`}
                            className='name'
                        >
                            {name}
                        </Link>
                            <span className='time'>
                                {`${addZero(date.getHours())}:${addZero(date.getMinutes())}`}
                            </span>
                        </div>
                        <span>
                            {item.messageContent}
                        </span>
                    </div>
                </div> :
                <div className='chat-body__message no-photo'>
                    <div className="chat-body__message-content">
                        <span>
                            {item.messageContent}
                        </span>
                    </div>
                </div>
            }
        </>
    )
}

const Dialog = observer(() => {
    const [dropdownDisplay, setDropdownDisplay] = useState(false);
    const [messagesLength, setMessagesLength] = useState(0);
    const container = useRef();

    const messagesEndRef = useRef(null)
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", clearDialog);

        return () => {
            messagesStore.setActiveDialog(null);
            messagesStore.setInput('')
            document.removeEventListener("click",  handleClickOutside)
            document.addEventListener("keydown", clearDialog);
            reviewFormStore.resetStore();
        };
    }, []);

    useLayoutEffect(() => {
        if (messagesLength !== messagesStore.activeInterlocutor.messages.length) {
            const objDiv = document.getElementsByClassName("chat-body")[0];
            objDiv.scrollTop = objDiv.scrollHeight;
            setMessagesLength(messagesStore.activeInterlocutor.messages.length)
        }
    });

    const clearDialog = (e) => {
        if (e.key === "Escape") {
            messagesStore.setActiveDialog(null);
            messagesStore.setInput('')
        }
    }
    
    const sendMessage = (e) => {
        if (e.key === "Enter" || e.type === 'click') {
            if (messagesStore.input) {
                messagesStore.addNewMessage(messagesStore.activeDialog, 
                    messagesStore.user.id, 
                    messagesStore.activeInterlocutor.userId);
            }
        }
    }

    const handleDropdownClick = () => setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownDisplay(false);
        }
    };

    const dropdown = `dropdown ${dropdownDisplay ? '' : 'hide'}`;

    return (
        <>
            <ReviewForm/>
            <div className="chat-header">
                <Link
                    to={`/profile/${messagesStore.activeInterlocutor.userId}`}
                >
                    <img className="chat-header__photo" src={messagesStore.activeInterlocutor.imageUserResource} alt="" />
                </Link>
                <div className="chat-header__main-info">
                    <Link 
                        className="chat-header__name" 
                        to={`/profile/${messagesStore.activeInterlocutor.userId}`}
                    >
                        {`${messagesStore.activeInterlocutor.lastName} ${messagesStore.activeInterlocutor.firstName}`}
                    </Link>
                    <div className="chat-header__specialty">{messagesStore.activeInterlocutor.mentorSpecializations}</div>
                </div>
                <div className="chat-header__interaction">
                    <button
                        className="chat-header__interaction-button button"
                        onClick={() => reviewFormStore.setModal(true)}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                reviewFormStore.setModal(true);
                            }
                        }}
                    >
                        Добавить отзыв
                    </button>
                    <button className='chat-header__interaction-button button additional'>
                        Удалить диалог
                    </button>
                    <div className="complain-btn" ref={container} onClick={handleDropdownClick}
                        onKeyDown={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);
                            }
                        }}
                    > 
                        !
                        <div className={dropdown}>
                            <div className="dropdown-item">Заблокировать пользователя</div>
                            <div className="dropdown-item">Пожаловаться</div> 
                        </div>
                    </div>
                </div>
            </div>
            <div className='chat-body'>
                {messagesStore.activeInterlocutor.messages.slice().sort(comparator).map((item, i) => 
                    <Message 
                        item={item}
                        i={i}
                        key={item.id}
                    />
                )}
                <div ref={messagesEndRef}></div>
            </div>
            <div className='chat-input'>
                <img src={addBtn} className='chat-input__button' alt="add" />
                <textarea
                    className='chat-input__field input'
                    placeholder="Напишите сообщение..."
                    value={messagesStore.input}
                    onChange={(e) => {
                        if (e.target.value !== "\n") messagesStore.setInput(e.target.value)
                    }}
                    onKeyDown={sendMessage}
                />
                <img 
                    src={sendBtn}
                    className='chat-input__button'
                    alt="send"
                    onKeyDown={sendMessage}
                    onClick={sendMessage}
                />
            </div>
        </>
    )
})

const comparator = (a, b) => {
    if (a?.id > b?.id) return 1;
    if (a?.id === b?.id) return 0;
    if (a?.id < b?.id) return -1;
}

export default Dialog;