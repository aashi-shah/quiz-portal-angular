import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  constructor(private toaster:ToastrService,private spinner:NgxSpinnerService,private adminService:AdminService,private router:Router) { }
  quiz:any={}
  category: Array<any> = []
  ngOnInit(): void {
    let id = sessionStorage.getItem("quizid")
    if(id!=null){
      sessionStorage.removeItem("quizid")
      this.spinner.show().then(()=>{
        this.adminService.getQuiz(id).subscribe((e)=>{
          this.spinner.hide()
          if(e.status == 200){
            this.quiz = e.data
            this.spinner.show().then(() => {
              this.adminService.showCategory().subscribe((e) => {
                this.spinner.hide()
                if (e.status == 200) {
                  this.category = e.data
                } else {
                  Swal.fire("Error", "Somethings went wrong", "error")
                }
              }, () => {
                this.spinner.hide()
                Swal.fire("Error", "Somethings went wrong", "error")
              })
            })
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
      this.router.navigateByUrl("/admin/showCategories")
      Swal.fire("Error","Somethings went wrong","error")
    }



  }


  editQuiz(){
    if (this.quiz.numberOfQuestions == 0) {
      this.toaster.error("Number of Questions must not be zero")
      return;
    }
    if (this.quiz.maxMarks == 0) {
      this.toaster.error("Total Marks must not be zero")
      return;
    }
    if (this.quiz.description == "" || this.quiz.description.trim().length == 0) {
      this.toaster.error("Description must not be empty")
      return;
    }
    if (this.quiz.category.categoryid == "") {
      this.toaster.error("Category must not be empty")
      return;
    }
    else {
      this.spinner.show().then(()=>{
        this.adminService.editQuiz(this.quiz).subscribe((e)=>{
          this.spinner.hide()
            if(e.status == 200){
              this.toaster.success(e.msg)
              this.router.navigateByUrl("/admin/quizzes")
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
    }
  }
}
