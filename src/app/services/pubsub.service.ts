import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

import { Authentication } from '../model/authentication';
import {User} from "../model/user.model";

@Injectable()
export class PubSubService {
  Authentication: Subject<Authentication>;
  User: Subject<User>;

  constructor() {
    this.Authentication = new Subject<Authentication>();
    this.User = new Subject<User>();
  }

}
