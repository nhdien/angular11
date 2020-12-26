import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';

import { GuestComponent } from './layouts/guest/guest.component';
import { AuthorisedComponent } from './layouts/authorised/authorised.component';
import { TopNavComponent } from './layouts/shared/top-nav/top-nav.component';
import { SideNavComponent } from './layouts/shared/side-nav/side-nav.component';
import { SideNavTogglerComponent } from './layouts/shared/side-nav-toggler/side-nav-toggler.component';

import { appInitializer, AuthInterceptor, ErrorInterceptor } from './_helpers';
import { AuthService } from './_services';
import { ConfirmModule } from './_modules/confirm/confirm.module';


@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    SideNavTogglerComponent,

    GuestComponent,
    AuthorisedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    ModalModule.forRoot(),  
    ConfirmModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
