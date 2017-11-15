import { environment } from '../../environments/environment';
import { Authentication } from '../model/authentication';
import { User } from '../model/user.model';
import { Component, OnInit } from '@angular/core';
import {Identity} from "../model/identity.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private user: User;
  private tmpUser: User;
  private model: string;

  constructor() { }

  ngOnInit() {
    const authentication: Authentication = JSON.parse(localStorage.getItem(environment.AUTHENTICATION));
    this.user = authentication.user;
    this.model = 'test';
    this.copyUser();
  }

  private copyUser() {
    this.tmpUser = {username: this.user.username,
                    displayname: this.user.displayname,
                    password: null,
                    active: this.user.active,
                    admin: this.user.active,
                    identities: []
                  };

    this.user.identities.forEach(identity => {
      let i: Identity = {
        id: identity.id,
        name: identity.name,
        phoneid: identity.phoneid,
        interval: identity.interval
      };
      this.tmpUser.identities.push(i);
    })

    this.tmpUser.displayname = 'test';
    console.log(`tmpUser displayname: ${this.tmpUser.displayname}`)
    console.log(`user displayname: ${this.user.displayname}`)
  }

  onRowClick(event){
    console.log(event.target.textContent);
  }

}
