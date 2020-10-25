import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/Message';
import { AuthService } from 'src/app/services/auth.service';
import {User} from '../../../models/User';
import {ChatService} from '../../../services/chat.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: ChatMessage;
  @Input() user: User;
  isOwnMessage = false;

  constructor(private authService: AuthService,
              private chatService: ChatService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user && this.user) {
        this.isOwnMessage = user.email === this.message.email;
      }
    });
  }

  deleteMessage() {
    this.chatService.deleteMessage(this.user.uid, this.message.$key);
  }
}
