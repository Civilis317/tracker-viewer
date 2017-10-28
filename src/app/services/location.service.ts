import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocationService {

  constructor(private http: Http) {}
  
  list(): Promise<any> {
    const url: string = `${environment.tracker_url}/${environment.tracker_list_endpoint}`;
    
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
