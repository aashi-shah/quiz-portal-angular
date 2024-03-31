import { LoginService } from './../../services/login.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './../../services/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';


@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private router: Router, private locationSta: LocationStrategy, private adminService: AdminService, private spinner: NgxSpinnerService, private toaster: ToastrService, private loginService: LoginService) {

  }

  ele = document.documentElement
  questions: Array<any> = []
  attemptQuestions = 0
  correctAnswers = 0;
  totalMarks = 0;
  isSubmitted = false;
  percentage = 0;
  isCheck = false

  timer: any;
  ngOnInit(): void {
    this.preventBack();
    let id = sessionStorage.getItem("quizid")
    this.spinner.show().then(() => {
      this.adminService.getSomeQuestionsOfQuiz(id).subscribe((e) => {
        this.spinner.hide()
        if (e.status == 200) {
          this.questions = e.data
          this.timer = this.questions[0].quiz.timeOfQuiz * 60;

          if (this.ele.requestFullscreen) {
            this.ele.requestFullscreen()
            this.isCheck = true;
            this.startTimer()
            document.addEventListener('contextmenu', event => event.preventDefault());
          }
        } else {
          Swal.fire("Error", "Somethings went wrong", "error")
        }
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Somethings went wrong", "error")
      })

    })

    if (this.isSubmitted == false) {
      this.disabledItems()
    }
  }


  disabledItems() {
    document.addEventListener(
      'keydown',
      (e: any) => {
        if (e.keyCode === 123 || e.keyCode === 18 || e.keyCode === 17) {
          this.isSubmitted = true
          this.evaluate()
        }
      },
      true
    );

    document.addEventListener("visibilitychange", () => {
      this.isSubmitted = true
      this.evaluate()
    })

    let misuse = setInterval(() => {

      if (window.innerWidth == screen.width && window.outerHeight == screen.height) {

      } else {
        this.toaster.error("Misbehave found.. Exam Submitted")
        this.evaluate()
        clearInterval(misuse)
        return;
      }
    }, 1000)
    if (this.isCheck && performance.navigation.TYPE_RELOAD == performance.navigation.type) {
      this.toaster.error("Misbehave found.. Exam Submitted")
      this.evaluate()
      return;
    }


  }
  //back button disabled
  preventBack() {

    history.pushState(null, "", location.href);
    this.locationSta.onPopState(() => {
      history.pushState(null, '', location.href);
      this.evaluate()
      this.isSubmitted = true

    })
  }


  //exit screen
  exitScreen() {
    Swal.fire({
      title: "Do you want to Submit this Quiz?.",
      showCancelButton: true,
      confirmButtonText: "Submit",
      denyButtonColor: "Back",
      confirmButtonColor: "#03c3ec",
      icon: "info"
    }).then((e) => {
      if (e.isConfirmed) {
        this.evaluate()
      }
    })

  }

  //timer start
  startTimer() {
    let timer = window.setInterval(() => {
      if (this.timer <= 0) {
        this.toaster.success("Times Up..")
        this.isSubmitted = true
        this.evaluate()
        clearInterval(timer)
      } else {
        this.timer--;
      }
    }, 1000)
  }

  //get time
  getPerfectTime() {
    let hour = Math.floor(this.timer / 3600)
    if (hour > 0) {
      let minute = Math.floor((hour * 3600 - this.timer) / 60)
      let second = this.timer - minute * 60;
      return `${hour} hour : ${minute} min : ${second} sec`
    } else {
      let minute = Math.floor((this.timer) / 60)
      let second = this.timer - minute * 60;
      return `${minute} min : ${second} sec`
    }

  }

  attempt: any = {
    "user": {
      "userid": ""
    },
    "quiz": {
      "quizid": ""
    },
    "content": "{json}",
    "attemptQuestions": 0,
    "correctAnswers": 0,
    "totalMarks": 0,
    "percentage": 0

  }

  evaluate() {

    this.spinner.show().then(() => {
      this.adminService.evaluateResult(this.questions).subscribe((e) => {
        this.spinner.hide()
        if (e.status == 200) {
          // this.correctAnswers = e.data.correctAnswers;
          // this.attemptQuestions = e.data.attemptQuestions
          // this.totalMarks = e.data.totalMarks;
          // this.percentage = e.data.percentage;


          //attempt ready
          this.spinner.show().then(() => {
            this.loginService.getCurrentUser().subscribe((data) => {
              this.spinner.hide()

              this.attempt.content = JSON.stringify( this.questions)
              this.attempt.attemptQuestions = e.data.attemptQuestions
              this.attempt.correctAnswers = e.data.correctAnswers;
              this.attempt.totalMarks = e.data.totalMarks
              this.attempt.percentage = e.data.percentage
              this.attempt.quiz.quizid = sessionStorage.getItem("quizid")
              this.attempt.user.userid = data.userid


              this.spinner.show().then(() => {
                this.adminService.addAttempt(this.attempt).subscribe((e) => {
                  this.spinner.hide();
                  if (e.status == 200) {
                    this.correctAnswers = e.data.correctAnswers;
                    this.attemptQuestions = e.data.attemptQuestions
                    this.totalMarks = e.data.totalMarks;
                    this.percentage = e.data.percentage;
                    sessionStorage.removeItem("quizid")
                  } else {
                    Swal.fire("Error", "Somethings went wrong", "error")
                  }
                })
              })
            }, error => {
              this.spinner.hide()
              Swal.fire("Error", "Somethings went wrong", "error")
            })
          })


          // if (document.exitFullscreen) {
          this.isSubmitted = true
          // document.exitFullscreen()
          Swal.fire("Success", e.msg, "success")
          // }
        } else {
          Swal.fire("Error", "Something went wrong", "error")
        }
      }, error => {
        this.spinner.hide()
        Swal.fire("Error", "Something went wrong", "error")
      })
    })

  }


  printResult() {
    window.print()
    setTimeout(() => {
      this.router.navigateByUrl("/user")
    }, 2000);
  }

}
