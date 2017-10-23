import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent {
  title = 'Tracker Viewer';

   menu = {
      "menuItemList": [
        {"url": "/earthquakes", "name": "Earthquakes"},
        {"url": "/map/2", "name": "Schagerbrug"},
        {"url": "/map/3", "name": "Amsterdamsebrug"},
        {"url": "/map/4", "name": "Cruquiusbrug"},
      ]
      , "displayName": "Not logged in"
      , "authenticated": false
    };
}
