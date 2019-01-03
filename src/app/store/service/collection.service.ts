import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { AuthService } from '@store/service/auth.service';

import { User }  from '@store/model/auth.model';
import { Collection } from '@store/model/collection.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from, forkJoin } from 'rxjs';
import { take, map, tap, switchMap, shareReplay, catchError, filter, takeWhile, publish } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  /**
   * Get All Collections
   * Get/Create/Update/Detele Collection, SubCollection
   * 
  */

  collections: Observable<Collection[]>;  

  constructor( private afs: AngularFirestore, private authService: AuthService ) {
    this.collections = this.getAllCollection().pipe(shareReplay(1));    
  }

  private getUser(): Observable<User> {
    return this.authService.user.pipe(take(1))
  }

  private getAllCollection(): Observable<any> {
    return this.getUser().pipe(
      map(user => `user/${user.uid}/collection`),
      switchMap(path => this.afs.collection(path, ref => ref.orderBy("createdAt", "desc")).snapshotChanges()),
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Collection;        
        return data;
      }))
    )
  }

  getCollectionById(collectionId: string) : Observable<Collection> {
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/collection/${collectionId}`),
      switchMap(path => this.afs.doc<Collection>(path).snapshotChanges()),
      map(a => {        
        // in case collectionId is not true
        if(!a.payload.exists) return null;        
        const data = a.payload.data() as Collection;        
        return data;
      }),      
    )
  }   

  createCollection(name: string):Observable<Collection> {
    let collection : Collection = {               
      name: name,      
      collectionId: this.afs.createId(),
      createdAt: firestore.Timestamp.now(),
      edittedAt: firestore.Timestamp.now(),
      arrayNoteId: [],      
    };

    return this.getUser().pipe(
      map(user => this.afs.collection(`/user/${user.uid}/collection`)),
      switchMap(path => from (path.doc(collection.collectionId).set(collection)) ),
      map(_ => collection) 
    )  
  }

  deleteCollection(collection: Collection): Observable<any> {
    return this.getUser().pipe(      
      map(user => `user/${user.uid}/collection/${collection.collectionId}`),
      map(path => this.afs.doc<any>(path)),
      switchMap(collection => from(collection.delete()))
    )
  }

  updateCollection(collection: Collection):Observable<any> {
    return this.getUser().pipe(
      map(user => this.afs.doc<any>(`user/${user.uid}/collection/${collection.collectionId}`)),
      tap(() => {
        collection.edittedAt = firestore.Timestamp.now();
        delete collection.collectionId;
      }),
      switchMap(path => from (path.update(collection))),
    )   
  }

  // if delete Note when use on collected page
  deleteNote(note: Note, collectionId: string) {
    return this.getUser().pipe(      
      map(user => this.afs.doc<any>(`user/${user.uid}/collection/${collectionId}`)),  
      switchMap( path => from(path.update({ "arrayNoteId": firestore.FieldValue.arrayRemove(note.noteId) } )))
    )   
  }

  
}