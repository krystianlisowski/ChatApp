import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required, Validators.minLength(8)]}],
      displayName: ['', {validators: [Validators.required, Validators.maxLength(20)]}],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get displayName() {
    return this.registerForm.get('displayName');
  }

  register() {
    this.authService.register(this.registerForm.value)
    .then(() => this.router.navigate(['/chat']))
    .catch(error => this.snackBar.open(error.message));
  }

}
