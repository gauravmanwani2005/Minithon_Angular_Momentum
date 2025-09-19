import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private authSub!: Subscription;
  dbService: any;

  constructor(private authService: AuthService, private router: Router, dbService:DatabaseService) {}

  ngOnInit(): void {
    
    this.authSub = this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    if (this.authSub) this.authSub.unsubscribe();
  }

  check(){
    let value = this.dbService.isLoggedIn
    if(value) return true;
    else return false;
  }

}
