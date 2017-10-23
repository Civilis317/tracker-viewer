import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
    });
  
  }

}
