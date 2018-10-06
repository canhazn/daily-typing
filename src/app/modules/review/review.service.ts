import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { Store }        from '@ngrx/store';
import { User }  from '../../core/auth/user.model';
import { Note } from '@store/model/note.model';

import { Observable, Subject, of, from } from 'rxjs';
import { finalize, take, map, first, switchMap, tap, catchError } from 'rxjs/operators';

@Injectable()
export class ReviewService {
	
  constructor(private store: Store<{user: User}>, private afs: AngularFirestore) {}
  
  private getUser(): Observable<User> {
  	return this.store.select('user').pipe(take(1));
  }


  // return an observable of today type: Note.
  getYesterdayNote() {

  	let now = new Date();           
    let yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);

  	return this.getUser().pipe(  		
  		map(user => `/user/${user.uid}/note`),
  		map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", yesterday).limit(1))),
  		switchMap(noteCollection => noteCollection.valueChanges().pipe(map(([note]) => note)))
  	)
  }

  // set a new Note and return ....
  getThisWeek() {
    let now = new Date();       
    let day = now.getDay();
    let monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (day == 0?-6:1)-day );
    let sunday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (day == 0?0:7)-day + 1);

    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", monday).where("createdAt", "<=", sunday).orderBy("createdAt", "asc"))),
      switchMap(noteCollection => noteCollection.valueChanges())
    )     
   }

  getThisMonth() {
    let now = new Date();       
    let day = now.getDay();
    let firstDay =  new Date(now.getFullYear(), now.getMonth(), 1);;
    let lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 1);


    return this.getUser().pipe(      
      map(user => `/user/${user.uid}/note`),
      map(path => this.afs.collection(path, ref => ref.where("createdAt", ">=", firstDay).where("createdAt", "<=", lastDay).orderBy("createdAt", "asc"))),
      switchMap(noteCollection => noteCollection.valueChanges())
    )     
   }

  
}
