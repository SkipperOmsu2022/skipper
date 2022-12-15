import  {makeAutoObservable} from 'mobx';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import enviroments from '../config/enviroments';

class messagesStore {
    constructor() {
        makeAutoObservable(this, { deep: true })
    }

    userId = localStorage.getItem('logged');
    stompClient = {}

    setStompClient = () => {
        let socket = new SockJS(enviroments.apiBase + '/chat');
        this.stompClient = Stomp.over(socket)

        this.stompClient.connect({}, (frame) => {
            console.log("connected to: " + frame);
            
            this.stompClient.subscribe("/topic/messages/" + this.userId, this.getMessage);
        });
    }

    getMessage = (response) => {
        let data = JSON.parse(response.body);
        console.log('Пришли данные с сервера: ' + JSON.stringify(data));
    }
}

export default new messagesStore();