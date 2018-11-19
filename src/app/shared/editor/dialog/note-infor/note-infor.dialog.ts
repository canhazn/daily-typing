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

  collections: Observable<Collection[]>;

  constructor(  public dialogRef: MatDialogRef<NoteInforDialog>,
                private noteService : NoteService,  
                private collectionService: CollectionService,
                @Inject(MAT_DIALOG_DATA) public note: Note) {}

  deleteNote() {
    // remove noteId in collection first
    if(this.note.arrayCollectionId && this.note.arrayCollectionId.length != 0) {
      console.log("arrayCollectionId.length != 0");
      this.collections.pipe(
        take(1),
        tap(collections => collections.map(collection => {
          if (collection.arrayNoteId.includes(this.note.noteId))
            this.collectionService.deleteNote(this.note, collection.collectionId).subscribe();
          // else      
        })),        
      ).subscribe();      
    }

    this.noteService.deleteNote(this.note).subscribe();
    this.dialogRef.close("deleted");
  }
  
  clearLike() {
    if (!Number.isInteger(this.note.like)) return;
    if(this.note.like == 0) return;
    let update : Note = {
      noteId: this.note.noteId,
      like: 0,
    }

    this.noteService.updateNote(update).subscribe(_ => this.note.like = 0);
  }

  ngOnInit() {        
    if(this.note.arrayCollectionId && this.note.arrayCollectionId.length != 0) 
      this.collections = this.collectionService.collections;
  }
}
0