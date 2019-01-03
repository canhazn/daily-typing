import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material';
import { TimeAgoPipe } from '../shared/pipe/time-ago.pipe';

@NgModule({
	declarations: [ 		
		TimeAgoPipe, // editer.componet.html, collected.componet.html		
	],
	imports: [
		CommonModule, 		
		FormsModule,
		MaterialModule,		
	],
	exports: [
		CommonModule, 		
		FormsModule,
		MaterialModule,		
		TimeAgoPipe,		
	]
})
export class SharedModule { }