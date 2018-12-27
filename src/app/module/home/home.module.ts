import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';

import { EditorModule } from '../../shared/editor/editor.module';
import { CollectionModule } from '../../shared/collection/collection.module';
import { SharedModule }      from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HomeRoutingModule,

    EditorModule,
    CollectionModule,

    SharedModule,    
  ],
  exports: [ ],
  declarations: [ HomePageComponent ]
})
export class HomeModule { }
