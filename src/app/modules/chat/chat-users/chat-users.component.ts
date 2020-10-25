import {Component, OnInit, Input} from '@angular/core';
import {User} from 'src/app/models/User';
import {ChatService} from 'src/app/services/chat.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
              private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.chatService.getUsers().subscribe(users => {
      this.users = users;
      this.checkUser(users[0]);
    });
  }

  checkUser(user: User) {
    this.userService.sendUser(user);
  }
}
