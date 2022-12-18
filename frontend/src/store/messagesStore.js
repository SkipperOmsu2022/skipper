import  {makeAutoObservable} from 'mobx';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import enviroments from '../config/enviroments';

class messagesStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    userId = localStorage.getItem('logged');
    activeDialog = 3;

    interlocutors = []
    stompClient = {}

    setInterlocutors = (res) => {
        for (var key in res) {
            this.interlocutors.push({id: key})
        }
        console.log(this.interlocutors)
    }

    setActiveDialog = (id) => {
        this.activeDialog = id;
    }

    setStompClient = () => {
        let socket = new SockJS(enviroments.apiBase + '/chat');
        this.stompClient = Stomp.over(socket)

        this.stompClient.connect({}, (frame) => {
            console.log("connected to: " + frame);
            
            this.stompClient.subscribe("/topic/messages/" + this.userId, this.getMessage);
        });
    }

    getMessage = (response) => {
        console.log(response)
        let data = JSON.parse(response.body);
        console.log('Пришли данные с сервера: ' + JSON.stringify(data));
    }
}

export default new messagesStore();