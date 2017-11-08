import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

import {User} from '../model/user.model';

@Injectable()
export class PubSubService {
  Authentication: Subject<User>;

  constructor() { 
    this.Authentication = new Subject();
  }

}
