import { Component, OnInit } from '@angular/core';
import { Store }        from '@ngxs/store';
import { ChangedTheme } from '@store/state/theme.state';
import { AuthService } from '@store/service/auth.service';
import { Observable }   from 'rxjs';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  // @Output() changedTheme = new EventEmitter<string>();
  user : Observable<any>;
  
  constructor(private store: Store, private authService: AuthService) {}

  changeTheme(): void {
  	this.store.dispatch( new ChangedTheme());
    // this.changedTheme.emit();    
  }


  logout() {   
    this.authService.logout()
  }

  ngOnInit() {        
    this.user = this.authService.user;
  }
}
