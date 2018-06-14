import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms" ;
import axios from "axios";

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  valid = {
    email: true,
    password: true
  }

  constructor(public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.valid = {
      email: this.loginForm.get('email').valid,
      password: this.loginForm.get('password').valid
    }
    let formData = this.loginForm.value
    axios.post(`${environment.api.baseUrl}${environment.api.login}`, formData).then((resp) => {
      console.log(resp)
      if (resp.data.data != undefined) {
        localStorage.setItem('token', resp.data.data)
        this.router.navigate(['dashboard'])
      } else {
        alert('Incorrect username or password.')
      }
    }).catch((err) => {
      alert('There was a problem logging you in.')
      console.log(err);
    })
  }

}
