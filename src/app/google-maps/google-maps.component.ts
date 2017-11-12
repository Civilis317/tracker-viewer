import {GoogleApiService} from './shared/google-api.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {MapConfiguration} from '../model/map-config.model';
import {Identity} from '../model/identity.model';
import {Location} from '../model/location';
import {LocationService} from '../services/location.service';
import {environment} from '../../environments/environment';
import { Authentication } from '../model/authentication';


declare var google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  map: any;
  identity: Identity;
  locationList: Location[];
  pointer: number;
  datetime: Date;
  provider: string;
  alert = {"error": "", "message": ""};
  

  constructor(
    private googleApi: GoogleApiService,
    private route: ActivatedRoute,
    private locationService: LocationService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      const authentication: Authentication = JSON.parse(localStorage.getItem(environment.AUTHENTICATION));
      this.identity = authentication.user.identities.find(i => i.id == param.id);
      this.refreshLocationList();
    });
  }

  public refreshLocationList() {
    this.locationService.list(this.identity.phoneid).then((data: Location[]) => {
      // filter out phoneid
      this.locationList = data;
      console.log(this.locationList);
      /*
      this.locationList.sort((a: Location, b: Location) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      */
      this.pointer = this.locationList.length;
      this.renderMap();
    }).catch((error) => {
      this.alert.error = 'Error';
      this.alert.message = "Unable to retrieve and/or display location data...";
    });
      
  }

  public nextLocation() {
    this.pointer++;
    if (this.pointer > this.locationList.length ) {
      this.pointer = this.locationList.length;
    }
    this.renderMap();
  }

  public previousLocation() {
    this.pointer--;
    if (this.pointer < 1) {
      this.pointer = 1;
    }
    this.renderMap();
  }
  
  private renderMap() {
    // get last location posted
    const location: Location = this.locationList[this.locationList.length - this.pointer];
    console.log(`pointer: ${this.pointer}: date: ${location.date}`);

    this.googleApi.initMap().then(() => {
      const mapConfig: MapConfiguration = this.getMapConfig(location);

      const mapProp = {
        center: new google.maps.LatLng(mapConfig.lat, mapConfig.lng),
        zoom: mapConfig.zoom,
        mapTypeId: mapConfig.type
      };

      this.map = new google.maps.Map(document.getElementById('map'), mapProp);

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(mapConfig.lat, mapConfig.lng),
        map: this.map,
        title: this.identity.name + ', ' + location.date
      });

    });
  }

  private getMapConfig(location: Location): MapConfiguration {
    this.provider = location.provider;
    this.datetime = location.date;
    const mapConfig: MapConfiguration = {
      "id": this.identity.id,
      "title": this.identity.name,
      "lat": location.lat,
      "lng": location.long,
      "zoom": 14,
      "type": google.maps.MapTypeId.TERRAIN
    };
    return mapConfig;
  }
}
