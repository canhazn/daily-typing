import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects'

@NgModule({
  imports: [    
    StoreModule.forFeature('user', authReducer),
    EffectsModule.forFeature([AuthEffects]),   
  ],
  exports: [
    
  ],
  declarations: []
})
export class CoreModule { }
