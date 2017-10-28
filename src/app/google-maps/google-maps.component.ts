import {GoogleApiService} from './shared/google-api.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {MapConfiguration} from '../model/map-config.model';
import {Identity} from '../model/identity.model';
import { LocationService } from '../services/location.service';
import { IdentityService } from '../services/identity.service';


declare var google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  map: any;
  identity: Identity;
  mapConfig: MapConfiguration;

  constructor(
    private googleApi: GoogleApiService, 
    private route: ActivatedRoute, 
    private locationService: LocationService, 
    private identityService: IdentityService
  ) {}

  ngOnInit() {

    this.route.params.subscribe((param: any) => {
      this.identity = this.identityService.getIdentity(param.id);
      
      this.locationService.list().then((data: any) => {
        // filter out phoneid
        const localList = data.filter(i => i.phoneid == this.identity.phoneid);
        // get last location posted
        const location = localList[localList.length - 5];
        console.log(location);
        
        this.googleApi.initMap().then(() => {
          this.mapConfig = {
            "id": this.identity.id,
            "title": this.identity.name,
            "lat": location.lat,
            "lng": location.long,
            "zoom": 14,
            "type": google.maps.MapTypeId.TERRAIN
          };
    
          const mapProp = {
            center: new google.maps.LatLng(this.mapConfig.lat, this.mapConfig.lng),
            zoom: this.mapConfig.zoom,
            mapTypeId: this.mapConfig.type
          };
    
          this.map = new google.maps.Map(document.getElementById('map'), mapProp);
          
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.mapConfig.lat, this.mapConfig.lng),
            map: this.map,
            title: this.identity.name + ', ' + location.date
          });
          
        });
        
      });
    });

    /*
    this.googleApi.initMap().then(() => {
      this.mapConfig = {
        "id": 1,
        "title": "Cruquiusbrug",
        "lat": 52.338414,
        "lng": 4.636684,
        "zoom": 10,
        "type": google.maps.MapTypeId.TERRAIN
      };

      const mapProp = {
        center: new google.maps.LatLng(this.mapConfig.lat, this.mapConfig.lng),
        zoom: this.mapConfig.zoom,
        mapTypeId: this.mapConfig.type
      };

      this.map = new google.maps.Map(document.getElementById('map'), mapProp);
    });
    */
  }

}
