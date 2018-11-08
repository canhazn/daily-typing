import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, Subscription } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-collected-page',
  templateUrl: './collected-page.component.html',
  styleUrls: ['./collected-page.component.scss']
})
export class CollectedPageComponent implements OnInit {

	
  subscription: Subscription;
  collectionName : string;
	notes: Observable<any>;

  constructor( private location: Location, 
               private route: ActivatedRoute, 
               private collectionService: CollectionService, 
               private noteService : NoteService, 
              ) { }

  goBack(): void {
      this.location.back();
  }

  ngOnInit() {
  	let collectionId = this.route.snapshot.params.id;

    this.notes = this.collectionService.getCollectionById(collectionId).pipe(
      tap(collecion => this.collectionName = collecion.name),
      distinctUntilChanged(),
      switchMap(collection => of(collection.arrayNoteId)),
      // tap(_ => console.log("------------------", _)),
      map(arrayNoteId => arrayNoteId.map( noteId => this.noteService.getNoteById(noteId)))
    )

    // this.subscription.
  }

}
