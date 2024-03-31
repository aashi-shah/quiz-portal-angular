import { AdminService } from './../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-user-quizzes',
  templateUrl: './show-user-quizzes.component.html',
  styleUrls: ['./show-user-quizzes.component.css']
})
export class ShowUserQuizzesComponent implements OnInit {

  constructor(private adminService: AdminService, private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router, private activeRoute: ActivatedRoute) { }
  quizzes: Array<any> = []
  ngOnInit(): void {

    this.activeRoute.params.subscribe(() => {


      if (this.router.url.includes("/showQuizzes/")) {
        let ind = this.router.url.indexOf("/", 10)
        let header = this.router.url.substring(ind + 1)
        this.spinner.show().then((e) => {
          this.adminService.getQuizzesOfCategory(header).subscribe((e) => {
            this.spinner.hide()
            if (e.status == 200) {
              this.quizzes = e.data
              this.quizzes = this.quizzes.filter((data) => data.active != false)

            } else {
              Swal.fire("Error", "Somethings went wrong", "error")
            }
          }, () => {
            this.spinner.hide()
            Swal.fire("Error", "Somethings went wrong", "error")
          })
        })
      } else {
        this.spinner.show().then(() => {
          this.adminService.showQuizzes().subscribe((e) => {
            this.spinner.hide()
            if (e.status == 200) {
              this.quizzes = e.data
              this.quizzes = this.quizzes.filter((data) => data.active != false)
              
            } else {
              Swal.fire("Error", "Somethings went wrong", "error")
            }
          }, () => {
            this.spinner.hide()
            Swal.fire("Error", "Somethings went wrong", "error")
          })
        })
      }
    })
  }

  showInformation(id:any){
    sessionStorage.setItem("quizid",id)
    this.router.navigateByUrl("/user/showInformation")
  }


}
