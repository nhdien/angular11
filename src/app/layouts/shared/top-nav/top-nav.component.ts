import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services';
import { Account } from '@app/_models/account';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  account: Account;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.account.subscribe(x => this.account = x);
  }

  logout() {
    this.authService.logout();
  }
}
