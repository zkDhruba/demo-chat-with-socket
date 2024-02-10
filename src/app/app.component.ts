import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  textForm: FormGroup;

  socket: Socket;

  userStoreData: any;
  currentUsername: string;

  serverUrl: string = 'http://localhost:3000';

  msgHistory: any[] = [];

  enteredChat: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.textForm = new FormGroup({})
    this.socket = io(this.serverUrl);
    this.enteredChat = false;
    this.currentUsername = '';
  }

  ngOnInit(): void {
    this.textForm = this.fb.group({
      textField: (null)
    })

    this.socket.on('chat message', (msg) => {
      let jsonMsg = JSON.parse(msg);
      this.msgHistory.push(jsonMsg);
      console.log(this.msgHistory, 'message history');
    });

    this.socket.on('connect', () => {
      this.enteredChat = true;
      this.userService.setInitialUsername();
      this.userStoreData = localStorage.getItem('userData');
      this.currentUsername = JSON.parse(this.userStoreData)?.username;
      console.log(this.currentUsername, 'this.currentUsername');
      
      console.log(this.userStoreData, 'user store data');
      
    });
  }   

  sendText() {
    let chatPayload = {
      logMsg: this.textForm.get('textField')?.value,
      chatUser: this.currentUsername
    }
    // let logMsg = this.textForm.get('textField')?.value;
    console.log(chatPayload, 'log chat payload');
    let stringChatPayload = JSON.stringify(chatPayload);

    if(chatPayload) {
      this.socket.emit('chat message', stringChatPayload);
      this.textForm.get('textField')?.setValue('');
    }
    
  }
}
