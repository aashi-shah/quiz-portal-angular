import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private httpClient:HttpClient) { }

  forgotPassword(user:any):Observable<any>{

    return this.httpClient.post(environment.url+"/user/forgotpassword",user)
  }//incomplete



  generateTokenForForgetPassword(user:any):Observable<any>{
    return this.httpClient.post(environment.url+"/generate-tokens",user)
  }//email required

   //check otp
   checkOtp(number:any,otp:any):Observable<any>{
    const header = {"number":number,"oneTimeOtp":otp}
    return this.httpClient.get(environment.url+"/user/validateOtp",{headers:header})
  }
}
