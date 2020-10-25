import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatRoom } from 'src/app/models/ChatRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private room = new Subject<ChatRoom>();
  data$ = this.room.asObservable();

  changeRoom(value: ChatRoom) {
    this.room.next(value);
  }
}
