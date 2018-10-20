import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from } from 'rxjs';
import { finalize, take, tap, filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'note-infor',
  templateUrl: './note-infor.dialog.html',
  styleUrls: ['./note-infor.dialog.scss']
})
export class NoteInforDialog implements OnInit {

  collections : Observable<any>;
  constructor(  public dialogRef: MatDialogRef<NoteInforDialog>,
                private noteService : NoteService,  
                private collectionService: CollectionService,
                @Inject(MAT_DIALOG_DATA) public note: Note) {}

  deleteNote() {
    // remove noteId in collection first
    if(this.note.arrayCollectionId && this.note.arrayCollectionId.length != 0) {
      console.log("arrayCollectionId.length != 0");
      this.note.arrayCollectionId.forEach(collectionId => {
       this.collectionService.deleteNote(this.note, collectionId);
      })
    }

    this.noteService.deleteNote(this.note).subscribe();
    this.dialogRef.close("deleted");

  }
  

  ngOnInit() {    
    

    this.collections = this.collectionService.getCollection();



  }



}
