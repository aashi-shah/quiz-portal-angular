import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    RouterModule,
    NgxSpinnerModule
  ],
  exports:[
    ForgetPasswordComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class UserAuthModule { }
