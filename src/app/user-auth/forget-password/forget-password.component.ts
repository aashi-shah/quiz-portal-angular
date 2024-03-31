import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ForgotpasswordService } from './../../services/forgotpassword.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private toaster: ToastrService, private forgotpasswordService: ForgotpasswordService, private spinner: NgxSpinnerService,private router:Router) { }
  public user = {
    username: ""
  }
  ngOnInit(): void {
  }

  // emailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  phoneRegex: any = /^\d{10}$/;
  forgotPassword() {
    if (this.user.username.trim().length == 0 || this.user.username == "") {
      this.toaster.error("Please Enter Phone number")
      return;
    }
    if (!this.phoneRegex.test(this.user.username)) {
      this.toaster.error("Phone number must contain 10 digits")
      return;
    } else {
      //api call
      Swal.fire("Warning","You must verify number on Twilio!","warning")
      this.spinner.show().then(() => {


        this.forgotpasswordService.forgotPassword(this.user).subscribe((e) => {
          this.spinner.hide()
          if (e.status == 200) {
            Swal.fire("Success", e.msg, "success")
            sessionStorage.setItem("number",this.user.username)
            this.router.navigateByUrl("/otpEnter")
          } else if (e.status == 404) {
            Swal.fire("Error", e.msg, "error")
          } else {
            Swal.fire("Error", "Something went wrong", "error")
          }
        },()=>{
          this.spinner.hide()
          Swal.fire("Error", "Something went wrong", "error")
        })


      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Something went wrong", "error")
      })

    }
  }
}
