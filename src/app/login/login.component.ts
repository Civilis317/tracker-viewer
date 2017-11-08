import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {PubSubService} from '../services/pubsub.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  alert = { "error": "", "message": ""};
  
  constructor (
    private router: Router, 
    private authenticationService: AuthenticationService, 
    private pubSubService: PubSubService
  ) { }

  ngOnInit() {
  }
  
  performLogin() {
    this.alert.error = "";
    this.alert.message = "";
    this.authenticationService.login(this.username, this.password)
      .then((data: any) => {
        // user object minus pwd is returned, put on pub-sub svc for app.component to process
        if (data.authenticated) {
          this.pubSubService.Authentication.next(data.user);
        } else {
          this.pubSubService.Authentication.next(null);
          this.alert.error = "Login failure";
          this.alert.message = "Please provide valid credentials...";
        }
      }
    ).catch( error => {
        this.pubSubService.Authentication.next(null);
        this.alert.error = "Login failure";
        this.alert.message = "Please provide valid credentials...";
      }
    );
  }
  
}
