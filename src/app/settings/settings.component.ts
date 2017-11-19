import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PubSubService} from '../services/pubsub.service';
import {Authentication} from '../model/authentication';
import {User} from '../model/user.model';
import {Identity} from "../model/identity.model";
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private user: User;
  private tmpUser: User;
  private model: string;

  constructor(private router: Router, private pubSubService: PubSubService) {
  }

  ngOnInit() {
    const authentication: Authentication = JSON.parse(localStorage.getItem(environment.AUTHENTICATION));
    this.user = authentication.user;
    this.model = 'test';
    this.copyUser();
  }

  private copyUser() {
    this.tmpUser = {
      username: this.user.username,
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
  }

  removeIdentity(identity: Identity) {
    const index = this.tmpUser.identities.indexOf(identity, 0);
    if (index > -1) {
      this.tmpUser.identities.splice(index, 1);
    }
  }

  addIdentity() {
    let id: number = 0;
    this.tmpUser.identities.forEach(item => {
      if (item.id > id) {
        id = item.id;
      }
    });
    id++;

    let identity: Identity = {
      id: id,
      name: null,
      phoneid: null,
      interval: 3600
    }

    this.tmpUser.identities.push(identity);
  }

  saveSettings() {
    this.user.displayname = this.tmpUser.displayname;
    this.tmpUser.identities.forEach(item => this.copyIdentity(item));
    // TODO: remove identities from user that don't exist anymore in tmpUser
    // TODO: call service to update mongodb, use returned userobject to notify appcomponent
    // for now notify appcomponent
    const authentication: Authentication = JSON.parse(localStorage.getItem(environment.AUTHENTICATION));
    authentication.user = this.user;
    this.pubSubService.Authentication.next(authentication);
    this.router.navigate(['/']);
  }

  private copyIdentity(identity: Identity) {
    let userIdentity: Identity = this.user.identities.find(i => i.id === identity.id);
    if (userIdentity) {
      // update
      userIdentity.id = identity.id;
      userIdentity.name = identity.name;
      userIdentity.phoneid = identity.phoneid;
      userIdentity.interval = identity.interval;
    } else {
      // new identity
      userIdentity = {
        id: identity.id,
        name: identity.name,
        phoneid: identity.phoneid,
        interval: identity.interval
      }
      this.user.identities.push(userIdentity);
    }
  }

  cancelChanges() {
    this.copyUser();
  }

}
