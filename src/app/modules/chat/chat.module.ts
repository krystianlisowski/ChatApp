import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatFormComponent} from './chat-form/chat-form.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {ChatFeedComponent} from './chat-feed/chat-feed.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';
import {ChatUsersComponent} from './chat-users/chat-users.component';
import {ChatUserItemComponent} from './chat-users/chat-user-item/chat-user-item.component';
import {SortByPipe} from './Pipes/sort-by.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {QuillModule} from 'ngx-quill';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import {CreateRoomDialogComponent} from './chat-rooms/create-room-dialog/create-room-dialog.component';



@NgModule({
  declarations: [
    ChatFormComponent,
    ChatRoomComponent,
    ChatFeedComponent,
    ChatMessageComponent,
    ChatUsersComponent,
    ChatUserItemComponent,
    SortByPipe,
    ChatRoomsComponent,
    CreateRoomDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [ChatUsersComponent, ChatUserItemComponent],
  entryComponents: [CreateRoomDialogComponent]
})
export class ChatModule { }
export {ChatUsersComponent, ChatUserItemComponent};
