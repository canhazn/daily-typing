import { NgModule } from '@angular/core';

import { EditorComponent } from './editor.component';
import { NoteInforDialog } from './dialog/note-infor/note-infor.dialog';
import { CollectNoteDialog } from './dialog/collect-note/collect-note.dialog';

import { SharedModule }      from '@shared/shared.module';

@NgModule({
  declarations: [ 
    NoteInforDialog,    
    CollectNoteDialog, 
    EditorComponent,    
  ],
  imports: [
    SharedModule,
  ],
  entryComponents: [ NoteInforDialog, CollectNoteDialog ],
  exports: [ EditorComponent ]
})
export class EditorModule { }
