import {Identity} from './identity.model';

export interface User {
    username:    string;
    displayname: string;
    password:    string;
    admin:       boolean;
    active:      boolean;
    identities?:  Identity[];
}
