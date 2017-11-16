import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Authentication} from './model/authentication';
import {User} from './model/user.model';
import {AuthenticationService} from './services/authentication.service';
import {PubSubService} from './services/pubsub.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private title = 'Tracker Viewer';
  private menu: any;
  private authenticated: boolean;
  private user: User;
  alert = {"class": "", "message": ""};

  constructor(
    private router: Router,
    private pubSubService: PubSubService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.pubSubService.Authentication.subscribe(
      (authentication: Authentication) => {
        this.authenticated = authentication.authenticated;
        if (this.authenticated) {
          this.alert.class = "alert alert-success alert-dismissable fade in";
          this.alert.message = "you are logged in!";
          setTimeout(() => {
            this.closeAlert();
          }, 2500);
        }
        console.log(authentication.user.displayname);
        this.user = authentication.user;
        localStorage.setItem(environment.AUTHENTICATION, JSON.stringify(authentication));
        this.assembleMenu();
      },
      (err) => console.error('error in AuthPubSubService'),
      () => console.log('Complete')
    );

  }

  private assembleMenu(): void {
    let menuString: string = '{"menuItemList": [';
    if (this.user && this.authenticated) {
      this.user.identities.forEach(element => {
        const menuItem: string = '{"url": "/map/' + element.id + '", "name": "' + element.name + '"},';
        menuString += menuItem;
      });
      // remove last ',' to be able to call JSON.parse on the resultant string
      menuString = menuString.substring(0, menuString.length - 1);
      menuString += '], "displayName": "kkk"}';

    } else {
      menuString += '], "displayName": "Not logged in"}';
    }

    this.menu = JSON.parse(menuString);
  }

  private checkAuthentication(): void {
    const auth_string = localStorage.getItem(environment.AUTHENTICATION);
    if (auth_string) {
      const authentication: Authentication = JSON.parse(auth_string);
      this.authenticated = authentication.authenticated;
      this.user = authentication.user;
    } else {
      this.authenticated = false;
      this.user = null;
    }
    this.assembleMenu();
  }

  logout(): void {
    console.log('logging off');
    this.authenticationService.logout()
      .then((authentication: Authentication) => {
        // user object minus pwd is returned, put on pub-sub svc for app.component to process
        if (!authentication.authenticated) {
          localStorage.removeItem(environment.AUTHENTICATION);
          this.alert.class = "alert alert-info alert-dismissable fade in";
          this.alert.message = "you are logged off...";
          setTimeout(() => {
            this.closeAlert();
          }, 2500);
          this.checkAuthentication();
        }
        // this.router.navigate(['/']);
      }).catch(error => {
        // do something...
        // logout anyway? but the jwt cookie will still be there...
        localStorage.removeItem(environment.AUTHENTICATION);
        this.checkAuthentication();
      });
  }

  closeAlert() {
    this.alert.message = '';
  }

}
