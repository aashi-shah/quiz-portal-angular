import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }

  //category
  showCategory():Observable<any>{
    return this.httpClient.get(environment.url+"/category/")
  }

  deleteCategory(id:any){
    const header= { "categoryid": id };
    return this.httpClient.delete(environment.url+"/category/",{headers:header})
  }

  addCategory(category:any):Observable<any>{
    return this.httpClient.post(environment.url+"/category/",category);
  }

  editCategory(category:any):Observable<any>{
    return this.httpClient.put(environment.url+"/category/",category)
  }

  getCategory(categoryid:any):Observable<any>{
    const header= { "categoryid": categoryid };
    return this.httpClient.get(environment.url+"/category/particular",{headers:header})
  }

  //quizzes
  showQuizzes():Observable<any>{
    return this.httpClient.get(environment.url+"/quiz/")
  }

  deleteQuiz(id:any){
    const header= { "quizid": id };
    return this.httpClient.delete(environment.url+"/quiz/",{headers:header})
  }

  addQuiz(quiz:any):Observable<any>{
    return this.httpClient.post(environment.url+"/quiz/",quiz);
  }

  editQuiz(quiz:any):Observable<any>{
    return this.httpClient.put(environment.url+"/quiz/",quiz)
  }

  getQuiz(quizid:any):Observable<any>{
    const header= { "quizid": quizid };
    return this.httpClient.get(environment.url+"/quiz/particular",{headers:header})
  }

  getQuizzesOfCategory(categorytitle:any):Observable<any>{
    const header= { "categorytitle": categorytitle };
    return this.httpClient.get(environment.url+"/quiz/category",{headers:header})
  }

  //questions
  showQuestions():Observable<any>{
    return this.httpClient.get(environment.url+"/question/")
  }

  deleteQuestion(id:any){
    const header= { "questionid": id };
    return this.httpClient.delete(environment.url+"/question/",{headers:header})
  }

  addQuestion(question:any):Observable<any>{
    return this.httpClient.post(environment.url+"/question/",question);
  }

  editQuestion(question:any):Observable<any>{
    return this.httpClient.put(environment.url+"/question/",question)
  }

  getQuestion(questionid:any):Observable<any>{
    const header= { "questionid": questionid };
    return this.httpClient.get(environment.url+"/question/particular",{headers:header})
  }

  getQuestionsOfQuiz(quizid:any):Observable<any>{
    const header= { "quizid": quizid };
    return this.httpClient.get(environment.url+"/question/quiz",{headers:header})
  }

  getSomeQuestionsOfQuiz(quizid:any):Observable<any>{
    const header= { "quizid": quizid };
    return this.httpClient.get(environment.url+"/question/quizselect",{headers:header})
  }

  evaluateResult(questions:any):Observable<any>{
    return this.httpClient.post(environment.url+"/question/evaluate",questions)
  }


  //attempt
  addAttempt(attempt:any):Observable<any>{
    return this.httpClient.post(environment.url+"/attempt/",attempt)
  }

  checkDuplication(attempt:any):Observable<any>{
    return this.httpClient.post(environment.url+"/attempt/checkDuplicate",attempt)
  }

  currentUserAttempts(id:any):Observable<any>{
    const header= { "userid": id };
    return this.httpClient.get(environment.url+"/attempt/currentUserAttempts",{headers:header})
  }

  currentQuizDetails(id:any):Observable<any>{
    const header = {"attemptid":id};
    return this.httpClient.get(environment.url+"/attempt/currentQuizDetails",{headers:header})
  }

  getAllAttempt():Observable<any>{
    return this.httpClient.get(environment.url+"/attempt/")
  }

  getAllUserDetails(id:any):Observable<any>{
    const header = {"quizid":id}
    return this.httpClient.get(environment.url+"/attempt/getAllUserDetails",{headers:header})
  }



  //get current user
  getCurrentUser(id:any):Observable<any>{
    const header = {"userid":id}

    return this.httpClient.get(environment.url+"/getCurrentUser",{headers:header})
  }

  //change Password
  changePassword(id:any,password:any){
    const header = {"userid":JSON.stringify(id),"password":JSON.stringify(password)}
    return this.httpClient.get(environment.url+"/changePassword?userid="+id+"&password="+password)
  }

  //delete attempt by admin
  deleteDetail(id:any):Observable<any>{
    // const header = {"attemptid":id};
    return this.httpClient.delete(environment.url+"/attempt/deleteAttempt?attemptid="+id)
  }

  //payment gateway call for order creation
  createOrder():Observable<any>{
    return this.httpClient.get(environment.url+"/user/createOrderPayment")
  }

  //change role
  changeRole(id:any):Observable<any>{
    return this.httpClient.get(environment.url+"/user/roleChange/?userid="+id)
  }

  //admin change to user
  changeAdminUser(id:any):Observable<any>{
    return this.httpClient.get(environment.url+"/user/roleChangeUser/?userid="+id)
  }

  //delete account
  deleteUser(id:any):Observable<any>{
    return this.httpClient.delete(environment.url+"/user/deleteUser/?userid="+id)
  }

  //ban user
  banUser(id:any):Observable<any>{
    return this.httpClient.get(environment.url+"/user/banUser/?userid="+id)
  }
}


