import { Router } from '@angular/router';
import { AdminService } from './../../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  constructor(private toaster:ToastrService,private spinner:NgxSpinnerService,private adminService:AdminService,private router:Router) { }
  category:any={
    "title":"",
    "description":""
  }
  ngOnInit(): void {
  }

  addCategory(){
    if(this.category.title == "" || this.category.title.trim().length == 0 ){
      this.toaster.error("Title must not be empty")
      return;
    }
    if(this.category.description == "" || this.category.description.trim().length == 0 ){
      this.toaster.error("Description must not be empty")
      return;
    }else{
      this.spinner.show().then(()=>{
        this.adminService.addCategory(this.category).subscribe((data)=>{
          this.spinner.hide()
          if(data.status == 200){
            Swal.fire("Success",data.msg,"success")
            this.router.navigateByUrl("/admin/showCategories")
          }else if(data.status == 400){
            Swal.fire("Error",data.msg,"error")
          }
        },()=>{
          this.spinner.hide()
          Swal.fire("Error","Somethings went wrong","error")
        })
      })

    }

  }


}
