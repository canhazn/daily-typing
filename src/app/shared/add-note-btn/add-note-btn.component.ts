import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, take, delay, map } from 'rxjs/operators';
@Component({
  selector: 'app-add-note-btn',
  templateUrl: './add-note-btn.component.html',
  styleUrls: ['./add-note-btn.component.scss']
})
export class AddNoteBtnComponent implements OnInit {

  private _state = new BehaviorSubject<"init" | "running" | "done" | null>('init');
  state = this._state.asObservable();

  constructor(private noteService: NoteService, private collectionService: CollectionService) { }
  
  createNote() {
    this._state.next("running");
  }
  
  ngOnInit() {
    this._state.pipe(      
      filter(state => state == 'running'),      
      switchMap(_ => this.noteService.createNote()),
      tap(_ => this._state.next('done')),
      delay(5000),
      tap(_ => this._state.next('init')),
    ).subscribe();
  }
}