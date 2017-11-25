import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Authentication} from './model/authentication';
import {User} from './model/user.model';
import {AuthenticationService} from './services/authentication.service';
import {PubSubService} from './services/pubsub.service';
import {Router} from '@angular/router';
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  static SUCCESS_MSG = 'alert alert-success alert-dismissable fade in';
  private title = 'Tracker Viewer';
  private menu: any;
  private authenticated: boolean;
  private user: User;
  alert = {"class": "", "message": ""};

  constructor(
    private router: Router,
    private storageService: StorageService,
    private pubSubService: PubSubService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.pubSubService.Authentication.subscribe(
      (authentication: Authentication) => {
        this.handleAuthenticatedMsg(authentication);
      },
      (err) => console.error('error in AuthPubSubService'),
      () => console.log('Complete')
    );

    this.pubSubService.User.subscribe((user: User) => {
      this.handleSettingsSaved(user);
    })
  }

  private handleSettingsSaved(user: User): void {
    let authentication: Authentication = this.storageService.getAuthentication();
    authentication.user = user;
    this.storageService.saveAuthentication(authentication);
    this.setAlert(AppComponent.SUCCESS_MSG, 'Settings saved...')
  }

  private handleAuthenticatedMsg(auth: Authentication): void {
    this.authenticated = auth.authenticated;
    if (this.authenticated) {
      this.user = auth.user;
      this.storageService.saveAuthentication(auth);
      this.setAlert(AppComponent.SUCCESS_MSG, 'Login successful!');
    } else {
      this.user = null;
      this.storageService.saveAuthentication(null);
    }
    this.assembleMenu();
  }

  private setAlert(clazz: string, msg: string): void {
    this.alert.class = clazz;
    this.alert.message = msg;
    setTimeout(() => {
      this.closeAlert();
    }, 2500);
  }

  private assembleMenu(): void {
    let menuString: string = '{"menuItemList": [ ';
    if (this.user && this.authenticated) {
      this.user.identities.forEach(element => {
        const menuItem: string = '{"url": "/map/' + element.id + '", "name": "' + element.name + '"},';
        menuString += menuItem;
      });
      // remove last ',' to be able to call JSON.parse on the resultant string
      menuString = menuString.substring(0, menuString.length - 1);
      menuString += ']}';

    } else {
      menuString += ']}';
    }

    console.log(menuString);

    this.menu = JSON.parse(menuString);
  }

  private checkAuthentication(): void {
    let authentication: Authentication = this.storageService.getAuthentication();
    if (authentication) {
      console.log('we have authentication');
      this.authenticated = authentication.authenticated;
      this.user = authentication.user;
    } else {
      console.log('no authentication');
      this.authenticated = false;
      this.user = null;
    }
    this.assembleMenu();
  }

  logout(): void {
    console.log('logging off');
    this.authenticationService.logout()
      .then((authentication: Authentication) => {
        this.handleAuthenticatedMsg(authentication);
      }).catch(error => {
        // do something...
        // logout anyway? but the jwt cookie will still be there...
        this.storageService.removeAuthentication();
        this.checkAuthentication();
      });
  }

  closeAlert() {
    this.alert.message = '';
  }

}
