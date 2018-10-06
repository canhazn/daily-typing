import { Collection } from '../model/collection.model';

export class FetchCollection {
	static type = '[Collection] Fetch Collection'
}

export class AddedCollection {
	static type = '[Collection] Added Collection'
	constructor(public collection: Collection) {}
}

export class ModifiedCollection {
	static type = '[Collection] Modified Collection'
	constructor(public collection: Collection) {}
}

export class RemovedCollection {
	static type = '[Collection] Removed Collection';
	constructor(public collectionId: string) {}
}

export class UpdateCollection {
	static type = '[Collection] Update Collection';
	constructor(public collection: Collection) {}
}