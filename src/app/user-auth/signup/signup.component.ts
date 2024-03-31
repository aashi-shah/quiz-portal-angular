
import { SignupService } from './../../services/signup.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import '../../../assets/js/helpers.js'
declare function initPasswordToggle(): any;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private toaster: ToastrService, private signupService: SignupService, private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    initPasswordToggle()
  }

  is_checked: boolean = false;
  public user = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNum: "",
  }


  //for show and hide password
  // getShowPassword(passClasses: any, passInput: any) {
  //   if (passClasses.value.includes("bx-show")) {
  //     passClasses.value = "bx bx-hide"
  //     passInput.type = "password"
  //   } else {
  //     passClasses.value = "bx bx-show"
  //     passInput.type = "text"
  //   }
  // }


  //for signup
  emailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  passwordRegex: any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  phoneRegex: any = /^\d{10}$/;
  signup() {
    if (this.is_checked == false) {
      this.toaster.warning("Please Read Terms and Condition Onces")
    } else {

      if (this.user.firstName.trim().length == 0 || this.user.firstName == "") {
        this.toaster.error("Please Enter FirstName")
        return;
      }
      if (this.user.lastName.trim().length == 0 || this.user.lastName == "") {
        this.toaster.error("Please Enter LastName")
        return;
      } if (this.user.username.trim().length == 0 || this.user.username == "") {
        this.toaster.error("Please Enter Email")
        return;
      }
      if (!this.emailRegex.test(this.user.username)) {
        this.toaster.error("Please Enter Email as XXX@XX.XXX")
        return;
      }
      if (this.user.password.trim().length == 0 || this.user.password == "") {
        this.toaster.error("Please Enter Password")
        return;
      }
      if (!this.passwordRegex.test(this.user.password)) {
        this.toaster.error("Password contain 8 to 16 characters, at least one numeric digit, one uppercase and one lowercase letter")
        return;
      }
      if (this.user.phoneNum.trim().length == 0 || this.user.phoneNum == "") {
        this.toaster.error("Please Enter Phone number")
        return;
      }
      if (!this.phoneRegex.test(this.user.phoneNum)) {
        this.toaster.error("Please Enter Phonenumber with 10 Digits")
        return;
      } else {
        this.spinner.show().then(() => {
          this.signupService.signUpUser(this.user).subscribe((e) => {
            this.spinner.hide()
            if (e.status == 200) {
              Swal.fire("Success", e.msg, "success")
              this.router.navigateByUrl("/login")
            } else if (e.status == 400) {
              Swal.fire("Error", e.msg, "error")
            } else {
              Swal.fire("Error", "Something went wrong", "error")
            }
          }, error => {
            this.spinner.hide()
            if (error.status == 400) {
              // this.toaster.error("Duplicate User")
              Swal.fire("Error", "Duplicate User Found", "error")

            } else {
              // this.toaster.error("Something went wrong")
              Swal.fire("Error", "Something went wrong", "error")
            }
          })
        })

      }

    }
  }
}
