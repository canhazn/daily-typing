import { Component, OnInit, Input, Inject, NgZone, ViewChild } from '@angular/core';
import {MatDialog } from '@angular/material';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';


import { firestore } from 'firebase';
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
export class EditorComponent implements OnInit {
  @Input() note : Note;
  @Input() timeAgo: boolean;
  // @Input() collections: Observable<Collection[]>;
  private _contentChanged  = new Subject<string | null>();
  private _state = new Subject<string | null>();

  contentChanged = this._contentChanged.asObservable();
  state = this._state.asObservable();

  constructor(private noteService: NoteService, public dialog: MatDialog, private ngZone: NgZone) {

  }


  typing() :void {    
    this._contentChanged.next(this.note.content);    
  }

  like():void {
    if (!Number.isInteger(this.note.like)) this.note.like = 0;
    
    if (this.note.like >= 50) return;
    this.note.like ++;

    let update : Note = {
      noteId: this.note.noteId,
      like: this.note.like,
    }

    this.noteService.updateNote(update).subscribe();
  }

  ngOnInit() {   
    this._contentChanged.pipe(
      distinctUntilChanged(),      
      tap(() => this._state.next("typing")),
      debounceTime(1000),
      switchMap(() => {
        let update: Note = {
          noteId: this.note.noteId,
          content: this.note.content,
          edittedAt: firestore.Timestamp.now(),      
        }
        return this.noteService.updateNote(update)
      }),
    ).subscribe(() => {      
      this._state.next("saved");         
    })

    this._state.pipe(
      distinctUntilChanged(),
      filter(state => state == 'saved'),
      debounceTime(3000),
      tap(() => this._state.next(""))
    ).subscribe();
  }

  openNoteInforDialog(): void {
    const dialogRef = this.dialog.open(NoteInforDialog, {
      width: '95%',
      maxWidth: '900px',
      // maxHeight: '100vh',      
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
      // autoFocus: false,    
      // maxHeight: '100vh',
      data: this.note,
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;
    //   this.note = result;
    // });
  }
}
