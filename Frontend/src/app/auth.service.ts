import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!sessionStorage.getItem('loggedInUser'));
  isLoggedIn$ = this.loggedIn.asObservable();

  login(email: string): void {
    sessionStorage.setItem('loggedInUser', email);
    this.loggedIn.next(true);   
  }

  logout(): void {
    sessionStorage.removeItem('loggedInUser');
    this.loggedIn.next(false);  
  }
}
