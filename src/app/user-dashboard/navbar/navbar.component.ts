import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService,private adminService:AdminService) { }
  users:any={}
  authority:any="";
  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.loginService.getCurrentUser().subscribe((data) => {
        this.spinner.hide()
        this.users = data;
        this.authority = data.authorities["0"].authority=="Admin"?"Admin":"User"

      }, error => {
        this.spinner.hide()
        Swal.fire("Error", "Somethings went wrong", "error")
      })
    })

    this.loginService.getCurrentUser().subscribe()
  }
  getShowProfile(profileDetail: any) {
    if (profileDetail.value.includes("show")) {
      profileDetail.value = "dropdown-menu dropdown-menu-end"
    } else {
      profileDetail.value = "dropdown-menu dropdown-menu-end show"
    }
  }

  logOut() {
    this.loginService.doLogOut()
    this.router.navigateByUrl("/login")
  }


  checkUserAdmin(){
    if(this.router.url.includes("/admin")){
      return true;
    }else{
      return false;
    }
  }
  checkUserAdminhead(){
    if(this.router.url.includes("/admin") && this.users.username == "vraj@gmail.com"){
      return true;
    }else{
      return false;
    }
  }


}
