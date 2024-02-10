import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat/chat.service';
import { io, Socket } from 'socket.io-client';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  textForm: FormGroup;

  socket: Socket;

  serverUrl: string = 'http://localhost:3000';

  msgHistory: string[] = [];

  enteredChat: boolean;

  constructor(
    private chatService: ChatService,
    private fb: FormBuilder
  ) {
    this.textForm = new FormGroup({})
    this.socket = io(this.serverUrl);
    this.enteredChat = false;
  }

  ngOnInit(): void {
    this.textForm = this.fb.group({
      textField: (null)
    })

    this.socket.on('chat message', (msg) => {
      this.msgHistory.push(msg);
      console.log(this.msgHistory);
    });

    this.socket.on('connect', () => {
      this.enteredChat = true;
    });
  }

  sendText() {
    let logMsg = this.textForm.get('textField')?.value;
    console.log(logMsg, 'log msg');

    if(logMsg) {
      this.socket.emit('chat message', logMsg);
      this.textForm.get('textField')?.setValue('');
    }
    
  }
}
