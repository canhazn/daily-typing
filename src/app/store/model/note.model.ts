import { firestore } from 'firebase/app';

export interface Note {
  noteId: string;
  createdAt?: firestore.Timestamp; 
  content?: string; 
  edittedAt?: firestore.Timestamp;
  arrayCollectionId?: string[];
  name?: string; 
  like?: number;  
};