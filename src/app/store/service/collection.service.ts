import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';


import { AuthService } from '@store/service/auth.service';

import { User }  from '@store/model/auth.model';
import { Collection } from '@store/model/collection.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from, forkJoin } from 'rxjs';
import { take, map, tap, switchMap, catchError, filter, share } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor( private afs: AngularFirestore, private authService: AuthService ) { }

  private getUser(): Observable<User> {
    return this.authService.user.pipe(
      filter(user => !!user),
    )
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


  getCollection() {
     return this.getUser().pipe(      
      map(user => this.afs.collection(`user/${user.uid}/collection`, ref => ref.orderBy("createdAt", "desc"))),
      switchMap(collection => collection.snapshotChanges().pipe(        
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Collection;
            console.log(a.payload.doc.metadata.fromCache, data)
            return data;
        })),        
      )),
    )
  }
  

  updateCollection(collection: Collection):Observable<any> {
    return this.getUser().pipe(      
      map(user => this.afs.doc<any>(`user/${user.uid}/collection/${collection.collectionId}`)),
      tap(() => {
        collection.edittedAt = firestore.Timestamp.now();
        delete collection.collectionId
      }),
      switchMap(path => from (path.update(collection))),
    )   
  }

  collectNote(note: Note, collection: Collection) {
    return this.getUser().pipe(      
      map(user => [ 
          this.afs.doc<any>(`user/${user.uid}/collection/${collection.collectionId}`),
          this.afs.doc<any>(`user/${user.uid}/note/${note.noteId}`),
        ]
      ),  
      switchMap(([path1, path2]) => forkJoin (
        path1.update({ "arrayNoteId": firestore.FieldValue.arrayUnion(note.noteId) } ),
        path2.update({ "arrayCollectionId": firestore.FieldValue.arrayUnion(collection.collectionId) } ),
      )),
    )   
  }

  removeNote(note: Note, collection: Collection) {
    return this.getUser().pipe(      
      map(user => [ 
          this.afs.doc<any>(`user/${user.uid}/collection/${collection.collectionId}`),
          this.afs.doc<any>(`user/${user.uid}/note/${note.noteId}`),
        ]
      ),  
      switchMap(([path1, path2]) => forkJoin (
        path1.update({ "arrayNoteId": firestore.FieldValue.arrayRemove(note.noteId) } ),
        path2.update({ "arrayCollectionId": firestore.FieldValue.arrayRemove(collection.collectionId) } ),
      )),
    )   
  }

  deleteNote(note: Note, collectionId: string) {
    return this.getUser().pipe(      
      map(user => this.afs.doc<any>(`user/${user.uid}/collection/${collectionId}`)),  
      switchMap( path => from(path.update({ "arrayNoteId": firestore.FieldValue.arrayRemove(note.noteId) } )))
    )   
  }


  fetchCollection() {
     return this.getUser().pipe(      
      map(user => this.afs.collection(`user/${user.uid}/collection`, ref => ref.orderBy("createdAt", "asc"))),
      switchMap(collection => collection.stateChanges()),
    )
  }

  fetchCollect() {
     return this.getUser().pipe(      
      map(user => this.afs.collection(`user/${user.uid}/collection`, ref => ref.orderBy("createdAt", "asc"))),
      switchMap(collection => collection.valueChanges()),
    )
  }

  getCollectionById(collectionId: string) : Observable<Collection> {
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/collection/${collectionId}`),
      map(path => this.afs.doc<Collection>(path)),
      switchMap(collection => collection.snapshotChanges().pipe(        
        map(a => {
          // console.l
            const data = a.payload.data() as Collection;
            console.log(a.payload.metadata.fromCache, data)
            return data;
        }),        
      )),
    )
  }   
}