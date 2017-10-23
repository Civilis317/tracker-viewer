import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import {GoogleMap} from './google-map';
import {MapConfiguration} from '../model/map-config.model';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  googleMap: GoogleMap;
  map: any;
  mapConfig: MapConfiguration;
  title: string;
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      this.mapConfig = {
        "id": 1,
        "title": "Earthquakes",
        "lat": 20,
        "lng": 10,
        "zoom": 2,
        "type": "google.maps.MapTypeId.TERRAIN"
      };

      this.googleMap = new GoogleMap(this.mapConfig);
      this.map = this.googleMap.map;
      this.title = this.mapConfig.title;
    });
  
  }

}
