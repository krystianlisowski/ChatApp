import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userID = new Subject<User>();
  data$ = this.userID.asObservable();

  sendUser(value: User) {
    this.userID.next(value);
  }
}
