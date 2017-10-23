/*
* app-routing.module.ts
*/
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {path: 'map/:id', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}