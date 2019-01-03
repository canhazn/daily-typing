import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { SharedComponent } from '@shared/component/shared.component';

import { YesterdayComponent } from './component/yesterday/yesterday.component';
import { ThisWeekComponent } from './component/this-week/this-week.component';
import { ThisMonthComponent } from './component/this-month/this-month.component';
import { ReviewPageComponent } from './review-page/review-page.component';

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
    RouterModule,
    SharedModule,
    RouterModule.forChild(routes),
    SharedComponent,
  ],
  declarations: [ ReviewPageComponent, YesterdayComponent, ThisWeekComponent, ThisMonthComponent],
})
export class ReviewModule { }
