import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-show-all-user',
  templateUrl: './show-all-user.component.html',
  styleUrls: ['./show-all-user.component.css']
})
export class ShowAllUserComponent implements OnInit {

  constructor(private adminService: AdminService,private router:Router,private spinner:NgxSpinnerService,private toaster:ToastrService) { }
  attempts:Array<any>=[]
  mess:any=""

  pass:any=0;
  fail:any=0;
  marks:any=0;
  ngOnInit(): void {
    let id = sessionStorage.getItem("userid")
    if (id != null) {
      sessionStorage.removeItem("userid")
      this.adminService.currentUserAttempts(id).subscribe((data) => {
        this.spinner.hide()
        if (data.status == 200) {
          this.attempts = data.data
          this.attempts.filter((d) => {
            if (d.percentage >= 35) {
              this.pass++
            } else if (d.percentage < 35) {
              this.fail++;
            }
            this.marks += d.totalMarks
          })
        } else {
          this.mess = data.msg
        }
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Something went wrong", "error")
      })
    } else {
      Swal.fire("Error", "Something went wrong", "error")
      this.router.navigateByUrl("/admin")
    }
  }


  showDetails(id:any){
    sessionStorage.setItem("attemptid",id);
    this.router.navigateByUrl("/admin/showDetails")
  }

  deleteDetail(id:any){
    this.spinner.show().then(()=>{
      this.adminService.deleteDetail(id).subscribe((e)=>{
        this.spinner.hide()
        if(e.status==200){
          this.toaster.success(e.msg)
          this.attempts = this.attempts.filter((e)=>e.attemptid != id)
        }else{
          this.toaster.error("Something went wrong")
        }
      },()=>{
        this.spinner.hide()
        this.toaster.error("Something went wrong")
      })
    })
  }
}
