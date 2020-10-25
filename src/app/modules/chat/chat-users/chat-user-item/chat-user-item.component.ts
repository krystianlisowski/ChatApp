import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-chat-user-item',
  templateUrl: './chat-user-item.component.html',
  styleUrls: ['./chat-user-item.component.scss']
})
export class ChatUserItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }
}
