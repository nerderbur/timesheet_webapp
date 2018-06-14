import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from "axios";

import { environment } from "./../../../environments/environment"; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  valid = {
    firstName: true,
    lastName: true,
    email: true,
    password: true
  }

  constructor(public router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.valid = {
      firstName: this.registerForm.get('firstName').valid,
      lastName: this.registerForm.get('lastName').valid,
      email: this.registerForm.get('email').valid,
      password: this.registerForm.get('password').valid
    }

    if (this.registerForm.valid) {
      axios.post(`${environment.api.baseUrl}${environment.api.register}`, this.registerForm.value)
        .then(() => {
          alert('User created!')
          this.router.navigate(["login"])
        }).catch(() => {
          alert('There was an error creating your user!')
        })
    }
  }

}
