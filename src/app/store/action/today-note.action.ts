import { Note } from '@store/model/note.model';


export class FetchTodayNote {
	static type = '[Today Note] Fetch Today Note' ;
}

export class AddedTodayNote {
	static type = '[Today Note] Added Today Note'
	constructor(public note: Note) {}
}

export class ModifiedTodayNote {
	static type = '[Today Note] Modified Today Note'
	constructor(public note: Note) {}
}

export class RemovedTodayNote {
	static type = '[Today Note] Removed Today Note';
	constructor(public noteId: string) {}
}