import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionNoteService } from '@store/service/collection-note.service';

import { Observable, Subject, of, Subscription } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-collected-page',
  templateUrl: './collected-page.component.html',
  styleUrls: ['./collected-page.component.scss']
})
export class CollectedPageComponent implements OnInit {

	collection: Observable<Collection>;  
  private _notes = new Subject<Observable<Note> | null>();
	notes: Observable<Observable<Note>[]>;

  constructor( private location: Location, 
               private route: ActivatedRoute, 
               private collectionService: CollectionService, 
               private collectionNoteService : CollectionNoteService,
               private noteService : NoteService, 
              ) { }

  goBack(): void {
      this.location.back();
  }

  trackObservableNote(index: number, element: Observable<Note>) {   
    return index;
  }

  addNote(collection: Collection) {
    this.noteService.createNote().pipe(
      tap(console.log),
      switchMap(note => this.collectionNoteService.collectNote(note, collection))      
    ).subscribe();
  }

  ngOnInit() {
  	let collectionId = this.route.snapshot.params.id;
    if (!collectionId) this.goBack();
    
    this.collection = this.collectionService.getCollectionById(collectionId);    
    this.notes = this.collection.pipe(
      map(collection => collection.arrayNoteId),
      distinctUntilChanged(),
      map(arrayNoteId => arrayNoteId.map(noteId => this.noteService.getNoteById(noteId))),
      tap(console.log),
    )    
  }

}
