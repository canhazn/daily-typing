import { Component, OnInit, Input, Inject, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { firestore } from 'firebase/app';


import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';
import { Collection } from '@store/model/collection.model';

import { NoteInforDialog }   from './dialog/note-infor/note-infor.dialog';
import { CollectNoteDialog } from './dialog/collect-note/collect-note.dialog';

import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, take, delay } from 'rxjs/operators';


@Component({
  selector: 'app-editor',  
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() note : Note;
  @Input() noteId : string;
  @Input() timeFormat: "dayOfWeek" | "dayOfMonth" | "timeAgo";

  private _contentChanged  = new Subject<string | null>();
  private _state = new Subject<"typing" | "saved" | null>();
  private _like  = new Subject<null>();
  subscription : Subscription;
  state = this._state.asObservable();

  constructor(private noteService: NoteService, public dialog: MatDialog) {}

  typing() :void {        
    this._contentChanged.next(this.note.content);    
  }

  like():void {
    if (!Number.isInteger(this.note.like)) this.note.like = 0;
    
    if (this.note.like >= 5) return;
    this.note.like ++;

    this._like.next()
  }

  ngOnDestroy() {
    if (this.noteId) this.subscription.unsubscribe();
  }

  ngOnInit() {   
    // if input value is nodeId
    // What if noteId is deleted??? --> noteService not return anything (valuechange())
    if (this.noteId) {      
      this.subscription = this.noteService.getNoteById(this.noteId).pipe(
        tap(note => this.note = note),      
      ).subscribe()
    }

    // save content algorithm
    this._contentChanged.pipe(      
      tap(_ => this._state.next("typing")),
      debounceTime(2000),
      switchMap(() => {
        let update: Note = {
          noteId: this.note.noteId,
          content: this.note.content,
          edittedAt: firestore.Timestamp.now(),      
        } 
        return this.noteService.updateNote(update);
      }),      
      tap(_ => this._state.next("saved"))
    ).subscribe()

    this._state.pipe(      
      debounceTime(3000),
      tap(state => state == 'saved' ? this._state.next() : null)
    ).subscribe();
    

    // save like algorithm
    this._like.pipe(      
      debounceTime(2000),
      switchMap(() => {
        let update : Note = {
          noteId: this.note.noteId,
          like: this.note.like,
        }
        return this.noteService.updateNote(update)
      }),     
    ).subscribe()
  }

  openNoteInforDialog(): void {
    const dialogRef = this.dialog.open(NoteInforDialog, {
      width: '95%',
      maxWidth: '900px',
      data: this.note,
    });    
  }

  openCollectNoteDialog(): void {
    const dialogRef = this.dialog.open(CollectNoteDialog, {
      width: '95%',  
      maxWidth: '900px',      
      data: this.note,
    });
  }
}
