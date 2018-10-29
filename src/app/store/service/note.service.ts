import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { AuthService } from '@store/service/auth.service';

import { User }  from '@store/model/auth.model';
import { Note } from '@store/model/note.model';
import { Collection } from '@store/model/collection.model';


import { Observable, Subject, of, from } from 'rxjs';
import { take, map, tap, switchMap, catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
	
  constructor(private afs: AngularFirestore, private authService: AuthService ) {}

  private getUser(): Observable<User> {
    return this.authService.user.pipe(
      filter(user => !!user),
      take(1),
    )
  }

  // set a new Note and return ....
  setNewNote() {  
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
      tap(_ => console.log(note)),
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
  


  getYesterdayNote() {
    let today = new Date();       
    let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);    
    let endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());    
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", startTime).where("createdAt", "<=", endTime).limit(1))),
      switchMap(noteCollection => noteCollection.snapshotChanges().pipe(        
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Collection;
            console.log(a.payload.doc.metadata.fromCache, data)
            return data;
        })),                
      )),      
    )
  }

  getNoteById(noteId: string): Observable<Note> {
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note/${noteId}`),
      map(path => this.afs.doc<Note>(path)),
      switchMap(note => note.valueChanges()),
    )
  }

  getCollected(arrayNoteId: string[]) {
    return this.getUser().pipe(      
      map(user => `user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        arrayNoteId.forEach(noteId => {
          query = query.where("noteId",  "==", noteId);
          console.log(query);
        })
        return query;
      })),
      switchMap(collection => collection.valueChanges()),
    )
  }

  getTodayNote() {

    let today = new Date();       
    let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());    
    
    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", startTime).orderBy("createdAt",  "desc"))),
      switchMap(noteCollection => noteCollection.snapshotChanges().pipe(        
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Collection;
            // console.log(a.payload.doc.metadata.fromCache, data)
            return data;
        })),        
      )),
      tap(arrayNote => (arrayNote.length == 0 ? this.setNewNote().subscribe() : "nothing") )
    )
  }

  getThisWeek() {

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
      switchMap(collectionNote => collectionNote.snapshotChanges().pipe(        
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Collection;
            console.log(a.payload.doc.metadata.fromCache, data)
            return data;
        })),        
      )),
    )
  } 

  getThisMonth() {

    let today =  new Date();
    
    let startTime = new Date(today.getFullYear(), today.getMonth(), 1)
    let endTime = new Date(today.getFullYear(), today.getMonth() + 1, 1)

    return this.getUser().pipe(      
      map(user => `user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => {
        let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        return query.where("createdAt", ">=", startTime).where("createdAt", "<=", endTime).orderBy("createdAt");
      })),
      switchMap(collectionNote => collectionNote.snapshotChanges().pipe(        
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Collection;
            console.log(a.payload.doc.metadata.fromCache, data)
            return data;
        })),        
      )),
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

  getRandomLikedNote() {
    let like = Math.floor(Math.random() * 50) + 1;

    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => ref.where("like", ">=", like).limit(1))),
      switchMap(noteCollection => noteCollection.valueChanges().pipe(map(([note]) => note))),
    )
  }
}
