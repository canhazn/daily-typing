import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { Observable, Subject, of, forkJoin } from 'rxjs';
import { finalize, take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'collect-note',
  templateUrl: './collect-note.dialog.html',
  styleUrls: ['./collect-note.dialog.scss']
})
export class CollectNoteDialog implements OnInit {

  collections :Observable<any>;
  collectionName : string = '';
  constructor( public dialogRef: MatDialogRef<CollectNoteDialog>,                 
               private noteService : NoteService,                 
               private collectionService : CollectionService,  
               @Inject(MAT_DIALOG_DATA) public note: Note) {}

  createCollection($event: any) {    
    let name = $event.target.value;

    if (name == '') return;
    this.collectionService.setNewCollection(name).subscribe();        
    $event.target.value = "";
    $event.target.blur();
  }

  collect(collection: Collection) {    
    if (collection.arrayNoteId.includes(this.note.noteId)) {           
      this.collectionService.removeNote(this.note, collection).subscribe(_ => {        
        this.dialogRef.close();
      });
    }
    else {      
      this.collectionService.collectNote(this.note, collection).subscribe(_ => {
        this.dialogRef.close();
      });
    }
  }

  ngOnInit() {    
    // this.store.selectOnce( CollectionState.getInitialized ).pipe(
    //   filter(initialized => !initialized),
    //   tap(() => this.store.dispatch(new FetchCollection()))
    // ).subscribe()

    this.collections = this.collectionService.getCollection();

    // this.store.select( CollectionState.getCollection ).pipe(
    //     tap(curr => {
    //         console.log(curr);
    //         if (this.collections.length < curr.length) {
    //           let index = curr.length -1;                                     
    //           for( index; index >= 0; index--) 
    //               if (!this.collections.includes(curr[index]) ) this.collections.unshift(curr[index]);                
    //         }

    //         if (this.collections.length > curr.length) {
    //           for ( let index = 0; index <= this.collections.length -1; index++) {
    //             if (!curr.includes(this.collections[index])) this.collections.splice(index, 1);
    //           }
    //         }

    //         if (this.collections.length == curr.length) {
    //           for(let i = 0; i <= this.collections.length - 1; i++) 
    //             if (this.collections[i] == curr[i]) this.collections[i] = curr[i];                              
    //         }

    //         this.collections.sort( (a : Collection, b : Collection) => b.edittedAt.seconds - a.edittedAt.seconds);
    //     })
    // ).subscribe();
  }


}
