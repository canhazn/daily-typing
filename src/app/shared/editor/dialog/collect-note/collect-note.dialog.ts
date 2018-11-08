import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { Observable, Subscription } from 'rxjs';
import { skip, take, tap, switchMap, startWith, pairwise } from 'rxjs/operators';

@Component({
  selector: 'collect-note',
  templateUrl: './collect-note.dialog.html',
  styleUrls: ['./collect-note.dialog.scss']
})
export class CollectNoteDialog implements OnInit, OnDestroy {

  collections :Observable<any>;
  collectionName : string = '';
  sub: Subscription;

  constructor( public dialogRef: MatDialogRef<CollectNoteDialog>,                 
               private noteService : NoteService,                 
               private collectionService : CollectionService,  
               @Inject(MAT_DIALOG_DATA) public note: Note) {}

  createCollection($event: any) {    
    let name = $event.target.value;

    if (name == '') return;
    this.collectionService.setNewCollection(name).pipe(
      switchMap(collection => this.collectionService.collectNote(this.note, collection))
    ).subscribe();        
    $event.target.value = "";
    $event.target.blur();
  }

  collect(collection: Collection) {
    if (collection.arrayNoteId.includes(this.note.noteId) )
      this.collectionService.removeNote(this.note, collection).subscribe();
    else
      this.collectionService.collectNote(this.note, collection).subscribe();
  }

  ngOnInit() {
    this.collections = this.collectionService.collections;
    this.sub = this.collectionService.collections.pipe(
      startWith(null),
      pairwise(),      
      skip(1),      
      tap(([old, curr]) => {
        console.log(curr);
        if (old.length < curr.length) return;
        this.dialogRef.close()
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}