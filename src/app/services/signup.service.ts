import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient:HttpClient) { }

  signUpUser(user:any):Observable<any>{
    return this.httpClient.post(environment.url+"/user/signup",user)
  }

  signUpNewAdmin(user:any):Observable<any>{
    return this.httpClient.post(environment.url+"/user/signup/admin",user)
  }
}
