import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { EditorComponent } from './editor.component';

import { NoteInforDialog } from './dialog/note-infor/note-infor.dialog';
import { CollectNoteDialog } from './dialog/collect-note/collect-note.dialog';

import { MaterialModule } from '../material';

@NgModule({
  declarations: [ 
    NoteInforDialog, 
    CollectNoteDialog, 
    EditorComponent 
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MaterialModule,
    FormsModule,
  ],
  entryComponents: [ NoteInforDialog, CollectNoteDialog ],
  exports: [ EditorComponent ]
})
export class EditorModule { }
