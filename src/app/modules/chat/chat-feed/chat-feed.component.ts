import {Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy} from '@angular/core';
import {ChatService} from 'src/app/services/chat.service';
import {ChatMessage} from 'src/app/models/Message';
import {Subscription} from 'rxjs';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/User';
import {RoomService} from '../../../services/room.service';
import {ChatRoom} from '../../../models/ChatRoom';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit, AfterViewChecked, OnDestroy {

  feed: ChatMessage[];
  user: User;
  subscription: Subscription;
  loading = false;
  room: ChatRoom;

  @ViewChild('scroller') feedContainer: ElementRef;

  constructor(private chatService: ChatService,
              private userService: UserService,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.data$.subscribe(user => {
      this.feed = null;
      this.room = null;
      this.user = user;
      this.getMessages(this.user.uid);
    });

    this.subscription.add(
      this.roomService.data$.subscribe(room => {
        this.feed = null;
        this.user = null;
        this.room = room;
        this.getMessages(this.room.$key);
      })
    );
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  getMessages(id) {
    this.loading = true;
    if (this.user && id === this.user.uid) {
      this.chatService.getMessagesForUser(id).chatMessagesTo.subscribe((resOne: ChatMessage[]) => {
        this.chatService.getMessagesForUser(id).chatMessagesFrom.subscribe((resTwo: ChatMessage[]) => {
          this.feed = [...new Map(resOne.concat(resTwo).map(item =>
            [item.timeSent, item])).values()];
          this.loading = false;
        });
      });
    } else {
      this.chatService.getMessagesForRoom(id).subscribe((messages: ChatMessage[]) => {
        this.feed = messages;
        this.loading = false;
      });
    }

  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
