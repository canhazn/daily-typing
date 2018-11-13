import { NgModule }             from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CollectedPageComponent } from './collected-page/collected-page.component';


const routes: Routes = [
  { path: '', component: CollectedPageComponent, pathMatch: 'full'},
  { path: ':id', component: CollectedPageComponent },  
];

@NgModule({
  imports: [  
  	RouterModule.forChild(routes),
  ],
  exports: [
  	RouterModule
  ],
  
})
export class CollectedRoutingModule { }