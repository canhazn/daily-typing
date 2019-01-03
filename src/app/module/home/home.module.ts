import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';

import { SharedComponent } from '@shared/component/shared.component';
import { SharedModule }      from '@shared/shared.module';

const routes: Routes = [
  { path: '', component: HomePageComponent },  
];

@NgModule({
  declarations: [ 
    HomePageComponent 
  ],
  imports: [
    RouterModule.forChild(routes),    
    SharedModule,    
    SharedComponent
  ],
  exports: [ ]
})
export class HomeModule { }
