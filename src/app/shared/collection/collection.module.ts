import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material';

// import { CollectionService } from '@store/service/collection.service';
import { CollectionComponent } from './collection.component';

import { CreateCollectionDialog } from './dialog/create-collection/create-collection.dialog';
import { EditCollectionDialog } from './dialog/edit-collection/edit-collection.dialog';

import { MaterialModule } from '@shared/material';

@NgModule({
  declarations: [  
    CreateCollectionDialog,   
    EditCollectionDialog, 
    CollectionComponent 
  ],
  imports: [
    CommonModule,
    // MatButtonModule,
    MaterialModule,
    FormsModule,
  ],
  // providers:[ CollectionService ],
  entryComponents: [ CreateCollectionDialog, EditCollectionDialog ],
  exports: [ CollectionComponent ]
})
export class CollectionModule { }
