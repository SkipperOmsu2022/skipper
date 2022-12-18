import  {makeAutoObservable} from 'mobx';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
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

    addNewMessage = (dialogId, senderId, recevierId) => {
        const msgId = -this.interlocutors[dialogId].messages.length
        
        this.interlocutors[dialogId].messages.push({
            id: msgId,
            userFrom: senderId,
            userTo: recevierId,
            messageContent: this.input,
            dateTimeSend: new Date()
        });
        
        this.input = '';
    }

    setInterlocutors = (res) => {
        console.log(res)
        for (var key in res) {
            const imageUserResource = res[key]?.imageUserResource ? 
                `${enviroments.apiBase}${res[key]?.imageUserResource}` : 
                photo;

            this.interlocutors.push({
                firstName: res[key]?.firstName,
                lastName: res[key]?.lastName,
                imageUserResource: imageUserResource,
                userId: res[key]?.userId,
                messages: res[key]?.messages
            })
        }
        console.log(this.interlocutors)
    }

    setActiveDialog = (id) => {
        this.activeDialog = id;
        this.activeInterlocutor = this.interlocutors[id]
    }

    setStompClient = () => {
        let socket = new SockJS(enviroments.apiBase + '/chat');
        this.stompClient = Stomp.over(socket)

        this.stompClient.connect({}, (frame) => {
            console.log("connected to: " + frame);
            
            this.stompClient.subscribe("/topic/messages/" + this.user.id, this.getMessage);
        });
    }

    getMessage = (response) => {
        console.log(response)
        let data = JSON.parse(response.body);
        console.log('Пришли данные с сервера: ' + JSON.stringify(data));
        console.log(data);
    }
}

export default new messagesStore();