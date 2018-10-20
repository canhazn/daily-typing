import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
// import { SharedModule }      from '@shared/shared.module';

import { EditorModule } from '../../shared/editor/editor.module';
import { CollectionModule } from '../../shared/collection/collection.module';
import { MaterialModule } from '@shared/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,
    // SharedModule,
    EditorModule,
    CollectionModule,
    MaterialModule,
  ],
  exports: [ 
    // HomePageComponent,
    // HomeRoutingModule
  ],
  declarations: [HomePageComponent]
})
export class HomeModule { }
