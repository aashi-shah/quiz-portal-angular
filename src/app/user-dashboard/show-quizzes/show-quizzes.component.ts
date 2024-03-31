import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-quizzes',
  templateUrl: './show-quizzes.component.html',
  styleUrls: ['./show-quizzes.component.css']
})
export class ShowQuizzesComponent implements OnInit {

  constructor(private adminService: AdminService, private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) { }
  quizzes: Array<any> = []
  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.adminService.showQuizzes().subscribe((e) => {
        this.spinner.hide()
        if (e.status == 200) {
          this.quizzes = e.data
        } else {
          Swal.fire("Error", "Somethings went wrong", "error")
        }
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Somethings went wrong", "error")
      })
    })
  }

  deleteQuiz(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure to Delete?!..',
      confirmButtonText: "Delete",
      confirmButtonColor: "#03c3ec",
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show().then(() => {
          this.adminService.deleteQuiz(id).subscribe((e) => {
            this.spinner.hide()
            this.toaster.success("Quiz Delete Successfully")
            this.quizzes = this.quizzes.filter(quiz => quiz.quizid != id);
          }, () => {
            this.spinner.hide()
            Swal.fire("Error", "Somethings went wrong", "error")
          })
        })
      }
    })
  }

  updateQuiz(id: any) {
    sessionStorage.setItem("quizid", id)
    this.router.navigateByUrl("/admin/editQuiz")
  }

  quiz: any = {}
  isActiveCategory(id: any) {
    length=0;
    this.spinner.show().then(() => {
      this.adminService.getQuestionsOfQuiz(id).subscribe((e) => {
        this.spinner.hide()
        if (e.status == 200) {
          length=e.data.length
          
          this.spinner.show().then(() => {
            this.adminService.getQuiz(id).subscribe((e) => {
              this.spinner.hide()
              if (e.status == 200) {
                this.quiz = e.data
                if (this.quiz.active == false) {
                  this.quiz.active = true;
                } else {
                  this.quiz.active = false;
                }

                //edit request

                if(length >= this.quiz.numberOfQuestions){
                  this.spinner.show().then(() => {
                    this.adminService.editQuiz(this.quiz).subscribe((e) => {
                      this.spinner.hide()
                      if (e.status == 200) {
                        this.toaster.success(e.msg)
                        this.ngOnInit()
                      } else if (e.status == 404) {

                        Swal.fire("Error", e.msg, "error")
                      } else {

                        Swal.fire("Error", "Somethings went wrong", "error")
                      }
                    }, () => {
                      this.spinner.hide()
                      Swal.fire("Error", "Somethings went wrong", "error")

                    })
                  })
                }else{
                  Swal.fire("Error", "Please Add All Question or Update Quiz", "error")
                }

                } else if (e.status == 404) {
                  Swal.fire("Error", e.msg, "error")
                } else {
                  Swal.fire("Error", "Somethings went wrong", "error")
                }
              }, () => {
                this.spinner.hide()
                Swal.fire("Error", "Somethings went wrong", "error")
              })

          })
        } else {
          Swal.fire("Error", "Somethings went wrong", "error")
        }
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Somethings went wrong", "error")
      })


    })




  }


  showQuestions(id: any) {
    sessionStorage.setItem("quizid", id)
    this.router.navigateByUrl("/admin/showQuestions")
  }

}
