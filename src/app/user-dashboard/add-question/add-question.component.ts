import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor
  constructor(private toaster:ToastrService,private spinner:NgxSpinnerService,private adminService:AdminService,private router:Router) { }
  question:any={
    content:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
    answer:"",
    quiz:{
      quizid:sessionStorage.getItem("quizid")
    }

  }
  ngOnInit(): void {
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


  addQuestion(){
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
        this.adminService.addQuestion(this.question).subscribe((data) => {
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
