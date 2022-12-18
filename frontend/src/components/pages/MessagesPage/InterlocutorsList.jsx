import { observer } from "mobx-react-lite";
import messagesStore from "../../../store/messagesStore";

const Interlocutor = observer(({item, id}) => {
    const className = `list-chats__item ${id == messagesStore.activeDialog ? 'active' : ''}`
    
    return (
        <div
            className={className}
            onClick={() => messagesStore.setActiveDialog(id)}
        >
            <img className='list-chats__item-profile-photo' src={item.imageUserResource} alt=''/>
            <div className='list-chats__item-user-name'>
                {`${item.lastName} ${item.firstName}`}
            </div>
        </div>
    )
})

const InterlocutorsList = observer(() => {
    
    return (
        <div className='list-chats'>
            {
                messagesStore.interlocutors.map((item, i) => 
                    <Interlocutor
                        item={item}
                        id={i}
                        key={i}
                    />
                )
            }
        </div>
    )
})

export default InterlocutorsList;