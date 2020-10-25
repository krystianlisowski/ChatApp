import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {LoginComponent} from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import {ChatModule} from '../chat/chat.module';



@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    ChatComponent,
  ],
  exports: [LoginComponent, RegisterComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    ChatModule,
  ]
})
export class CoreModule { }

