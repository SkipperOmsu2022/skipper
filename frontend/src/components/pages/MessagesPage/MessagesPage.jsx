import cn from 'classnames';

import styles from './MessagesPage.module.css';
import photo from "../../../resources/profile-photo.jpg"

export const MessagesPage = () => {
    return (
    <div className={styles._}>
        <div className={styles.section}>
            <div className={styles.listChats}>
                <div className={styles.listChatsItem}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Рогачевский Илья
                    </div>
                </div>
                <div className={cn(styles.listChatsItem, styles.listChatsItemActive)}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Рогачевский Илья
                    </div>
                </div>
                <div className={styles.listChatsItem}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Рогачевский Илья
                    </div>
                </div>
                <div className={styles.listChatsItem}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Рогачевский Илья
                    </div>
                </div>
                <div className={styles.listChatsItem}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Рогачевский Илья
                    </div>
                </div>
                <div className={styles.listChatsItem}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Какой-то чел с той горы
                    </div>
                </div>
                <div className={styles.listChatsItem}>
                    <img className={styles.listChatsItemProfilePhoto} src={photo} alt=''/>
                    <div className={styles.listChatsItemFullName}>
                        Рогачевский Илья
                    </div>
                </div>
            </div>
            <div className={styles.chatWindowWrapper}>
                <div className={styles.chatWindowHeader}>
                    Рогачевский Илья
                </div>
                <div className={styles.chatWindowBody}>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Вы
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Напиши что-нибудь полезное</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <div>
                            Какое-то сообщение.Какое-то сообщениеКакое-то сообщение.
                            Какое-то сообщение.Какое-то сообщение
                            Какое-то сообщениеКакое-то сообщение.Какое-то сообщение
                        </div>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                    <div className={styles.chatWindowBodyMessage}>
                        <div className={styles.chatWindowBodyHeader}>
                            Рогачевский Илья
                            <span className={styles.chatWindowBodyHeaderDateTime}>12:10</span>
                        </div>
                        <span>Какое-то сообщение</span>
                    </div>
                </div>
                <div className={styles.chatWindowInput}>
                    <input className={styles.chatWindowInputField}/>
                    <button className={styles.chatWindowInputButton}>{'>'}</button>
                </div>
            </div>
        </div>
    </div>
    );
}
