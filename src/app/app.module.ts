import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms'; // for ngModel!

import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { GoogleApiService } from './google-maps/shared/google-api.service';
import { AuthenticationService } from './services/authentication.service';
import { LocationService } from './services/location.service';
import { PubSubService } from './services/pubsub.service';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [GoogleApiService, LocationService, AuthenticationService, PubSubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
