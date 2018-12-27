import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollectedPageComponent } from './collected-page/collected-page.component';
import { CollectedRoutingModule } from './collected-routing.module';
import { SharedModule }      from '@shared/shared.module';

import { EditorModule } from '../../shared/editor/editor.module';
import { CollectionModule } from '../../shared/collection/collection.module';

import { MaterialModule } from '../../shared/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CollectedRoutingModule,    
    MaterialModule,
    EditorModule,
    CollectionModule,
    
  ],
  exports: [ CollectedPageComponent ],
  declarations: [ CollectedPageComponent ]
})
export class CollectedModule { }
