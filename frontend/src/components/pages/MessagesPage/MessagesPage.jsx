import { useState, useEffect, useRef } from "react"

import './MessagesPage.scss';
import photo from "../../../resources/profile-photo.jpg"
import addBtn from "../../../resources/icons/add-btn.svg"
import sendBtn from "../../../resources/icons/send-btn.svg"

const MessagesPage = () => {
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
    <div className='_'>
        <div className='msg-section'>
            <div className="msg-section-header">
                Сообщения
            </div>
            <div className="msg-section-content">
                <div className='list-chats'>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                    <div className='list-chats__item active'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Какой-то чел с той горы
                        </div>
                    </div>
                    <div className='list-chats__item'>
                        <img className='list-chats__item-profile-photo' src={photo} alt=''/>
                        <div className='list-chats__item-user-name'>
                            Рогачевский Илья
                        </div>
                    </div>
                </div>
                <div className='chat-wrapper'>
                    <div className="chat-header">
                        <img className="chat-header__photo" src={photo} alt="" />
                        <div className="chat-header__main-info">
                            <div className="name">Рогачевский Илья</div>
                            <div className="specialty">Тестировщик</div>
                        </div>
                        <div className="chat-header__interaction">
                            <button className='chat-header__interaction-button button'>
                                Посмотреть профиль
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
                    </div>
                    <div className='chat-input'>
                        <img src={addBtn} className='chat-input__button' alt="add" />
                        <textarea className='chat-input__field input' placeholder="Напишите сообщение..."/>
                        <img src={sendBtn} className='chat-input__button' alt="send" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default MessagesPage;