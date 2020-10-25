import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/core/login/login.component';
import { RegisterComponent } from './modules/core/register/register.component';
import { ChatRoomComponent } from './modules/chat/chat-room/chat-room.component';
import { AuthGuard } from './services/auth.guard';
import { ChatComponent } from './modules/core/chat/chat.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ChatRoomComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
