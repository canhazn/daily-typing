import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';

import { MaterialModule } from '@shared/material';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
  ],
  exports: [LoginPageComponent],
  declarations: [LoginPageComponent]
})
export class LoginModule { }
