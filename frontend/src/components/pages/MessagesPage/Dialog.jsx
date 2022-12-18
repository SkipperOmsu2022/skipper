import addBtn from "../../../resources/icons/add-btn.svg"
import sendBtn from "../../../resources/icons/send-btn.svg"

import React, { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom';

import { observer } from "mobx-react-lite";
import messagesStore from "../../../store/messagesStore";

function addZero(str) {
    return ('0' + str).slice(-2)
}

const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
            "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

const Message = ({item, i}) => {
    const {userId, imageUserResource, lastName, firstName} = messagesStore.activeInterlocutor
    const photo = item.userFrom ===  userId ? imageUserResource : messagesStore.user.imageUserResource

    const name = item.userFrom === messagesStore.activeInterlocutor.userId ?
        `${lastName} ${firstName}` :
        `${messagesStore.user.lastName} ${messagesStore.user.firstName}`

    const date = new Date(item.dateTimeSend)
    const previousDate = new Date(messagesStore.activeInterlocutor.messages[i-1]?.dateTimeSend)

    const newDay = date.getDate() <= previousDate.getDate() ? null :
        <div className="chat-body__date">
            {`${date.getDate()} ${months[date.getMonth()]}`}
        </div>

    const newBlock = date.getTime() - previousDate.getTime() > 600000 ||
        item.userFrom !== messagesStore.activeInterlocutor.messages[i-1]?.userFrom

    console.log(item.id)

    return (
        <>
            {newDay}
            {newBlock || newDay ? 
                <div className='chat-body__message'>
                    <img className="chat-body__message-user-photo" src={photo} alt="" />
                    <div className="chat-body__message-content">
                        <div className='chat-body__message-header'>
                            <span className='name'>{name}</span>
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
    const container = useRef();
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        
        return () => document.removeEventListener("click",  handleClickOutside);
    }, []);

    const handleDropdownClick = () => setDropdownDisplay((dropdownDisplay) => !dropdownDisplay);

    const handleClickOutside = (e) => {
        if (container.current && !container.current.contains(e.target)) {
            setDropdownDisplay(false);
        }
    };

    const dropdown = `dropdown ${dropdownDisplay ? '' : 'hide'}`;

    return (
        <>
            <div className="chat-header">
                <img className="chat-header__photo" src={messagesStore.activeInterlocutor.imageUserResource} alt="" />
                <div className="chat-header__main-info">
                    <div className="name">
                        {`${messagesStore.activeInterlocutor.lastName} ${messagesStore.activeInterlocutor.firstName}`}
                    </div>
                    <div className="specialty">Тестировщик</div>
                </div>
                <div className="chat-header__interaction">
                    <Link
                        to={`/profile-mentor/${messagesStore.activeInterlocutor.userId}`}
                        className="chat-header__interaction-button button"
                    >
                        Посмотреть профиль
                    </Link>
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
                {messagesStore.activeInterlocutor.messages.map((item, i) => 
                    <Message 
                        item={item}
                        i={i}
                        key={item.id}
                    />
                )}
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
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (messagesStore.input) {
                                messagesStore.addNewMessage(messagesStore.activeDialog);
                            }
                        }
                    }}
                />
                <img src={sendBtn} className='chat-input__button' alt="send" />
            </div>
        </>
    )
})

export default Dialog;


/* 
<div className="chat-body__date">12 декабря</div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Добрый день!
            </span>
        </div>
    </div>
    <div className='chat-body__message no-photo'>
        <div className="chat-body__message-content">
            <span>
                Вы посмотрели мою отчётность?
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className="chat-body__date">13 декабря</div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
    <div className='chat-body__message'>
        <img className="chat-body__message-user-photo" src={photo} alt="" />
        <div className="chat-body__message-content">
            <div className='chat-body__message-header'>
                <span className='name'>Имя Фамилия</span>
                <span className='time'>12:10</span>
            </div>
            <span>
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                Какое-то сообщение.Какое-то сообщение
                Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
            </span>
        </div>
    </div>
*/