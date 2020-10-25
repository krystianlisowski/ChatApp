import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {ChatMessage} from '../models/Message';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChatRoom} from '../models/ChatRoom';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: AngularFireList<ChatMessage>;
  rooms: AngularFireList<ChatRoom>;
  userName: string;
  user: firebase.User;

  constructor(private db: AngularFireDatabase,
              private fireAuth: AngularFireAuth,
              private snackBar: MatSnackBar) {
    this.fireAuth.authState.subscribe(auth => {
      if (auth) {
        this.user = auth;
      }

      this.getUser().subscribe((user: any) => {
        this.userName = user.displayName;
      });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();
  }

  getUsers() {
    const path = '/users/';
    return this.db.list(path).valueChanges();
  }

  createRoom(name: string) {
    const path = '/rooms';
    this.rooms = this.db.list(path);
    this.rooms.push({
      roomName: name
    });
  }

  getRooms() {
    const path = '/rooms';

    return this.db.list(path).snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => ({ $key: c.payload.key, ...c.payload.val() })))
    );
  }

  messageHandle(path: string, msg: string) {
    const timestamp = new Date().toLocaleString();
    this.chatMessages = this.db.list(path);
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      userName: this.userName,
      email: this.user.email
    });
  }

  sendMessageToUser(msg: string, ownerId: string) {
    const path = `/messages/${this.user.uid}/${ownerId}`;
    this.messageHandle(path, msg);
  }

  sendMessageToRoom(msg: string, roomId: string) {
    const path = `/messages/${roomId}`;
    this.messageHandle(path, msg);
  }

  getMessagesForRoom(roomId: string) {
    const path = `/messages/${roomId}`;
    return this.db.list(path).valueChanges();
  }

  getMessagesForUser(ownerId: string) {
    const pathTo = `/messages/${this.user.uid}/${ownerId}`;
    const pathFrom = `/messages/${ownerId}/${this.user.uid}`;

    const chatMessagesTo = this.db.list(pathTo).snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => ({ $key: c.payload.key, ...c.payload.val() })))
    );
    const chatMessagesFrom = this.db.list(pathFrom).snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) => ({ $key: c.payload.key, ...c.payload.val() })))
    );

    return {chatMessagesTo, chatMessagesFrom};
  }

  deleteMessage(ownerId: string, messageId: string) {
    const path = this.user.uid === ownerId ? `/messages/${ownerId}/${this.user.uid}/${messageId}` : `/messages/${this.user.uid}/${ownerId}/${messageId}`;
    this.db.object(path).remove().then(() => this.snackBar.open('Wiadomość została usunięta.'));
  }
}
