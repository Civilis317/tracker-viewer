import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PubSubService} from '../services/pubsub.service';
import {Authentication} from '../model/authentication';
import {User} from '../model/user.model';
import {Identity} from "../model/identity.model";
import {environment} from '../../environments/environment';
import {AuthenticationService} from "../services/authentication.service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private user: User;
  private tmpUser: User;

  constructor(private router: Router,
              private storageService: StorageService,
              private pubSubService: PubSubService,
              private settingsService: AuthenticationService) {
  }

  ngOnInit() {
    const authentication: Authentication = this.storageService.getAuthentication();
    if (authentication && authentication.authenticated) {
      this.user = authentication.user;
      this.copyUser();
    } else {
      console.log('not auth')
      // TODO: handle situation where auth not found
    }
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
    console.log(`user pwd: ${this.user}`);
    // TODO: remove identities from user that don't exist anymore in tmpUser = bug
    this.settingsService.saveSettings(this.user).then((newUser: User) => {
      // for now notify appcomponent
      const authentication: Authentication = this.storageService.getAuthentication();
      authentication.user = newUser;
      this.pubSubService.User.next(newUser);
      this.router.navigate(['/']);

    }).catch(error => {
      // TODO: handle failure to save settings, eg show alerts
    })
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
