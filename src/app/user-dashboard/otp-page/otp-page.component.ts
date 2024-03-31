import { ForgotpasswordService } from './../../services/forgotpassword.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
// import "../../../assets/js/otpEnter.js"

import { Router } from '@angular/router';
declare function otpEnterJS(): any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private forgotPassword: ForgotpasswordService, private router: Router) { }
  otp: any = {
    first: "",
    second: "",
    third: "",
    fourth: "",
  }
  ngOnInit(): void {
    otpEnterJS()
  }

  checkOTP() {
    let number = sessionStorage.getItem("number")
    if (number != null) {
      sessionStorage.removeItem("number")
      this.spinner.show().then(() => {
        this.forgotPassword.checkOtp( number, this.otp.first + this.otp.second + this.otp.third + this.otp.fourth).subscribe((e) => {
          this.spinner.hide()
          if (e.status == 200) {
            Swal.fire("Success", e.msg, "success")
            
            sessionStorage.setItem("userid", e.data.userid)
            this.router.navigateByUrl("/changePassword")
          } else if (e.status == 400) {
            Swal.fire("Warning", e.msg, "warning")
            // sessionStorage.setItem("userid",e.data.userid)
            this.router.navigateByUrl("/")
          }
        }, () => {
          this.spinner.hide()
          Swal.fire("Error", "Something went wrong", "error")
          this.router.navigateByUrl("/")
        })
      })

    } else {
      this.spinner.hide()
      Swal.fire("Error", "Something went wrong", "error")
      this.router.navigateByUrl("/")
    }

  }

}
