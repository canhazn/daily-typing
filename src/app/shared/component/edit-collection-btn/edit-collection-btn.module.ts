import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { EditCollectionBtnComponent } from './edit-collection-btn.component';
import { EditCollectionDialog } from './dialog/edit-collection.dialog';

@NgModule({
  declarations: [  
    EditCollectionBtnComponent,
    EditCollectionDialog
  ],
  imports: [
    SharedModule
  ],  
  exports: [ EditCollectionBtnComponent ],
  entryComponents: [ EditCollectionDialog ],  
})
export class EditCollectionBtnModule { }
