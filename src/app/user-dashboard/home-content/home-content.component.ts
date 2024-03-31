import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { LoginService } from './../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from './../../services/admin.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {

  constructor(private adminService:AdminService,private spinner:NgxSpinnerService,private loginService:LoginService,private router:Router) { }
  attempts:Array<any>=[]
  mess:any=""
  user:any={}
  pass:any=0;
  fail:any=0;
  marks:any=0;
  ngOnInit(): void {
    sessionStorage.removeItem("quizid")
    this.spinner.show().then(()=>{
      this.loginService.getCurrentUser().subscribe((e)=>{
        this.user = e
        this.adminService.currentUserAttempts(e.userid).subscribe((data)=>{
          this.spinner.hide()
          if(data.status==200){
            this.attempts=data.data
            this.attempts.filter((d)=>{
              if(d.percentage>=35){
                this.pass++
              }else if(d.percentage<35){
                this.fail++;
              }
              this.marks+=d.totalMarks
            })
          }else{
            this.mess = data.msg
          }
        },()=>{
          this.spinner.hide()
          Swal.fire("Error","Something went wrong","error")
        })

      },()=>{
        this.spinner.hide()
        Swal.fire("Error","Something went wrong","error")
      })
    })

  }


  showDetails(id:any){
    sessionStorage.setItem("attemptid",id);
    this.router.navigateByUrl("/user/showDetails")
  }

  showAllUser(id:any){
    sessionStorage.setItem("quizid",id)
    this.router.navigateByUrl("/user/getAllUserDetails")
  }

  logOut() {
    this.loginService.doLogOut()
    this.router.navigateByUrl("/login")
  }



}
