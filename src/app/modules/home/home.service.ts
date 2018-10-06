import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { User }  from '../../core/auth/user.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from } from 'rxjs';
import { finalize, take, map, first, switchMap, tap, catchError } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';
import { AuthState } from '@store/state/auth.state';

@Injectable()
export class HomeService {
	
  constructor(private store: Store, private afs: AngularFirestore) {}
  
  private getUser(): Observable<User> {
  	return this.store.selectOnce(AuthState.getUser)
  }


  // return an observable of today type: Note.
  getTodayNote() {

  	let today = new Date();       
    let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());    
    
  	return this.getUser().pipe(  		
  		map(user => `/user/${user.uid}/note`),
  		map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", startTime).limit(1))),
  		switchMap(noteCollection => noteCollection.valueChanges().pipe(map(([note]) => note)))
  	)
  }

  // set a new Note and return ....
  setNewNote() {  
  	console.log("new note")   ;
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

  // query all of collections, return an observable with array of collections

  getCollection() {
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/collection`),
      map(path => this.afs.collection(path)),
      switchMap(collection => collection.valueChanges())
    )
  }

  

}
