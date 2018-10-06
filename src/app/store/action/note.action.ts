import { Note } from '../model/note.model';

export class GetTodayNote {
  static type = '[Note] Get Today Note';
}	

export class GetYesterdayNote {
  static type = '[Note] Get Yesterday Note';
}	

export class CreateNote {
	static type = '[Note] Create';
}

export class UpdateNote {
	static type = '[Note] Update';
	constructor(public note: Note) {}
}

export class DeleteNote {
	static type = '[Note] Delete'
}