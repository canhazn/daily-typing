import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'collect-note',
  templateUrl: './collect-note.dialog.html',
  styleUrls: ['./collect-note.dialog.scss']
})
export class CollectNoteDialog implements OnInit {

  collections: Observable<any>;
  constructor( public dialogRef: MatDialogRef<CollectNoteDialog>,  
               private noteService : NoteService,                 
               private collectionService : CollectionService,  
               @Inject(MAT_DIALOG_DATA) public note: Note) {}

  ngOnInit() {    
    // this.collections = this.collectionService.getCollection();
  }

  collect(collection: Collection) {        
    if (!this.note.collections) this.note.collections = [];    

    let collectionId = collection.collectionId;

    if (this.note.collections.includes(collectionId)) { 
      

      // this.noteService.removeCollection(collection, this.note).subscribe();
      // this.collectionService.updateCollection(collection);
      // this.collectionService.removeNote(this.note, collection).subscribe();
      // this.noteService.updateCollections(this.note.noteId, this.note.collections);        
    }
    else {
      // this.noteService.addCollection(collection, this.note).subscribe();
      // this.collectionService.addNote(this.note, collection).subscribe();

      // this.noteService.updateCollections(this.note.noteId, this.note.collections);
      // this.collectionService.addNote(collectionId, this.note.noteId);
      // this.collectionService.updateCollection(collection);
    }
  }
}
