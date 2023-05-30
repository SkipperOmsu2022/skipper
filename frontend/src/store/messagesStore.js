import  {makeAutoObservable} from 'mobx';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import enviroments from '../config/enviroments';
import { getImageUserResource } from '../utils/getImageSource';
import { getChatUserInfo } from '../services/api';

class messagesStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    user = null;
    activeDialog = null;
    activeInterlocutor = null;
    input = ''
    loading = false

    interlocutors = []
    stompClient = null

    setUser = (res, id) => {
        const imageUserResource = getImageUserResource(res?.data?.imageUserResource)
        this.user = {
            id: id,
            firstName: res?.data?.firstName,
            lastName: res?.data?.lastName,
            imageUserResource: imageUserResource
        }
    }

    setInput = (msg) => {
        this.input = msg;
    }

    setLoading = (loading) => {
        this.loading = loading
    }

    getNewMessageId = (dialogId) => {
        return this.interlocutors[dialogId].messages[this.interlocutors[dialogId].messages.length - 1]?.id + 1;
    }

    sendMessage = (e) => {
        if (this.input.length && (e.key === "Enter" || e.type === 'click')) {
            const msgId = this.getNewMessageId(this.activeDialog);

            this.stompClient.send(`/app/chat/${this.user.id}/${this.activeInterlocutor.userId}`, {}, JSON.stringify({
                messageContent: this.input
            }));
            
            this.interlocutors[this.activeDialog].messages.push({
                id: msgId,
                userFrom: this.user.id,
                userTo: this.activeInterlocutor.userId,
                messageContent: this.input,
                dateTimeSend: new Date()
            });
            
            this.input = '';
        } else {
            return null
        }
    }

    getDialogId = (userFrom) => {
        let dialogId = null;
        this.interlocutors.forEach((item, i) => {
            if (+item.userId === +userFrom) {
                dialogId = i;
            }
        })
        return dialogId
    }

    getMessage = async (response) => {
        let data = JSON.parse(response.body);
        
        let dialogId = this.getDialogId(data?.userFrom);

        if (dialogId === null) {
            dialogId = this.interlocutors.length;
            await this.getInterlocutorData(data?.userFrom)
        }
        
        this.interlocutors[dialogId].messages.push({
            id: data?.id,
            userFrom: data?.userFrom,
            userTo: this.user.id,
            messageContent: data?.messageContent,
            dateTimeSend: data?.dateTimeSend
        });  
    }

    setInitialInterlocutors = (res) => {
        for (let key in res) {
            const imageUserResource = getImageUserResource(res[key]?.imageUserResource)

            this.interlocutors.push({
                firstName: res[key]?.firstName,
                lastName: res[key]?.lastName,
                imageUserResource: imageUserResource,
                userId: res[key]?.userId,
                messages: res[key]?.messages,
                mentorSpecializations: res[key]?.mentorSpecializations
            })
        }
    }
    getInterlocutorData = async (userFrom) => {
        const res = await getChatUserInfo(userFrom)
        const imageUserResource = getImageUserResource(res?.data?.imageUserResource)

        this.interlocutors.push({
            firstName: res.data?.firstName,
            lastName: res.data?.lastName,
            imageUserResource: imageUserResource,
            userId: res.data?.userId,
            messages: [],
            mentorSpecializations: res.data?.mentorSpecializations
        })
    }

    setActiveDialog = (id) => {
        if (id === null) {
            this.activeDialog = null;
            this.activeInterlocutor = null
        }
        this.activeDialog = id;
        this.activeInterlocutor = this.interlocutors[id]
    }
    
    openUserDialog = async (id) => {
        if (this.loading || this.stompClient === null) return;
        this.loading = true
        
        let dialogId = this.getDialogId(id);
        
        if(dialogId !== undefined) {
            this.setActiveDialog(dialogId)
            this.loading = false;
        } else {
            dialogId = this.interlocutors.length;
            this.loading = true;

            await this.getInterlocutorData(id)
            this.setActiveDialog(dialogId)
            this.loading = false;
        }
    }

    setStompClient = () => {
        if (this.user.id) {
            let socket = new SockJS(enviroments.apiBase + '/chat');
            this.stompClient = Stomp.over(socket)

            this.stompClient.connect({}, (frame) => {
                this.stompClient.subscribe("/topic/messages/" + this.user.id, this.getMessage);
            });
        }
    }

    clearStore = () => {
        this.user = null;
        this.activeDialog = null;
        this.activeInterlocutor = null;
        this.input = ''

        this.interlocutors = []
    }

    disconnect = () => {
        if (this.user.id) {
            this.stompClient.disconnect()
            this.stompClient = {}
        }
    }
}

export default new messagesStore();