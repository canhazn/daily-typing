import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { CollectionNoteService } from '@store/service/collection-note.service';

import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, take, delay, map } from 'rxjs/operators';
@Component({
  selector: 'app-add-note-btn',
  templateUrl: './add-note-btn.component.html',
  styleUrls: ['./add-note-btn.component.scss']
})
export class AddNoteBtnComponent implements OnInit {
  // when add-note-button in collected;
  @Input() collection : Collection;
  
  private _state = new BehaviorSubject<"init" | "running" | "done" | null>('init');
  state = this._state.asObservable();

  constructor(private noteService: NoteService, private collectionNoteService : CollectionNoteService,) { }
  
  createNote() {
    this._state.next("running");
  }
  
  ngOnInit() {
    this._state.pipe(      
      filter(state => state == 'running'),      
      switchMap(_ => this.noteService.createNote()),
      switchMap(note => this.collection ? this.collectionNoteService.collectNote(note, this.collection) : of(null)),
      tap(_ => this._state.next('done')),
      delay(5000),
      tap(_ => this._state.next('init')),
    ).subscribe();
  }
}