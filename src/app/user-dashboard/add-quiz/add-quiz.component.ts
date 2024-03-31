import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private adminService: AdminService, private spinner: NgxSpinnerService, private toaster: ToastrService, private router: Router) { }
  category: Array<any> = []

  quiz: any = {
    "title": "",
    "description": "",
    "maxMarks": 0,
    "numberOfQuestions": 0,
    "timeOfQuiz":0,
    "category": {
      "categoryid": ""
    }
  }
  ngOnInit(): void {

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
  }

  addQuiz() {
    if (this.quiz.title == "" || this.quiz.title.trim().length == 0) {
      this.toaster.error("Title must not be empty")
      return;
    }
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
      this.spinner.show().then(() => {
        this.adminService.addQuiz(this.quiz).subscribe((data) => {
          this.spinner.hide()
          if (data.status == 200) {
            Swal.fire("Success", data.msg, "success")
            this.router.navigateByUrl("/admin/quizzes")
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
