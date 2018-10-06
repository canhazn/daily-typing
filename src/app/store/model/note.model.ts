import { firestore } from 'firebase';

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