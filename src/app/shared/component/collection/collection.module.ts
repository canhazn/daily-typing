import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CollectionComponent } from './collection.component';
import { EditCollectionBtnModule } from '@shared/component/edit-collection-btn/edit-collection-btn.module';

@NgModule({
  declarations: [  
    CollectionComponent,    
  ],
  imports: [
    SharedModule,
    EditCollectionBtnModule
  ],    
  exports: [ CollectionComponent ]
})
export class CollectionModule { }