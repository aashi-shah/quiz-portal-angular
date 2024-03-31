import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-all-user-details',
  templateUrl: './show-all-user-details.component.html',
  styleUrls: ['./show-all-user-details.component.css']
})
export class ShowAllUserDetailsComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService, private spinner: NgxSpinnerService) { }
  users:Array<any>=[]
  ngOnInit(): void {
    let id = sessionStorage.getItem("quizid")
    if (id != null) {

      this.spinner.show().then(() => {
        this.adminService.getAllUserDetails(id).subscribe((e) => {
          this.spinner.hide()
          if (e.status == 200) {
            this.users = e.data
            
          } else {
            Swal.fire("Error", "Something went wrong", "error")
            this.router.navigateByUrl("/user")
          }
        }, error => {
          this.spinner.hide()
          Swal.fire("Error", "Something went wrong", "error")
          this.router.navigateByUrl("/user")
        })
      })
    } else {
      Swal.fire("Error", "Something went wrong", "error")
      this.router.navigateByUrl("/user")
    }
  }

}
