import {GoogleApiService} from './shared/google-api.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {MapConfiguration} from '../model/map-config.model';


declare var google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  map: any;
  id: number;
  mapConfig: MapConfiguration;

  constructor(private googleApi: GoogleApiService, private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
    });

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
      
      console.log('mapProp: ' + JSON.stringify(mapProp));

      this.map = new google.maps.Map(document.getElementById('map'), mapProp);
    });
    
  }

}
