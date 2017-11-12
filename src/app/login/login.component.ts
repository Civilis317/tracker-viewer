import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PubSubService} from '../services/pubsub.service';
import {Authentication} from '../model/authentication';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: string;
  password: string;
  alert = {"error": "", "message": ""};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private pubSubService: PubSubService
  ) {}

  ngOnInit() {
  }

  performLogin() {
    this.alert.error = "";
    this.alert.message = "";
    this.authenticationService.login(this.username, this.password)
      .then((authentication: Authentication) => {
        if (authentication.authenticated) {
          this.password = null;
          this.pubSubService.Authentication.next(authentication);
          this.router.navigate(['/']);
        } else {
          this.alert.error = "Login failure";
          this.alert.message = "Please provide valid credentials...";
        }
      }
      ).catch(error => {
        this.pubSubService.Authentication.next(null);
        this.alert.error = "Error";
        this.alert.message = error;
      });
  }

}
