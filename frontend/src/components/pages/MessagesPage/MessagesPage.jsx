import './MessagesPage.scss';

import { observer } from "mobx-react-lite";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import InterlocutorsList from "./InterlocutorsList";
import Dialog from "./Dialog";
import messagesStore from "../../../store/messagesStore";

const MessagesPage = observer(() => {
    const location = useLocation();

    const chatContent = (
        messagesStore.activeDialog === null ? null : <Dialog/>
    )
    useEffect(() => {
        if (location?.state?.activeDialog) {
            messagesStore.openUserDialog(location.state.activeDialog)
        }
    }, [])

    return (
        <div className='_'>
            <div className='msg-section'>
                <div className="msg-section-header">
                    Сообщения
                </div>
                <div className="msg-section-content">
                    <InterlocutorsList/>
                    <div className='chat-wrapper'>
                        {chatContent}
                    </div>
                </div>
            </div>
        </div>
    );
})

export default MessagesPage;