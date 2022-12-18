import './MessagesPage.scss';

import { observer } from "mobx-react-lite";

import InterlocutorsList from "./InterlocutorsList";
import Dialog from "./Dialog";
import messagesStore from "../../../store/messagesStore";

const MessagesPage = observer(() => {

    return (
    <div className='_'>
        <div className='msg-section'>
            <div className="msg-section-header">
                Сообщения
            </div>
            <div className="msg-section-content">
                <InterlocutorsList/>
                <div className='chat-wrapper'>
                    <Dialog/>
                </div>
            </div>
        </div>
    </div>
    );
})

export default MessagesPage;