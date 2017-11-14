import { environment } from '../../environments/environment';
import { Authentication } from '../model/authentication';
import { User } from '../model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private user: User;

  constructor() { }

  ngOnInit() {
    const authentication: Authentication = JSON.parse(localStorage.getItem(environment.AUTHENTICATION));
    this.user = authentication.user;
    
  }
  
  

}
