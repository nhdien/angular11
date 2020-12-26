import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {

  constructor(private authService: AuthService) { }

  account = this.authService.accountValue;
}
