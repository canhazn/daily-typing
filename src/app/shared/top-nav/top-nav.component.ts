import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Store, Select }        from '@ngxs/store';

import { ChangedTheme } from '@store/state/theme.state';

import { AuthService } from '@store/service/auth.service';

import { Observable }   from 'rxjs';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

   user : Observable<any>;
  
  constructor(private store: Store, private authService: AuthService) {}

  changeTheme(): void {
  	this.store.dispatch( new ChangedTheme())  	
  }


  logout() {   
    this.authService.logout()
  }

  ngOnInit() {        
    this.user = this.authService.user;
  }
}
