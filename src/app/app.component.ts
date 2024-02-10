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

  msgHistory: string[] = [];

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
      this.msgHistory.push(msg);
      console.log(this.msgHistory);
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
    let logMsg = this.textForm.get('textField')?.value;
    console.log(logMsg, 'log msg');

    if(logMsg) {
      this.socket.emit('chat message', logMsg);
      this.textForm.get('textField')?.setValue('');
    }
    
  }
}
