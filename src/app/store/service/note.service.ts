import { Injectable } from '@angular/core';
import { firestore } from 'firebase';

import { AngularFirestore } from '@angular/fire/firestore';
import { Store }        from '@ngxs/store';

import { User }  from '@store/model/auth.model';
import { Note } from '@store/model/note.model';
import { Collection } from '@store/model/collection.model';

import { AuthState } from '@store/state/auth.state';

import { Observable, Subject, of, from } from 'rxjs';
import { take, map, tap, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class NoteService {
	userId;	
  constructor( private store: Store, private afs: AngularFirestore ) {}

  private getUser(): Observable<User> {
    return this.store.selectOnce( AuthState.getUser )
  }

  // set a new Note and return ....
  private setNewNote() {  
    // console.log("new note")   ;
    let note: Note = {
      noteId: this.afs.createId(),
      createdAt: firestore.Timestamp.now(),
      edittedAt: firestore.Timestamp.now(),
      content: '',
      like: 0
    };

    return this.getUser().pipe(      
      map(user => this.afs.collection(`/user/${user.uid}/note`)),
      switchMap(path => from (path.doc(note.noteId).set(note)) ),
      map( success => of(note.noteId)),
      catchError(err => of(err))
    )
  }

  // update Note return Observable
  updateNote(note: Note): Observable<any> {
    return this.getUser().pipe(            
      map(user => this.afs.doc<any>(`user/${user.uid}/note/${note.noteId}`)),
      tap(() => delete note.noteId ),
      switchMap(path => from (path.update(note)) ),
    )
  }

  // Delete note
  deleteNote(note: Note): Observable<any>{
    return this.getUser().pipe(         
      map(user => `user/${user.uid}/note/${note.noteId}`),         
      map(path => this.afs.doc<any>(path)),
      // tap(() => console.log("delete")),
      switchMap(path => from (path.delete()) ),
    )
  }
  
  // updateContent(content: string, noteId: string): Observable<any> {
    // let note: Note = {
    //   noteId: noteId,
    //   content: content,
    //   edittedAt: firestore.Timestamp.now(),      
    // }

  //   return this.updateNote(note);
  // }

  // // delete collectionId from  this note
  // removeCollection(collection: Collection, note: Note) {
  //   note.collections = note.collections.filter(id => id != collection.collectionId);    
  //   let newNote : Note = {
  //     noteId: note.noteId,
  //     collections: note.collections
  //   }

  //   return this.updateNote(newNote);
  // }

  // // save collectionId into this note
  // addCollection(collection: Collection,  note: Note) {    
  //   note.collections.push(collection.collectionId);
  //   let newNote: Note = {
  //     noteId: note.noteId,
  //     collections: note.collections
  //   }

  //   return this.updateNote(newNote);
  // }


  // return an observable of today type: Note. IF today note isn't exsist create one
  // getTodayNote(): Observable<Note> {

  //   let today = new Date();       
  //   let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());    
    
  //   return this.getUser().pipe(      
  //     map(user => `/user/${user.uid}/note`),
  //     map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", startTime).limit(1))),
  //     switchMap(noteCollection => noteCollection.valueChanges().pipe(map(([note]) => note as Note))),
  //     tap((note) => {
  //       if (!note) this.setNewNote().subscribe() 
  //     })
  //   )
  // }

    getTodayNote() {

    let today = new Date();       
    let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());    
    
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", startTime).limit(1))),
      switchMap(noteCollection => noteCollection.snapshotChanges()),
      tap(actions => {

        console.log(actions);
        if (actions.length == 0) this.setNewNote().subscribe() 
      })
    )
  }

  fetchThisWeek() {

    let today =  new Date();
    let day = today.getDay();
    let monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (day == 0?-6:1)-day );
    let sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (day == 0?0:7)-day + 1);

     return this.getUser().pipe(      
      map(user => `user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        return query.where("createdAt", ">=", monday).where("createdAt", "<=", sunday).orderBy("createdAt");
      })),
      switchMap(collection => collection.stateChanges()),
    )
  } 

}
