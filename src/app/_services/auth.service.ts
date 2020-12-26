import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '@app/_models/account';
import { environment } from '@environments/environment';


const baseUrl = `${environment.apiURL}/account`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(
    private http: HttpClient,
    private router: Router
    ) { 
      this.accountSubject = new BehaviorSubject<Account>(null);
      this.account = this.accountSubject.asObservable();
  }

  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(
      `${baseUrl}/authenticate`,
      { email, password },
      { withCredentials: true}
    )
    .pipe(map(account => {
      this.accountSubject.next(account);
      this.startRefreshTokenTimer();

      return account;
    }));
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(
      `${baseUrl}/refresh-token`,
      {},
      { withCredentials: true }
    )
    .pipe(map((account) => {
      this.accountSubject.next(account);
      this.startRefreshTokenTimer();

      return account
    }));
  }

  logout(): void {
    this.http.post<any>(
      `${baseUrl}/revoke-token`,
      {},
      {withCredentials: true}
    ).subscribe();
    
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(['/front/login']);
  }

  private refreshTokenTimeout;
  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.accountValue.JwtToken.split('.')[1]));

    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
