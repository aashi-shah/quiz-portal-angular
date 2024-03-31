import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
declare function initPasswordToggle():any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private adminService: AdminService, private spinner: NgxSpinnerService, private router: Router,private toaster:ToastrService) { }
  user: any = {}
  ngOnInit(): void {
    initPasswordToggle()
    let id = sessionStorage.getItem("userid")
    if (id != null) {
      // sessionStorage.removeItem("userid")
      this.spinner.show().then(() => {
        this.adminService.getCurrentUser(id).subscribe((e) => {
          this.spinner.hide()
          this.user = e
          this.user.password=""
        }, () => {
          this.spinner.hide()
          Swal.fire("Error", "Something went wrong", "error")
          this.router.navigateByUrl("/")
        })
      })
    } else {
      Swal.fire("Error", "Something went wrong", "error")
      this.router.navigateByUrl("/")
    }

  }


  passwordRegex: any = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
  changePassword(){
    if (this.user.password.trim().length == 0 || this.user.password == "") {
      this.toaster.error("Please Enter Password")
      return;
    }
    if (!this.passwordRegex.test(this.user.password)) {
      this.toaster.error("Password contain 8 to 16 characters, at least one numeric digit, one uppercase and one lowercase letter")
      return;
    }else{
      this.spinner.show().then(()=>{
        this.adminService.changePassword(this.user.userid,this.user.password).subscribe(e=>{
          this.spinner.hide()
          Swal.fire("Success","Password Change Successfully","success")
          this.router.navigateByUrl("/")
        },()=>{
          this.spinner.hide()
          Swal.fire("Error","Something went wrong","error")
        })
      })
    }
  }
}
