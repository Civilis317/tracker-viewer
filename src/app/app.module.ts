import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { GoogleApiService } from './google-maps/shared/google-api.service';
import { LocationService } from './services/location.service';
import { IdentityService } from './services/identity.service';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [GoogleApiService, LocationService, IdentityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
