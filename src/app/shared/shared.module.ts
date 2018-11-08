import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TimeAgoPipe } from './pipe/time-ago.pipe';

@NgModule({
	declarations: [ 
		TopNavComponent, 
		TimeAgoPipe 
	],

	imports: [
		CommonModule, 
		RouterModule,
		MaterialModule, 
		FormsModule,  
		MaterialModule, 
	],
	exports: [TopNavComponent, TimeAgoPipe, MaterialModule ]
})
export class SharedModule { }