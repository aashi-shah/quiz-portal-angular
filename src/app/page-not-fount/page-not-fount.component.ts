import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-fount',
  templateUrl: './page-not-fount.component.html',
  styleUrls: ['./page-not-fount.component.css']
})
export class PageNotFountComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  checkUserAdmin(){
    if(this.router.url.includes("/user")){
      this.router.navigateByUrl("/user")
    }else{
      this.router.navigateByUrl("/admin")
    }
  }

}
