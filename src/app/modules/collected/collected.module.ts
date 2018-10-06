import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CollectedService } from './collected.service';

import { CollectedPageComponent } from './collected-page/collected-page.component';
import { CollectedRoutingModule } from './collected-routing.module';
// import { SharedModule }      from '@shared/shared.module';

import { EditorModule } from '../../shared/editor/editor.module';
import { CollectionModule } from '../../shared/collection/collection.module';

import { MaterialModule } from '../../shared/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CollectedRoutingModule,    
    MaterialModule,
    EditorModule,
    CollectionModule
  ],
  providers: [ CollectedService ],
  exports: [ CollectedPageComponent ],
  declarations: [ CollectedPageComponent ]
})
export class CollectedModule { }