/*
* app-routing.module.ts
*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {GoogleMapsComponent} from './google-maps/google-maps.component';
import {LoginComponent} from './login/login.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'map/:id', component: GoogleMapsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
