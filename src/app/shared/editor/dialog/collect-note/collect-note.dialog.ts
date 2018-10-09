import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { Store }        from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';

import { Observable, Subject, of, forkJoin } from 'rxjs';
import { finalize, take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'collect-note',
  templateUrl: './collect-note.dialog.html',
  styleUrls: ['./collect-note.dialog.scss']
})
export class CollectNoteDialog implements OnInit {

  collections = [];
  constructor( public dialogRef: MatDialogRef<CollectNoteDialog>,  
               private store : Store,
               private noteService : NoteService,                 
               private collectionService : CollectionService,  
               @Inject(MAT_DIALOG_DATA) public note: Note) {}


  collect(collection: Collection) {    
    if (!this.note.arrayCollectionId) this.note.arrayCollectionId = [];    

    let collectionId = collection.collectionId;

    if (this.note.arrayCollectionId.includes(collectionId)) {      
      this.note.arrayCollectionId = this.note.arrayCollectionId.filter(id => id != collectionId);
      collection.arrayNoteId = collection.arrayNoteId.filter(id => id != this.note.noteId);

    }
    else {
      this.note.arrayCollectionId.push(collectionId);
      collection.arrayNoteId.push(this.note.noteId);
    }

      let updateNote = this.noteService.updateNote({
        noteId: this.note.noteId, 
        arrayCollectionId: this.note.arrayCollectionId
      });

      let updateCollection = this.collectionService.updateCollection({
        collectionId: collectionId, 
        arrayNoteId: collection.arrayNoteId
      }); 

      forkJoin(updateNote, updateCollection).subscribe(() => {
      });
  }

  ngOnInit() {    
    this.store.select( CollectionState.getInitialized ).pipe(
      filter(initialized => !initialized),
      tap(() => this.store.dispatch(new FetchCollection()))
    ).subscribe()

    // this.collections = this.store.select( CollectionState.getCollection )

    this.store.select( CollectionState.getCollection ).pipe(
        // map(objectNotes =>  Object.values(objectNotes))
        tap( arrayCollection => {
          // console.log(arrayCollection);

          if (this.collections.length < arrayCollection.length) {
            this.collections = arrayCollection;
            return;
          }

          if (this.collections.length > arrayCollection.length) {
            // this.collections.push(arrayCollection[arrayCollection.length - 1])
            // let arrayNoteId = arrayCollection.map(note => note.noteId);
            // let changedNote = this.collections.filter(note => !arrayNoteId.include(note.noteId));

            this.collections = arrayCollection;
            return;
          }

          for(let i = 0; i <= this.collections.length - 1; i++) {
            if (Object.is(this.collections[i], arrayCollection[i])) {
              this.collections[i] = arrayCollection[i];
              return;
            }
          }

        })
      ).subscribe();
  }


}
