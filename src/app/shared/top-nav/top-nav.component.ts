import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@store/service/theme.service';
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
  
  constructor( private themeService: ThemeService, private authService: AuthService) {}

  changeTheme(): void {    
    this.themeService.switchTheme();
    // this.changedTheme.emit();    
  }


  logout() {   
    this.authService.logout()
  }

  ngOnInit() {        
    this.user = this.authService.user;
  }
}
