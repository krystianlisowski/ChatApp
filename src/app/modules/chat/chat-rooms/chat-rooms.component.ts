import { Component, OnInit } from '@angular/core';
import {isUndefined} from "util";
import {CreateRoomDialogComponent} from './create-room-dialog/create-room-dialog.component';
import {ChatRoom} from '../../../models/ChatRoom';
import {ChatService} from '../../../services/chat.service';
import {RoomService} from '../../../services/room.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {

  rooms: ChatRoom[];

  constructor(private dialog: MatDialog,
              private chatService: ChatService,
              private roomChanged: RoomService) {
  }

  ngOnInit(): void {
    this.chatService.getRooms().subscribe((rooms: ChatRoom[]) => {
      this.rooms = rooms;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!isUndefined(result)) {
        this.chatService.createRoom(result);
      }
    });
  }

  changeRoom(room: ChatRoom) {
    this.roomChanged.changeRoom(room);
  }
}
