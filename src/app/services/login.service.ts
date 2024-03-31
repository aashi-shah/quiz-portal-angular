import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }

  loginUser(user:any,headers:any):Observable<any>{
    return this.httpClient.post(environment.url+"/user/login",user,{headers})
  }//for login

  generateToken(user:any):Observable<any>{
    return this.httpClient.post(environment.url+"/generate-token",user)
  }//email and password both required

  storeToken(token:any){
    sessionStorage.setItem("token",token)
  }//store token in local storage

  isLoggedIn(){
    const token = sessionStorage.getItem("token")
    return token == undefined || token == null || token == ""?false:true;
  }//already login or not

  doLogOut(){
    sessionStorage.clear()
    Swal.fire("Success","Logout Successfully","success")
    return true;
  }//remove the token in localstorage

  getToken(){
    return sessionStorage.getItem("token")
  }//get token in localstorage

  getCurrentUser():Observable<any>{
    return this.httpClient.get(environment.url+"/getcurrent-user")
  }//get current user using token



  //get all user
  getAllUser():Observable<any>{
    return this.httpClient.get(environment.url+"/allUser")
  }

 
}

