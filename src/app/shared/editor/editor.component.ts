import { Component, OnInit, OnDestroy, Input, Inject, NgZone, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { firestore } from 'firebase/app';


import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';
import { Collection } from '@store/model/collection.model';

import { NoteInforDialog }   from './dialog/note-infor/note-infor.dialog';
import { CollectNoteDialog } from './dialog/collect-note/collect-note.dialog';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, filter, take } from 'rxjs/operators';


@Component({
  selector: 'app-editor',  
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() note : Note;
  @Input() weekday: boolean;

  private _contentChanged  = new Subject<string | null>();
  private _state = new Subject<"typing" | "saved" | null>();
  private _like  = new Subject<null>();
  
  state = this._state.asObservable();

  constructor(private noteService: NoteService, public dialog: MatDialog) {

  }


  typing() :void {        
    this._contentChanged.next(this.note.content);    
  }

  like():void {
    if (!Number.isInteger(this.note.like)) this.note.like = 0;
    
    if (this.note.like >= 50) return;
    this.note.like ++;

    this._like.next()
  }

  ngOnInit() {   
    this._contentChanged.pipe(
      distinctUntilChanged(),      
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
      tap(),
      tap(_ => this._state.next("saved"))
    ).subscribe()

    this._state.pipe(
      distinctUntilChanged(),
      filter(state => state == 'saved'),
      debounceTime(3000),
      tap(_ => this._state.next())
    ).subscribe();

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

  ngOnDestroy() {
    // this._contentChanged.unsubscribe();
    // this._state.unsubscribe();
    // this._like.unsubscribe();
  }

  openNoteInforDialog(): void {
    const dialogRef = this.dialog.open(NoteInforDialog, {
      width: '95%',
      maxWidth: '900px',
      data: this.note,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result, typeof(result));
    //   // if (result = "deleted") this.note = {};
    //   // this.note = result;
    // });
  }

  openCollectNoteDialog(): void {
    const dialogRef = this.dialog.open(CollectNoteDialog, {
      width: '95%',  
      maxWidth: '900px',      
      data: this.note,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;
    //   this.note = result;
    // });
  }
}
