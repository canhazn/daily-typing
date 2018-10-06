import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from './login/login.component';
// import { HomeComponent } from './home/home.component';
// import { CollectionPageComponent } from './collection-page/collection-page.component';
// import { ReviewComponent } from './review/review.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: '', loadChildren: './modules/home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'review', loadChildren: './modules/review/review.module#ReviewModule', pathMatch: 'prefix', canActivate: [AuthGuard] },
  { path: 'collected', loadChildren: './modules/collected/collected.module#CollectedModule', canActivate: [AuthGuard] },  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
