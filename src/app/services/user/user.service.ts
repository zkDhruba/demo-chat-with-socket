import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUsername } from 'src/app/stores/actions/user.action';
import { Usredata } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private store: Store<Usredata>) {}

  setInitialUsername() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData: Usredata = JSON.parse(storedUserData);
      this.store.dispatch(setUsername({ payload: userData }));
    } else {
      const randomUsername = 'User' + Math.floor(Math.random() * 1000);
      const userData: Usredata = {
        username: randomUsername,
        phone: '017710453756'
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      this.store.dispatch(setUsername({ payload: userData }));
    }
  }
  
}