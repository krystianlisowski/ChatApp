import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.auth.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['/chat']);
      }
    });
  }
}
