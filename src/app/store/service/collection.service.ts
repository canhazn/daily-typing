import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

import { AuthService } from '@store/service/auth.service';

import { User }  from '@store/model/auth.model';
import { Collection } from '@store/model/collection.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from, forkJoin } from 'rxjs';
import { take, map, tap, switchMap, shareReplay, catchError, filter, share, publish } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  collections: Observable<Collection[]>;  

  constructor( private afs: AngularFirestore, private authService: AuthService ) {
    this.collections = this.fetchCollection().pipe(shareReplay(1));    
  }

  private getUser(): Observable<User> {
    return this.authService.user.pipe(take(1))
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
      map(_ => collection),
    )  
  }

  deleteCollection(collection: Collection): Observable<any> {
    return this.getUser().pipe(      
      map(user => `user/${user.uid}/collection/${collection.collectionId}`),
      map(path => this.afs.doc<any>(path)),
      switchMap(collection => from(collection.delete()))
    )
  }

  private reduceData(actions: DocumentChangeAction<{}>[]) {
    return actions.map(a => {
        const data = a.payload.doc.data() as Collection;
        console.log(a.payload.doc.metadata.fromCache, 'collectionId: ' + a.payload.doc.id)
        return data;
    })
  }

  private fetchCollection(): Observable<any> {
    return this.authService.user.pipe( switchMap(user => {
      if (user) {
        let path = `user/${user.uid}/collection`;
        let collection = this.afs.collection(path, ref => ref.orderBy("createdAt", "desc"))
        return collection.snapshotChanges().pipe(map(actions => this.reduceData(actions)))
      } else {
        return of(null);  
      }      
    }))
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

  collectNote(note: Note, collection: Collection) {
    collection.arrayNoteId.push(note.noteId);
    return this.getUser().pipe(            
      map(user => this.afs.doc<any>(`user/${user.uid}/note/${note.noteId}`)),  
      switchMap(path => forkJoin (        
        path.update({ "arrayCollectionId": firestore.FieldValue.arrayUnion(collection.collectionId) } ),        
        this.updateCollection({ 
          collectionId: collection.collectionId, 
          arrayNoteId: collection.arrayNoteId
        })
      )),
    )   
  }

  removeNote(note: Note, collection: Collection) {    
    return this.getUser().pipe(      
      map(user => this.afs.doc<any>(`user/${user.uid}/note/${note.noteId}`)),  
      switchMap(path => forkJoin (        
        path.update({ "arrayCollectionId": firestore.FieldValue.arrayRemove(collection.collectionId) } ),
        this.updateCollection({ 
          collectionId: collection.collectionId, 
          arrayNoteId: collection.arrayNoteId.filter(noteId => noteId != note.noteId)
        })
      )),
    )   
  }

  // if delete Note when use on collected page
  deleteNote(note: Note, collectionId: string) {
    return this.getUser().pipe(      
      map(user => this.afs.doc<any>(`user/${user.uid}/collection/${collectionId}`)),  
      switchMap( path => from(path.update({ "arrayNoteId": firestore.FieldValue.arrayRemove(note.noteId) } )))
    )   
  }

  // ??? used for collected page
  getCollectionById(collectionId: string) : Observable<Collection> {
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/collection/${collectionId}`),
      map(path => this.afs.doc<Collection>(path)),
      switchMap(collection => collection.snapshotChanges().pipe(        
        map(a => {          
            const data = a.payload.data() as Collection;
            console.log(a.payload.metadata.fromCache ,"collectionId: " + a.payload.id)
            return data;
        }),        
      )),
    )
  }   
}