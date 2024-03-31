import { AdminService } from './../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit {

  constructor(private router:Router,private toaster:ToastrService,private spinner:NgxSpinnerService,private adminService:AdminService) { }
  attempt:any={}
  question:Array<any>=[]
  title:any=""
  ngOnInit(): void {
    let id=sessionStorage.getItem("attemptid")
    sessionStorage.removeItem("attemptid")
    if(id==null){
      this.toaster.error("Something went wrong")
      if(this.router.url.includes("/user")){
        this.router.navigateByUrl("/user")
      }else{
        this.router.navigateByUrl("/admin")
      }
    }else{
      this.spinner.show().then(()=>{
        this.adminService.currentQuizDetails(id).subscribe((e)=>{
          this.spinner.hide()
          if(e.status==200){
            this.attempt = e.data

            this.question = JSON.parse(e.data.content)
            

          }else{
            Swal.fire("Error","Something went wrong","error")
            if(this.router.url.includes("/user")){
              this.router.navigateByUrl("/user")
            }else{
              this.router.navigateByUrl("/admin")
            }

          }
        },()=>{
          this.spinner.hide()
          Swal.fire("Error","Something went wrong","error")
          if(this.router.url.includes("/user")){
            this.router.navigateByUrl("/user")
          }else{
            this.router.navigateByUrl("/admin")
          }
        })
      })
    }
  }

  redirectHome(){
    if(this.router.url.includes("/user")){
      this.router.navigateByUrl("/user")
    }else{
      this.router.navigateByUrl("/admin")
    }
  }
}
