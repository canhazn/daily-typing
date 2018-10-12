import { Timestamp } from '@firebase/firestore-types';

// export interface Collected {
// 	noteId: string,
// 	createdAt?: Timestamp,
// }
import { Observable } from 'rxjs';
import { Note } from '@store/model/note.model';

export interface CollectedStateModel {
	
	[collectionId: string] : {
		initialized?: boolean,
		entity?: Observable<Note>[] 
	}
}