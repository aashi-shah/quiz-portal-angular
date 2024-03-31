import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-show-categories',
  templateUrl: './show-categories.component.html',
  styleUrls: ['./show-categories.component.css']
})
export class ShowCategoriesComponent implements OnInit {

  constructor(private adminService:AdminService,private spinner:NgxSpinnerService,private toaster:ToastrService,private router:Router) { }

  category: Array<any> = []
  ngOnInit(): void {
    this.spinner.show().then(()=>{
      this.adminService.showCategory().subscribe((e)=>{
        this.spinner.hide()
        if(e.status==200){
          this.category = e.data
        }else {
          Swal.fire("Error","Somethings went wrong","error")
        }
      },()=>{
        this.spinner.hide()
        Swal.fire("Error","Somethings went wrong","error")
      })
    })
  }

  deleteCategory(id:any){

    Swal.fire({
      icon:'info',
      title:'Are you sure to Delete?!..',
      confirmButtonText:"Delete",
      confirmButtonColor:"#03c3ec",
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.spinner.show().then(()=>{
          this.adminService.deleteCategory(id).subscribe((e)=>{
            this.spinner.hide()
            this.toaster.success("Category Delete Successfully")
            this.category = this.category.filter(cate=>cate.categoryid!=id);
          },()=>{
            this.spinner.hide()
            Swal.fire("Error","Somethings went wrong","error")
          })
        })
      }
    })
  }

  updateCategory(id:any){
    sessionStorage.setItem("categoryid",id)
    this.router.navigateByUrl("/admin/editCategory")
  }


}
