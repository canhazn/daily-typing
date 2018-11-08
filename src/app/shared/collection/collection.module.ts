import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CollectionComponent } from './collection.component';

import { CreateCollectionDialog } from './dialog/create-collection/create-collection.dialog';
import { EditCollectionDialog } from './dialog/edit-collection/edit-collection.dialog';

import { SharedModule }      from '@shared/shared.module';

@NgModule({
  declarations: [  
    CreateCollectionDialog,   
    EditCollectionDialog, 
    CollectionComponent,    
  ],
  imports: [
    CommonModule,    
    SharedModule,    
    FormsModule,
  ],  
  entryComponents: [ CreateCollectionDialog, EditCollectionDialog ],
  exports: [ CollectionComponent ]
})
export class CollectionModule { }
