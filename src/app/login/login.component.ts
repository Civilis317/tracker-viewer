import { Authentication } from '../model/authentication';
import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {PubSubService} from '../services/pubsub.service';

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
    private authenticationService: AuthenticationService, 
    private pubSubService: PubSubService
  ) { }

  ngOnInit() {
    console.log("login component");
  }
  
  performLogin() {
    this.alert.error = "";
    this.alert.message = "";
    this.authenticationService.login(this.username, this.password)
      .then((authentication: Authentication) => {
        console.log('authentication: ' + authentication);
        // user object minus pwd is returned, put on pub-sub svc for app.component to process
        if (!authentication.authenticated) {
          this.alert.error = "Login failure";
          this.alert.message = "Please provide valid credentials...";
        }
        this.pubSubService.Authentication.next(authentication);
      }
    ).catch( error => {
        this.pubSubService.Authentication.next(null);
        this.alert.error = "Login failure";
        this.alert.message = "Please provide valid credentials...";
      }
    );
  }
  
}
