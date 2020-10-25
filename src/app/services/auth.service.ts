import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

const STATUS_ONLINE = 'online';
const STATUS_OFFLINE = 'offline';

export interface Credentials {
  email?: string;
  password?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<firebase.User>;
  authState: firebase.User;

  constructor(private router: Router,
              private db: AngularFireDatabase,
              private fireAuth: AngularFireAuth,
              private snackBar: MatSnackBar) {
    this.user = fireAuth.authState;
    this.fireAuth.authState.subscribe((user: firebase.User) => {
      this.authState = user;
    });
  }


  get currentUserId() {
    return this.authState !== null ? this.authState.uid : '';
  }

  register(credentials: Credentials) {
    return this.fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        this.authState = user.user;
        this.setUser(credentials.email, credentials.displayName, STATUS_ONLINE);
      }).catch(error => console.error(error));
  }

  getUser() {
    return this.user;
  }

  setUser(mail: string, username: string, userStatus: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: mail,
      displayName: username,
      status: userStatus,
      uid: this.currentUserId
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  login(credentials: Credentials) {
    return this.fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((user) => {
        this.authState = user.user;
        this.setUserStatus(STATUS_ONLINE);
        this.router.navigate(['/chat']);
      }).catch(error => this.snackBar.open('Email or password is incorrect.'));
  }

  setUserStatus(userStatus: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: userStatus
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  logout() {
    this.setUserStatus(STATUS_OFFLINE);
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }
}
