import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { Store }        from '@ngrx/store';
import { User }  from '../../core/auth/user.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from } from 'rxjs';
import { finalize, take, map, first, switchMap, tap, catchError } from 'rxjs/operators';

@Injectable()
export class CollectedService {
	
  constructor(private store: Store<{user: User}>, private afs: AngularFirestore) {}
  
  private getUser(): Observable<User> {
  	return this.store.select('user').pipe(take(1));
  }

  getCollectedService(collectionId: string) {
  	return this.getUser().pipe(      
      map(user => `/user/${user.uid}/collection/${collectionId}/collected`),
      map(path => this.afs.collection(path, ref => ref.orderBy("createdAt", "asc"))),
      switchMap(collected => collected.valueChanges()),      
    )
  }

  getNote(noteId: string) {  	
  	return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note/${noteId}`),
      map(path => this.afs.doc<Note>(path) ),
      switchMap(note => note.valueChanges()),      
    )
  }

}
