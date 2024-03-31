
import { LoginService } from './../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import '../../../assets/js/helpers.js'
declare function initPasswordToggle(): any;
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toaster: ToastrService, private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService) { }

  is_checked: boolean = false;
  public user = {
    username: "",
    password: ""
  }


  ngOnInit(): void {
    initPasswordToggle()

  }

  //for show and hide password
  getShowPassword(passClasses: any, passInput: any) {
    if (passClasses.value.includes("bx-show")) {
      passClasses.value = "bx bx-hide"
      passInput.type = "password"
    } else {
      passClasses.value = "bx bx-show"
      passInput.type = "text"
    }
  }

  //form submittion
  emailRegex: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  login() {

    if (this.is_checked == false) {
      this.toaster.warning("Please Check Remember me");
    } else {
      if (this.user.username.trim().length == 0 || this.user.username == "") {
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
      } else {

        this.spinner.show().then(() => {

          this.loginService.generateToken(this.user).subscribe((token) => {

            if (token != null) {
              const headers = {
                "Authorization": token.token
              }
              this.loginService.loginUser(this.user, headers).subscribe((e) => {
                this.spinner.hide()
                if (e.status == 200) {

                  if(e.data.enabled == false){
                    Swal.fire("Error","You are ban By Admin. Contact Admin!!","error")
                    return;
                  }
                  Swal.fire("Success", e.msg, "success")
                  this.loginService.storeToken(token.token);
                  // this.loginService.getCurrentUser().subscribe((e)=>{
                  if (e.data.authorities[0].authority === "Admin") {
                    this.router.navigateByUrl("/admin")
                  } else if (e.data.authorities[0].authority === "Normal") {
                    this.router.navigateByUrl("/user");
                  }
                  // })
                } else if (e.status == 406) {
                  Swal.fire("Error", e.msg, "error")
                }
                else if (e.status == 404) {
                  Swal.fire("Error", e.msg, "error")
                } else {
                  Swal.fire("Error", "Something went wrong", "error")
                }
              })
            }
            else {
              this.spinner.hide()
              Swal.fire("Error", "Something went wrong", "error")
            }
          }, (error) => {
            this.spinner.hide()
            Swal.fire("Error", "Invalid Credentials  ", "error")
          })
        });
      }
    }
  }


}
