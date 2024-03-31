import { AdminService } from 'src/app/services/admin.service';
import { UpdateService } from './../../services/update.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService, private toaster: ToastrService, private updateService: UpdateService,private adminService:AdminService) { }

  is_check:boolean = false
  users: any = {}
  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.loginService.getCurrentUser().subscribe((data) => {
        this.spinner.hide()
        this.users = data;
      }, error => {
        this.spinner.hide()
        Swal.fire("Error", "Somethings went wrong", "error")
      })
    })

  }

  passwordRegex: any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  phoneRegex: any = /^\d{10}$/;
  getPasswordChange(newPasswordTemp: any, passwordOld: any, showPassword: any) {
    let newPassword = newPasswordTemp.value

    if (newPassword.trim().length == 0 || newPassword == "") {
      this.toaster.error("Please Enter Password")
      return;
    }
    if (!this.passwordRegex.test(newPassword)) {
      this.toaster.error("Password contain 8 to 16 characters, at least one numeric digit, one uppercase and one lowercase letter")
      return;
    } else {
      const headers = {
        "Authorization": sessionStorage.getItem("token")
      }
      this.spinner.show().then(() => {


        this.loginService.loginUser({ "username": this.users.username, "password": newPassword }, headers).subscribe((e) => {
          this.spinner.hide()
          if (e.status == 200) {
            this.toaster.success("Password Matched")
            newPasswordTemp.disabled = true;
            newPasswordTemp.value = ""
            passwordOld.disabled = false;
            showPassword.disabled = true
            this.users.password = ""

          } else if (e.status == 406) {
            this.toaster.error("Password Not Matched")
          }
          else if (e.status == 404) {
            this.toaster.error("Password Not Matched")
          } else {
            this.toaster.error("Somethings went wrong")
          }
        }, (error) => {
          this.spinner.hide()
          this.toaster.error("Password Not Matched")
        })
      })
    }
  }

  updateAccount() {
    if (this.users.firstName.trim().length == 0 || this.users.firstName == "") {
      this.toaster.error("Please Enter FirstName")
      return;
    }
    if (this.users.lastName.trim().length == 0 || this.users.lastName == "") {
      this.toaster.error("Please Enter LastName")
      return;
    } if (this.users.password.trim().length == 0 || this.users.password == "") {
      this.toaster.error("Please Enter Password")
      return;
    }
    if (!this.passwordRegex.test(this.users.password) && !(this.users.password.includes("$") && this.users.password.trim().length > 20)) {
      this.toaster.error("Password contain 8 to 16 characters, at least one numeric digit, one uppercase and one lowercase letter")
      return;
    }
    if (this.users.phoneNum.trim().length == 0 || this.users.phoneNum == "") {
      this.toaster.error("Please Enter Phone number")
      return;
    }
    if (!this.phoneRegex.test(this.users.phoneNum)) {
      this.toaster.error("Please Enter Phonenumber with 10 Digits")
      return;
    } else {
      this.spinner.show().then(() => {
        let user = {
          "username": this.users.username,
          "password": this.users.password,
          "firstName": this.users.firstName,
          "lastName": this.users.lastName,
          "phoneNum": this.users.phoneNum
        }
        this.updateService.updateUserData(user).subscribe((e) => {
          this.spinner.hide()
          if (e.status == 200) {
            Swal.fire("Success", e.msg, "success")
          } else if (e.status == 404) {
            Swal.fire("Error", e.msg, "error")
          } else {
            Swal.fire("Error", "Somethings went wrong", "error")
          }
        }, error => {
          this.spinner.hide()
          Swal.fire("Error", "Somethings went wrong", "error")
        })
      })
    }


  }


  checkUserAdmin() {
    if (this.router.url.includes("/admin")) {
      return true;
    } else {
      return false;
    }
  }

  deleteUser(id:any){
    if(this.is_check == false){
      this.toaster.error("Please Check to Delete Account")
    }else if(this.users.username == "vraj@gmail.com"){
      this.toaster.warning("You are Super Admin")
    }
    else{
      this.spinner.show().then(()=>{
        this.adminService.deleteUser(id).subscribe()
        this.spinner.hide()
        Swal.fire("Succes","User Delete Successfully","success")
        setTimeout(() => {
          this.router.navigateByUrl("/")
        }, 2000);
      })
    }
  }

}
