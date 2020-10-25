import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import {RoomService} from '../../../services/room.service';
import { User } from 'src/app/models/User';
import { ChatRoom } from 'src/app/models/ChatRoom';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;
  user: User;
  room: ChatRoom;
  subscription: Subscription;

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['code-block', 'link']
    ]
  };

  constructor(private chatService: ChatService,
              private userService: UserService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.subscription = this.userService.data$.subscribe(user => {
      this.user = user;
      this.room = null;
    });

    this.subscription.add(
      this.roomService.data$.subscribe(room => {
        this.room = room;
        this.user = null;
      })
    );
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.message = this.message.replace('<br>', '');
      this.send();
    }
  }

  send() {
    if (this.user) {
      this.chatService.sendMessageToUser(this.message, this.user.uid);
      this.userService.sendUser(this.user);
    } else {
      this.chatService.sendMessageToRoom(this.message, this.room.$key);
      this.roomService.changeRoom(this.room);
    }
    document.getElementsByClassName('ql-editor')[0].innerHTML = '';
    this.message = null;
  }

  contentChanged($event) {
    this.message = $event.html;
  }
}
