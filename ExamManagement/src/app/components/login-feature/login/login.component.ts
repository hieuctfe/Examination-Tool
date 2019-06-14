import { Component, OnInit } from '@angular/core';
import {AuthenService} from '../../../services/authen.service';

@Component({
  selector: 'Mex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  LoginService;
  constructor(LoginService: AuthenService) {
    this.LoginService = LoginService;
  }

  ngOnInit() {
  }

  socialSignIn() {
    this.LoginService.socialSignIn().then((userData) => {
      alert(JSON.stringify(userData));
    }).catch((er) => alert(JSON.stringify(er)));
  }

}
