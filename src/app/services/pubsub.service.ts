import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

import { Authentication } from '../model/authentication';

@Injectable()
export class PubSubService {
  Authentication: Subject<Authentication>;

  constructor() { 
    this.Authentication = new Subject();
  }

}
