import './MessagesPage.scss';
import photo from "../../../resources/profile-photo.jpg"

export const MessagesPage = () => {
    return (
    <div className='_'>
        <div className='msg-section'>
            <div className='listChats'>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='listChatsItemFullName'>
                        Рогачевский Илья
                    </div>
                </div>
                <div className={'listChatsItem listChatsItemActive'}>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='listChatsItemFullName'>
                        Рогачевский Илья
                    </div>
                </div>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='{listChatsItemFullName'>
                        Рогачевский Илья
                    </div>
                </div>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='{listChatsItemFullName'>
                        Рогачевский Илья
                    </div>
                </div>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='{listChatsItemFullName'>
                        Рогачевский Илья
                    </div>
                </div>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='{listChatsItemFullName'>
                        Рогачевский Илья
                    </div>
                </div>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='{listChatsItemFullName'>
                        Какой-то чел с той горы
                    </div>
                </div>
                <div className='listChatsItem'>
                    <img className='listChatsItemProfilePhoto' src={photo} alt=''/>
                    <div className='{listChatsItemFullName'>
                    Рогачевский Илья
                    </div>
                </div>
            </div>
            <div className='chatWindowWrapper'>
                <div className='chatWindowHeader'>
                    Рогачевский Илья
                </div>
                <div className='chatWindowBody'>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Вы
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Напиши что-нибудь полезное</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <div>
                            Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                            Какое-то сообщение.Какое-то сообщение
                            Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                        </div>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className='chatWindowBodyMessage'>
                        <div className='chatWindowBodyHeader'>
                            Рогачевский Илья
                            <span className='chatWindowBodyHeaderDateTime'>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                </div>
                <div className='chatWindowInput'>
                    <input className='chatWindowInputField'/>
                    <button className='chatWindowInputButton'>{'>'}</button>
                </div>
            </div>
        </div>
    </div>
    );
}
