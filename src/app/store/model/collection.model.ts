import { firestore } from 'firebase/app';

export interface Collection {  
	collectionId:string,
	name?: string,
	createdAt?: firestore.Timestamp,
	edittedAt?: firestore.Timestamp,  
	arrayNoteId?: string[],
	numberOfNote?: number,  
}

export interface CollectionStateModel {
	initialized: boolean,
	entity?: Collection[],
}