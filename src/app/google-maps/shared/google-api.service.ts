import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

const url = `https://maps.googleapis.com/maps/api/js?key=${environment.apikey}&callback=initMap`;

@Injectable()
export class GoogleApiService {
private loadMap: Promise<any>;

  constructor(private http: Http) {
    this.loadMap = new Promise((resolve) => {
      window['initMap'] = () => {
        resolve();
      };
      this.loadScript();
    });
  }

  public initMap(): Promise<any> {
    return this.loadMap;
    
  }

  private loadScript() {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';

    if (document.body.contains(script)) {
      return;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
