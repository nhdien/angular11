import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SidenavService } from '@app/_services';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  constructor(public sideNavService: SidenavService) { }

  ngOnInit(): void {
  }

}
