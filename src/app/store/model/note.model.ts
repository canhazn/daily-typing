import { firestore } from 'firebase/app';
// import { Timestamp } from '@firebase/firestore/dist/src/api/timestamp'
// import {  } from '@firebase/firestore'
// import { AngularFirestore } from '@angular/fire/firestore';
// @firebase/firestore-types
// export interface Timestamp;


export interface Note {
  noteId: string;
  createdAt?: firestore.Timestamp; 
  content?: string; 
  edittedAt?: firestore.Timestamp;
  arrayCollectionId?: string[];
  name?: string; 
  like?: number;  
};