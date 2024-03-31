import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor
  constructor(private toaster:ToastrService,private spinner:NgxSpinnerService,private adminService:AdminService,private router:Router) { }
  question:any={}
  ngOnInit(): void {
    let id = sessionStorage.getItem("questionid")
    if(id!=null){
      sessionStorage.removeItem("questionid")
      this.spinner.show().then(()=>{
        this.adminService.getQuestion(id).subscribe((e)=>{
          this.spinner.hide()
          if(e.status == 200){
            this.question = e.data
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
      this.router.navigateByUrl("/admin/showQuestions")
      Swal.fire("Error","Somethings went wrong","error")
    }
  }

  checkDuplicateOption(option:any){
    let count=0;
    for(let obj in this.question){
      if(this.question[obj] == option){
        ++count
      }
      if(this.question["answer"] == option){
        --count;
      }
    }
    if(count>1){
      return true;
    }else{
      return false;
    }
  }
  //edit question
  editQuestion(){
    if(this.question.content == "" || this.question.content.trim().length == 0){
      this.toaster.error("Question must not be empty")
      return;
    }

    if(this.question.option1 == "" || this.question.option1.trim().length == 0){
      this.toaster.error("Option1 must not be empty")
      return;
    }
    if(this.question.option2 == "" || this.question.option2.trim().length == 0 ){
      this.toaster.error("Option2 must not be empty")
      return;
    }
    if(this.question.option3 == "" || this.question.option3.trim().length == 0){
      this.toaster.error("Option3 must not be empty")
      return;
    }
    if(this.question.option4 == "" || this.question.option4.trim().length == 0){
      this.toaster.error("Option4 must not be empty")
      return;
    }
    if(this.checkDuplicateOption(this.question.option2) || this.checkDuplicateOption(this.question.option3) || this.checkDuplicateOption(this.question.option4) ){
      this.toaster.error("All Options must be Unique")
      return;
    }
    if(this.question.answer == "" || this.question.answer.trim().length == 0){
      this.toaster.error("Answer must not be empty")
      return;
    }else{
      this.spinner.show().then(() => {
        this.adminService.editQuestion(this.question).subscribe((data) => {
          this.spinner.hide()
          if (data.status == 200) {
            Swal.fire("Success", data.msg, "success")
            this.router.navigateByUrl("/admin/showQuestions")
          } else if (data.status == 400) {
            Swal.fire("Error", data.msg, "error")
          }
        }, () => {
          this.spinner.hide()
          Swal.fire("Error", "Somethings went wrong", "error")
        })
      })
    }
  }
}
