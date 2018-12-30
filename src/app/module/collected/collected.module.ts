import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { CollectedPageComponent } from './collected-page/collected-page.component';
import { SharedModule }      from '@shared/shared.module';
import { SharedComponent }      from '@shared/component/shared.component';

const routes: Routes = [
  { path: '', component: CollectedPageComponent, pathMatch: 'full'},
  { path: ':id', component: CollectedPageComponent },  
];


@NgModule({
  declarations: [ 
    CollectedPageComponent, 
    
  ],
  imports: [
    SharedModule,
    SharedComponent,
    RouterModule.forChild(routes)
  ],
  exports: [ CollectedPageComponent ],
})
export class CollectedModule { }
