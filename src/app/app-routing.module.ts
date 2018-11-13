import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LoginComponent } from '@module/login/login-page/login.component';
// import { HomeComponent } from './home/home.component';
// import { CollectionPageComponent } from './collection-page/collection-page.component';
// import { ReviewComponent } from './review/review.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { 
  	path: 'login',   	
  	loadChildren: '../app/module/login/login.module#LoginModule' 
  },
  { 
  	path: '', 
  	loadChildren: './module/home/home.module#HomeModule', 
  	canActivate: [AuthGuard] 
  },
  { 
  	path: 'review', 
  	loadChildren: './module/review/review.module#ReviewModule', 
  	pathMatch: 'prefix', 
  	canActivate: [AuthGuard] 
  },
  {
   	path: 'collected', 
   	loadChildren: './module/collected/collected.module#CollectedModule', 
   	canActivate: [AuthGuard] 
  },  
  { path: '**',
    redirectTo: '',    
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
