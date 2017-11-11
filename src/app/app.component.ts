import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {Authentication} from './model/authentication';
import {User} from './model/user.model';
import {PubSubService} from './services/pubsub.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Tracker Viewer';
  menu = this.assembleMenu();
  private authenticated: boolean = false;
  private user: User;

  constructor(private pubSubService: PubSubService) {}

  ngOnInit(): void {
    this.pubSubService.Authentication.subscribe(
      (authentication: Authentication) => {
        this.authenticated = authentication.authenticated;
        this.user = authentication.user;
        this.assembleMenu();
      },
      (err) => console.error('error in AuthPubSubService'),
      () => console.log('Complete')
    );

  }

  assembleMenu() {
    let menuString: string = '{"menuItemList": [';
    if (this.user && this.authenticated) {
      this.user.identities.forEach(element => {
        const menuItem: string = '{"url": "/map/' + element.id + '", "name": "' + element.name + '"},';
        menuString += menuItem;
        // remove last ',' to be able to call JSON.parse on the resultant string
        menuString = menuString.substring(0, menuString.length - 1);
      });
    } else {
      menuString += '], "displayName": "Not logged in", "authenticated": false}';
      
    }

    return JSON.parse(menuString);
  }
}
