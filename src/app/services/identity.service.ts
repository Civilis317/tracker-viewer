import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Identity } from '../model/identity.model';

@Injectable()
export class IdentityService {

  constructor() { }
  
  getIdentity(id_value: number): Identity {
    console.log(id_value);
    const identity: Identity = environment.identities.find(i => i.id == id_value);
    return identity;
  }

}
