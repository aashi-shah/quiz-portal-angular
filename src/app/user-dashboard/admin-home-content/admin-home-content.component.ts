import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import '../../../assets/js/helpers.js'

@Component({
  selector: 'app-admin-home-content',
  templateUrl: './admin-home-content.component.html',
  styleUrls: ['./admin-home-content.component.css']
})
export class AdminHomeContentComponent implements OnInit {

  constructor(private adminService: AdminService, private loginService: LoginService, private spinner: NgxSpinnerService, private router: Router) { }
  allUser: Array<any> = []
  allAttempt: any = {}
  allQuestions: any = {}
  allCategories: any = {}
  allQuizzes: Array<any> = []
  user: any = {}
  ngOnInit(): void {

    this.spinner.show().then(() => {
      this.loginService.getAllUser().subscribe((e) => {
        this.allUser = e

        this.adminService.getAllAttempt().subscribe((e) => {

          this.allAttempt = e
          this.adminService.showQuizzes().subscribe((e) => {
            this.spinner.hide()
            if (e.status == 200) {
              this.allQuizzes = e.data
              this.adminService.showCategory().subscribe(e => {
                if (e.status == 200) {
                  this.allCategories = e.data
                  this.adminService.showQuestions().subscribe(e => {
                    if (e.status == 200) {
                      this.allQuestions = e.data

                      this.loginService.getCurrentUser().subscribe((data) => {

                        this.user = data;

                      }, error => {
                        this.spinner.hide()
                        Swal.fire("Error", "Something went wrong", "error")
                        this.router.navigateByUrl("/")
                      })


                    }
                  })
                }
              })

            } else {
              Swal.fire("Error", "Somethings went wrong", "error")
            }
          }, () => {
            this.spinner.hide()
            Swal.fire("Error", "Somethings went wrong", "error")
          })

        }, () => {
          this.spinner.hide()
          Swal.fire("Error", "Something went wrong", "error")
        })
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Something went wrong", "error")
      })
    })
  }

  showDetails(id: any) {
    sessionStorage.setItem("userid", id)
    this.router.navigateByUrl("/admin/showAllUser")
  }

  changeToUser(id: any) {
    if (this.user.username == 'vraj@gmail.com' && id!=this.user.userid) {
      this.spinner.show().then(() => {
        this.adminService.changeAdminUser(id).subscribe();
          this.spinner.hide()
          Swal.fire("Success", "Update Admin to User", "success")
          this.ngOnInit()

      })
    }
  }

  banUser(id:any){
    if (this.user.username == 'vraj@gmail.com' && id!=this.user.userid) {
      this.spinner.show().then(() => {
        this.adminService.banUser(id).subscribe();
          this.spinner.hide()
          Swal.fire("Success", "Ban User Successfully", "success")
          this.ngOnInit()

      })
    }
  }
}
