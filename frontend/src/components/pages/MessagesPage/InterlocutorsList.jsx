import photo from "../../../resources/profile-photo.jpg"

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import messagesStore from "../../../store/messagesStore";

const Interlocutor = observer(({dialog}) => {
    useEffect(() => {

    })
    
    const className = `list-chats__item ${+dialog.id === +messagesStore.activeDialog ? 'active' : ''}`

    return (
        <div
            className={className}
            onClick={() => messagesStore.setActiveDialog(dialog.id)}
        >
            <img className='list-chats__item-profile-photo' src={photo} alt=''/>
            <div className='list-chats__item-user-name'>
                Рогачевский Илья
            </div>
        </div>
    )
})

const InterlocutorsList = observer(() => {
    
    return (
        <div className='list-chats'>
            {
                messagesStore.interlocutors.map((dialog) => 
                    <Interlocutor
                        dialog={dialog}
                        key={dialog.id}
                    />
                )
            }
        </div>
    )
})

export default InterlocutorsList;

/* <div className='list-chats'>
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
            <div className="list-chats__item-new-messages">
                99+
            </div>
        </div>
        <div className='list-chats__item'>
            <img className='list-chats__item-profile-photo' src={photo} alt=''/>
            <div className='list-chats__item-user-name'>
                Рогачевский Илья
            </div>
            <div className="list-chats__item-new-messages">
                3
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
    </div> */