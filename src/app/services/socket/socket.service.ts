import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable, Subject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { CompatClient, Message, Stomp } from "@stomp/stompjs";
import SockJS from 'sockjs-client'
import { SendMessageDTO } from "../../dtos/message/send-message.dto";
import { MessageResponseDTO } from "../../dtos/message/message-response.dto";

@Injectable({ providedIn: 'root' })
export class SocketService {
    private brokerUrl = `${environment.apiUrl}/ws`
    private stompClient: CompatClient | undefined
    private messageSubject = new Subject<MessageResponseDTO>()
    message = this.messageSubject.asObservable()

    connect(chatID: number) {
        let ws = new SockJS(this.brokerUrl)
        this.stompClient = Stomp.over(ws)
        console.log("Connected to websocket");
        
        this.stompClient.connect({}, () => {
            this.stompClient!.subscribe(`/topic/${chatID}`, (message: Message) => {
                this.onMessageRecived(message.body)
            })
        }, (error: any) => {
            console.error(error)
        })
    }

    onMessageRecived(message: any) {
        this.messageSubject.next(JSON.parse(message))
    }

    send(data: SendMessageDTO) {
        this.stompClient?.send("/app/chat", {}, JSON.stringify(data))
    }

    disconnect(): void {
        if (this.stompClient) {
            this.stompClient.disconnect();
            console.log("disconnected from websocket");
        }
    }
}