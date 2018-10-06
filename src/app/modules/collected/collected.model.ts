import { Timestamp } from '@firebase/firestore-types';

export interface Collected {
	noteId?: string,
	createdAt?: Timestamp,
}
