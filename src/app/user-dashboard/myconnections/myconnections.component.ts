import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-myconnections',
  templateUrl: './myconnections.component.html',
  styleUrls: ['./myconnections.component.css']
})
export class MyconnectionsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  checkUserAdmin(){
    if(this.router.url.includes("/admin")){
      return true;
    }else{
      return false;
    }
  }
}
