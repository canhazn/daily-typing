import { Note } from '@store/model/note.model';

export interface ThisWeekStateModel {
	initialized: boolean,
	entity?: Note[]
}

export interface ReviewStateModel {
	yesterday?: {
		initialized: boolean,
		entity: Note
	}

	thisWeek: {
		initialized?: boolean,
		entity?: Note[]
	}

	thisMonth?: {
		initialized: boolean,
		entity: Note[]
	}
}