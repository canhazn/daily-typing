import { NgModule } from '@angular/core';
import { SharedModule }      from '@shared/shared.module';

import { EditorModule } from './editor/editor.module';
import { CollectionModule } from './collection/collection.module';
import { AddNoteBtnComponent } from './add-note-btn/add-note-btn.component';

import { EditCollectionBtnModule } from './edit-collection-btn/edit-collection-btn.module';
import { CreateCollectionBtnModule } from './create-collection-btn/create-collection-btn.module';

@NgModule({
	declarations: [ 				
		AddNoteBtnComponent, //home.comonent, collected.component
	],
	imports: [
		SharedModule,
		EditorModule,
		CollectionModule,
		CreateCollectionBtnModule,
		EditCollectionBtnModule,
	],
	exports: [
		EditorModule,
		CollectionModule,
		CreateCollectionBtnModule,
		EditCollectionBtnModule,
		AddNoteBtnComponent
	]
})
export class SharedComponent { }