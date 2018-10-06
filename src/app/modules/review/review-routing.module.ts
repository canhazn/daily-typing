import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewPageComponent } from './component/review-page.component';
import { YesterdayComponent } from './component/yesterday/yesterday.component';
import { ThisWeekComponent } from './component/this-week/this-week.component';
import { ThisMonthComponent } from './component/this-month/this-month.component';

const routes: Routes = [
  { 
  	path: '', 
  	component: ReviewPageComponent,
  	children: [
  		{ path: '', redirectTo: 'yesterday' },
  		{ path: 'yesterday', component: YesterdayComponent },
  		{ path: 'this-week', component: ThisWeekComponent },
  		{ path: 'this-month', component: ThisMonthComponent }
  	]
   },  
];

@NgModule({
  imports: [  
  	RouterModule.forChild(routes),
  ],
  exports: [
  	RouterModule
  ],
  
})
export class ReviewRoutingModule { }