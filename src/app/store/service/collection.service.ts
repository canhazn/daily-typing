import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { firestore } from 'firebase';

import { Store }        from '@ngxs/store';
import { AuthState } from '@store/state/auth.state';
import { User }  from '@store/model/auth.model';

// import { Note } from '../editor/note.model';
import { Collection } from '@store/model/collection.model';
// import { Collected } from '@store/model/collection.model';

import { Observable, Subject, of, from, forkJoin } from 'rxjs';
import { take, map, tap, switchMap, catchError } from 'rxjs/operators';


@Injectable()
export class CollectionService {

  constructor( private afs: AngularFirestore, private store: Store ) { }

  private getUser(): Observable<User> {
    return this.store.selectOnce( AuthState.getUser )
  }
  // create a collection and return a observable
  setNewCollection(name: string):Observable<any> {
    let collection : Collection = {               
      name: name,      
      collectionId: this.afs.createId(),
      createdAt: firestore.Timestamp.now(),      
      edittedAt: firestore.Timestamp.now(),
      arrayNoteId: [],
      numberOfNote: 0,
    };

    return this.getUser().pipe(      
      map(user => this.afs.collection(`/user/${user.uid}/collection`)),
      switchMap(path => from (path.doc(collection.collectionId).set(collection)) ),      
    )  
  }

  deleteCollection(collection: Collection): Observable<any> {
    return this.getUser().pipe(      
      map(user => `user/${user.uid}/collection/${collection.collectionId}`),
      map(path => this.afs.doc<any>(path)),
      switchMap(collection => from(collection.delete()))
    )
  }

  // removeNote(note: Note, collection: Collection) {
  //   collection.arrayNoteId = collection.arrayNoteId.filter(id => id == note.noteId)
  //   this.updateCollection(collection);
  // }

  // addNote(note: Note, collection: Collection) {
  //   collection.arrayNoteId.push(note.noteId);
  //   this.updateCollection(collection);
  // }


  

  updateCollection(collection: Collection):Observable<any> {
    return this.getUser().pipe(      
      map(user => this.afs.doc<any>(`user/${user.uid}/collection/${collection.collectionId}`)),
      tap(() => delete collection.collectionId),
      switchMap(path => from (path.update(collection))),
    )   
  }

  fetchCollection() {
     return this.getUser().pipe(      
      map(user => this.afs.collection(`user/${user.uid}/collection`)),
      switchMap(collection => collection.stateChanges()),
    )
  }

  getCollectionById(collectionId: string): Observable<Collection> {
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/collection/${collectionId}`),
      map(path => this.afs.doc<Collection>(path)),
      switchMap(collection => collection.valueChanges())
    )
  }   
}