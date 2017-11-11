import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import {environment} from '../../environments/environment';
import {Authentication} from '../model/authentication';


@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {}

  login(username: string, password: string): Promise<Authentication> {
    const url: string = `${environment.tracker_url}/${environment.tracker_login_endpoint}`;
    const authData = `{"username": "${username}", "password": "${password}" }`;
    const options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json'
      }), withCredentials: true
    });

    return this.http.post(url, authData, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  logout(): Promise<Authentication> {
    const url: string = `${environment.tracker_url}/${environment.tracker_logout_endpoint}`;

    return this.http.get(url, {withCredentials: true})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
