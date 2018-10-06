import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

@Component({
  selector: 'note-infor',
  templateUrl: './note-infor.dialog.html',
  // styleUrls: ['./note-infor.dialog.scss']
})
export class NoteInforDialog implements OnInit {

    constructor(  public dialogRef: MatDialogRef<NoteInforDialog>,  private noteService : NoteService,  @Inject(MAT_DIALOG_DATA) public note: Note) {}

  deleteNote() {
    this.noteService.deleteNote(this.note).subscribe();
    this.dialogRef.close("deleted");
  }


  ngOnInit() {    
  }



}
