import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authChoice = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  loginFormError = '';
  registerFormError = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }


  onSubmitLoginForm() {
    console.log('Logged in!');
  }

  onSubmitRegisterForm() {
    console.log('Registered!');
  }

}

