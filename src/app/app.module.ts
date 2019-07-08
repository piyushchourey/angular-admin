import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { CookieService } from 'ngx-cookie-service';

import { DataTablesModule } from 'angular-datatables';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { AuthGuard } from './guards/auth-guard.service';
import { CommonService } from './service/common.service';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added
    DataTablesModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {provide: APP_BASE_HREF, useValue: '/'},
    CommonService,AuthGuard,CookieService 
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { } 
