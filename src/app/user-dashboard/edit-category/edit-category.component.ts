import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private toaster:ToastrService,private spinner:NgxSpinnerService,private adminService:AdminService,private router:Router) { }
  category:any={}
  ngOnInit(): void {
    let id = sessionStorage.getItem("categoryid")
    if(id!=null){
      sessionStorage.removeItem("categoryid")
      this.spinner.show().then(()=>{
        this.adminService.getCategory(id).subscribe((e)=>{
          this.spinner.hide()
          if(e.status == 200){
            this.category = e.data
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

  editCategory(){
    if(this.category.description == "" || this.category.description.trim().length == 0 ){
      this.toaster.error("Description must not be empty")
      return;
    }else{
      this.spinner.show().then(()=>{
        this.adminService.editCategory(this.category).subscribe((e)=>{
          this.spinner.hide()
            if(e.status == 200){
              this.toaster.success(e.msg)
              this.router.navigateByUrl("/admin/showCategories")
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
