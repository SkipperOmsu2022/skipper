import  {makeAutoObservable, runInAction} from 'mobx';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import axios from "axios";
import enviroments from '../config/enviroments';
import photo from "../resources/profile-photo.jpg"

class messagesStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    user = null;
    activeDialog = null;
    activeInterlocutor = null;
    input = ''

    interlocutors = []
    stompClient = {}

    setUser = (res) => {
        const imageUserResource = res?.data?.imageUserResource ? 
            `${enviroments.apiBase}${res?.data?.imageUserResource}` : 
            photo;
        const id = localStorage.getItem('logged')

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

    addNewMessage = (dialogId, senderId, recevierId, ) => {
        const msgId = -this.interlocutors[dialogId].messages.length

        this.sendMessage()
        
        this.interlocutors[dialogId].messages.push({
            id: msgId,
            userFrom: senderId,
            userTo: recevierId,
            messageContent: this.input,
            dateTimeSend: new Date()
        });
        
        this.input = '';
    }

    sendMessage = () => {
        this.stompClient.send(`/app/chat/${this.user.id}/${this.activeInterlocutor.userId}`, {}, JSON.stringify({
            messageContent: this.input
        }));
    }

    getMessage = (response) => {
        console.log(response)
        let data = JSON.parse(response.body);
        console.log('Пришли данные с сервера: ' + JSON.stringify(data));
        console.log(data);

        let dialogId;

        this.interlocutors.forEach((item, i) => {
            if (+item.userId === data?.userFrom) {
                dialogId = i;
            }
        })
        
        if (dialogId === undefined) {
            dialogId = this.interlocutors.length;

            axios.request({
                    url : `${enviroments.apiBase}/api/chat/user-info/${data?.userFrom}`,
                    method: 'get'
                })
                .then(res => {
                    console.log(res)

                    const imageUserResource = res?.data?.imageUserResource ? 
                        `${enviroments.apiBase}${res?.data?.imageUserResource}` : 
                        photo;

                    this.interlocutors.push({
                        firstName: res.data?.firstName,
                        lastName: res.data?.lastName,
                        imageUserResource: imageUserResource,
                        userId: res.data?.userId,
                        messages: [],
                        mentorSpecializations: res.data?.mentorSpecializations
                    })
                    const msgId = -this.interlocutors[dialogId].messages.length;

                    this.interlocutors[dialogId].messages.push({
                        id: msgId,
                        userFrom: data?.userFrom,
                        userTo: this.user.id,
                        messageContent: data?.messageContent,
                        dateTimeSend: data?.dateTimeSend
                    });
                })
        } else {
            const msgId = -this.interlocutors[dialogId].messages.length;

            this.interlocutors[dialogId].messages.push({
                id: msgId,
                userFrom: data?.userFrom,
                userTo: this.user.id,
                messageContent: data?.messageContent,
                dateTimeSend: data?.dateTimeSend
            });  
        }
    }

    setInterlocutors = (res) => {
        console.log(res)
        for (let key in res) {
            const imageUserResource = res[key]?.imageUserResource ? 
                `${enviroments.apiBase}${res[key]?.imageUserResource}` : 
                photo;

            this.interlocutors.push({
                firstName: res[key]?.firstName,
                lastName: res[key]?.lastName,
                imageUserResource: imageUserResource,
                userId: res[key]?.userId,
                messages: res[key]?.messages,
                mentorSpecializations: res[key]?.mentorSpecializations
            })
        }
        console.log(this.interlocutors)
    }

    setActiveDialog = (id) => {
        this.activeDialog = id;
        this.activeInterlocutor = this.interlocutors[id]
    }
    
    openUserDialog = (id) => {
        let dialogId;

        this.interlocutors.forEach((item, i) => {
            if (+item.userId === +id) {
                dialogId = i;
            }
        })

        if(dialogId !== undefined) {
            this.setActiveDialog(dialogId)
        } else {
            dialogId = this.interlocutors.length;

            axios.request({
                url : `${enviroments.apiBase}/api/chat/user-info/${id}`,
                method: 'get'
            })
            .then(res => {
                console.log(res)

                const imageUserResource = res?.data?.imageUserResource ? 
                    `${enviroments.apiBase}${res?.data?.imageUserResource}` : 
                    photo;

                this.interlocutors.push({
                    firstName: res.data?.firstName,
                    lastName: res.data?.lastName,
                    imageUserResource: imageUserResource,
                    userId: res.data?.userId,
                    messages: [],
                    mentorSpecializations: res.data?.mentorSpecializations
                })
                this.setActiveDialog(dialogId)
            })
        }
    }

    setStompClient = () => {
        let socket = new SockJS(enviroments.apiBase + '/chat');
        this.stompClient = Stomp.over(socket)

        this.stompClient.connect({}, (frame) => {
            console.log("connected to: " + frame);
            
            this.stompClient.subscribe("/topic/messages/" + this.user.id, this.getMessage);
        });
    }

    clearStore = () => {
        this.user = null;
        this.activeDialog = null;
        this.activeInterlocutor = null;
        this.input = ''

        this.interlocutors = []
    }

    disconnect = () => {
        this.stompClient.disconnect()
        this.stompClient = {}
    }
}

export default new messagesStore();