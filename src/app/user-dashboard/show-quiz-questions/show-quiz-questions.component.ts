import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-show-quiz-questions',
  templateUrl: './show-quiz-questions.component.html',
  styleUrls: ['./show-quiz-questions.component.css']
})
export class ShowQuizQuestionsComponent implements OnInit {

  constructor(private router:Router,private spinner:NgxSpinnerService,private adminService:AdminService,private toaster:ToastrService) { }

  questions: Array<any> = []
  quiz:any={}

  ngOnInit(): void {
    let id = sessionStorage.getItem("quizid")
    if(id!=null){
      // sessionStorage.removeItem("quizid")
      this.spinner.show().then(()=>{
        this.adminService.getQuestionsOfQuiz(id).subscribe((e)=>{
          this.spinner.hide()
          if(e.status == 200){
            this.questions = e.data
            // console.log(this.questions)
            this.spinner.show().then(()=>{

              this.adminService.getQuiz(id).subscribe(e=>{
                this.spinner.hide()
                if(e.status == 200){
                  this.quiz = e.data

                }else if(e.status == 404){
                  Swal.fire("Error",e.msg,"error")
                }else{
                  Swal.fire("Error","Somethings went wrong","error")
                }
              },()=>{
                this.spinner.hide()
                Swal.fire("Error","Somethings went wrong","error")
              })

            })
          }else{
            Swal.fire("Error","Somethings went wrong","error")
          }
        },()=>{
          this.spinner.hide()
          Swal.fire("Error","Somethings went wrong","error")
        })
      })
    }else{
      this.router.navigateByUrl("/admin/quizzes")
      Swal.fire("Error","Somethings went wrong","error")
    }
  }

  //update Question
  updateQuestion(id:any){
    sessionStorage.setItem("questionid",id)
    this.router.navigateByUrl("/admin/editQuestion")
  }

  //delete Question
  deleteQuestion(id:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure to Delete?!..',
      confirmButtonText:"Delete",
      confirmButtonColor:"#03c3ec",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.spinner.show().then(()=>{
          this.adminService.deleteQuestion(id).subscribe((e)=>{
            this.spinner.hide()
            this.toaster.success("Question Delete Successfully")
            this.questions = this.questions.filter(que=>que.questionid!=id);
          },()=>{
            this.spinner.hide()
            Swal.fire("Error","Somethings went wrong","error")
          })
        })
      }
    })
  }


}
