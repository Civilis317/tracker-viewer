import {GoogleApiService} from './shared/google-api.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {MapConfiguration} from '../model/map-config.model';
import {Identity} from '../model/identity.model';
import {Location} from '../model/location';
import {LocationService} from '../services/location.service';
import {IdentityService} from '../services/identity.service';


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
  

  constructor(
    private googleApi: GoogleApiService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private identityService: IdentityService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: any) => {
      this.identity = this.identityService.getIdentity(param.id);
      this.refreshLocationList();
    });
  }

  public refreshLocationList() {
    this.pointer = 1;
    this.locationService.list().then((data: Location[]) => {
      // filter out phoneid
      this.locationList = data.filter(i => i.phoneid == this.identity.phoneid);
      console.log(this.locationList);
      this.renderMap();
    });
  }

  public previousLocation() {
    this.pointer++;
    if (this.pointer > this.locationList.length - 1 ) {
      this.pointer = this.locationList.length - 1;
    }
    this.renderMap();
  }

  public nextLocation() {
    this.pointer--;
    if (this.pointer < 0) {
      this.pointer = 0;
    }
    this.renderMap();
  }
  
  private renderMap() {
    // get last location posted
    const location: Location = this.locationList[this.locationList.length - this.pointer];

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
