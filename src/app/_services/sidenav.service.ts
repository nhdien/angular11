import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  hideSideNav: boolean = false;

  constructor() { }

  toggleSideNav(): void {
    console.log('toggle bar button!');
    this.hideSideNav = !this.hideSideNav;
  }
}
