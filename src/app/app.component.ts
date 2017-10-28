import {Component} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tracker Viewer';
  menu = this.assembleMenu();

  /*
  menu = {
    "menuItemList": [
      {"url": "/map/1", "name": "Sytze"},
      {"url": "/map/2", "name": "Ingrid"},
      {"url": "/map/3", "name": "Lie"},
    ]
    , "displayName": "Not logged in"
    , "authenticated": false
  };
   */

  assembleMenu() {
    let menuString: string = '{"menuItemList": [';
    environment.identities.forEach(element => {
      const menuItem: string = '{"url": "/map/' + element.id + '", "name": "' + element.name + '"},';
      menuString += menuItem;
    });

    // remove last ',' to be able to call JSON.parse on the resultant string
    menuString = menuString.substring(0, menuString.length - 1);
    menuString += '], "displayName": "Not logged in", "authenticated": false}';
    return JSON.parse(menuString);
  }
}
