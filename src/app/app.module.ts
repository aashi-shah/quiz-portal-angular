import { UserAllDashboardModule } from './user-all-dashboard/user-all-dashboard.module';

import { authInterceptorProvider } from './services/auth.interceptor';

import { UserDashboardModule } from './user-dashboard/user-dashboard.module';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthModule } from './user-auth/user-auth.module';
import { CssJsFilesComponent } from './css-js-files/css-js-files.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule, NgModel, ReactiveFormsModule} from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
@NgModule({
  declarations: [
    AppComponent,
    CssJsFilesComponent,
    PageNotFountComponent,
    DashboardComponent,
    AdmindashboardComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    UserDashboardModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    UserAllDashboardModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCaptchaModule





  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
