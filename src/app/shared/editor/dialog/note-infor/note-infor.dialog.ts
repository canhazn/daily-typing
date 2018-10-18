import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Store }        from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';

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

  collections : Observable<any>
  constructor(  public dialogRef: MatDialogRef<NoteInforDialog>,
                private store : Store,  
                private noteService : NoteService,  
                private collectionService: CollectionService,
                @Inject(MAT_DIALOG_DATA) public note: Note) {}

  deleteNote() {
    // remove noteId in collection first
    if(this.note.arrayCollectionId) {
      this.note.arrayCollectionId.forEach(collectionId => {
        this.collections.pipe(
          switchMap(arrayCollection => from(arrayCollection)),
          filter((collection: Collection) => collection.collectionId == collectionId),
          map(changedCollection => {  
            return {
              collectionId: collectionId,
              arrayNoteId: changedCollection.arrayNoteId.filter(noteId => noteId != this.note.noteId)
            }            
          }),
          switchMap(update => this.collectionService.updateCollection(update))
        ).subscribe();
      })
    }

    this.noteService.deleteNote(this.note).subscribe();
    this.dialogRef.close("deleted");

  }

  private fetchCollection() {
    this.store.select( CollectionState.getInitialized ).pipe(
      filter(initialized => !initialized),
      tap(() => this.store.dispatch(new FetchCollection()))
    ).subscribe()
  }

  ngOnInit() {    
    
    if(this.note.arrayCollectionId && this.note.arrayCollectionId.length != 0) this.fetchCollection();

    // this.collections = this.store.select( CollectionState.getCollection )

    this.collections = this.store.select( CollectionState.getCollection )
  }



}
