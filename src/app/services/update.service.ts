import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private httpClient:HttpClient) { }

  updateUserData(users:any):Observable<any>{
    return this.httpClient.put(environment.url+"/user/updateAccountDetails",users);
  }
}
