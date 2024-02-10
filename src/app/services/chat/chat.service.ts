import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: Socket;
  serverUrl: string = 'http://localhost:3000';
  constructor() {
    this.socket = io(this.serverUrl);
  }
  
  joinRoom(data: any) {
    this.socket.emit('join', data)
  }

  sendMsg(msg: string) {
    this.socket.emit('message', msg)
  }
}
