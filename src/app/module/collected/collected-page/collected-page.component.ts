import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionNoteService } from '@store/service/collection-note.service';

import { Observable, Subject, of, Subscription } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged, map, distinct, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-collected-page',
  templateUrl: './collected-page.component.html',
  styleUrls: ['./collected-page.component.scss']
})
export class CollectedPageComponent implements OnInit {

	collection: Observable<Collection>;  
  // private _notes = new Subject<Observable<Note> | null>();
	notes: Observable<Observable<Note>[]>;

  constructor( private location: Location, 
               private route: ActivatedRoute, 
               private collectionService: CollectionService, 
               private collectionNoteService : CollectionNoteService,
               private noteService : NoteService, 
              ) { }

  goBack(): void {
    // this function isn't good enough
    // maybe it should be redirect to /home
    this.location.back();
  }

  trackObservableNote(index: number, element: Observable<Note>) {   
    return index;
  }

  ngOnInit() {
  	let collectionId = this.route.snapshot.params.id;
    if (!collectionId) this.goBack();
    
    this.collection = this.collectionService.getCollectionById(collectionId);

    // in case collectionId is not true;
    this.collection.pipe(take(1)).subscribe(rs => !rs ? this.goBack() : null );

    this.notes = this.collection.pipe(
      // first when collection deleted by edit button -> redirect
      tap(collection => !collection ? this.goBack() : "nothing"),
      filter(collection => !!collection),
      map(collection => collection.arrayNoteId),
      // tap(_ => console.log("change ", _)),
      distinctUntilChanged(),
      // tap(_ => console.log("cnahge ", _)),
      map(arrayNoteId => arrayNoteId.map(noteId => this.noteService.getNoteById(noteId))),      
    )    
  }

}
