import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { TopNavComponent } from './top-nav/top-nav.component';

import { CollectionModule } from './collection/collection.module';
import { EditorModule } from './editor/editor.module';

// import { NoteInforDialog } from '../editor/editor.component';
// import { CollectNoteDialog } from '../editor/editor.component';

// import { CollectionComponent } from '../collection/collection.component';
// import { EditCollectionDialog } from '../collection/collection.component';

@NgModule({
  imports: [
    CommonModule, 
    BrowserAnimationsModule, 
    MaterialModule, 
    FormsModule,   
    RouterModule
  ],
  // entryComponents: [NoteInforDialog, CollectNoteDialog, EditCollectionDialog],
	declarations: [TopNavComponent ],
	exports: [TopNavComponent]
})
export class SharedModule { }