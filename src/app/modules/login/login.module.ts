import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';

// import { MaterialModule } from '../material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatButtonModule
    // MaterialModule,
  ],
  exports: [LoginPageComponent],
  declarations: [LoginPageComponent]
})
export class LoginModule { }
