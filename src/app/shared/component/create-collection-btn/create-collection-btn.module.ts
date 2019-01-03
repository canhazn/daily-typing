import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CreateCollectionBtnComponent } from './create-collection-btn.component';
import { CreateCollectionDialog } from './dialog/create-collection.dialog';

@NgModule({
  declarations: [  
    CreateCollectionBtnComponent,
    CreateCollectionDialog
  ],
  imports: [
    SharedModule
  ],  
  exports: [ CreateCollectionBtnComponent ],
  entryComponents: [ CreateCollectionDialog ],  
})
export class CreateCollectionBtnModule { }
