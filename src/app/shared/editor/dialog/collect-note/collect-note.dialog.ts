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
    this.collections = this.collectionService.getCollection();
  }


}
