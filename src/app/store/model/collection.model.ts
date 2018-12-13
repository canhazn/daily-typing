import { firestore } from 'firebase/app';

export class Collection {  
	collectionId:string;
	name?: string;
	createdAt?: firestore.Timestamp;
	edittedAt?: firestore.Timestamp;
	arrayNoteId?: string[];
}
