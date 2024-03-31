import { PricingTableComponent } from './user-dashboard/pricing-table/pricing-table.component';
import { AddAdminComponent } from './user-dashboard/add-admin/add-admin.component';
import { ChangePasswordComponent } from './user-dashboard/change-password/change-password.component';
import { OtpPageComponent } from './user-dashboard/otp-page/otp-page.component';
import { ShowAllUserComponent } from './user-dashboard/show-all-user/show-all-user.component';
import { ShowAllUserDetailsComponent } from './user-dashboard/show-all-user-details/show-all-user-details.component';
import { ShowDetailsComponent } from './user-dashboard/show-details/show-details.component';
import { StartQuizComponent } from './user-all-dashboard/start-quiz/start-quiz.component';
import { ShowInformationComponent } from './user-all-dashboard/show-information/show-information.component';
import { ShowUserQuizzesComponent } from './user-all-dashboard/show-user-quizzes/show-user-quizzes.component';
import { EditQuestionComponent } from './user-dashboard/edit-question/edit-question.component';
import { AddQuestionComponent } from './user-dashboard/add-question/add-question.component';
import { ShowQuizQuestionsComponent } from './user-dashboard/show-quiz-questions/show-quiz-questions.component';
import { EditQuizComponent } from './user-dashboard/edit-quiz/edit-quiz.component';
import { AddQuizComponent } from './user-dashboard/add-quiz/add-quiz.component';
import { EditCategoryComponent } from './user-dashboard/edit-category/edit-category.component';
import { AddCategoriesComponent } from './user-dashboard/add-categories/add-categories.component';
import { ShowQuizzesComponent } from './user-dashboard/show-quizzes/show-quizzes.component';
import { ShowCategoriesComponent } from './user-dashboard/show-categories/show-categories.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminGuard } from './services/admin.guard';
import { UserGuard } from './services/user.guard';

import { AdminHomeContentComponent } from './user-dashboard/admin-home-content/admin-home-content.component';
import { HomeContentComponent } from './user-dashboard/home-content/home-content.component';
import { MyconnectionsComponent } from './user-dashboard/myconnections/myconnections.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyaccountComponent } from './user-dashboard/myaccount/myaccount.component';
import { PageNotFountComponent } from './page-not-fount/page-not-fount.component';

import { ForgetPasswordComponent } from './user-auth/forget-password/forget-password.component';
import { LoginComponent } from './user-auth/login/login.component';
import { SignupComponent } from './user-auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';


const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
	{
		path: "signup",
		component:SignupComponent,
		pathMatch:"full"
	},
  {
    path: "login",
		component:LoginComponent,
		pathMatch:"full"
  },
  {
    path: "forgetpassword",
		component:ForgetPasswordComponent,
		pathMatch:"full"
  },{
    path:"otpEnter",
    component:OtpPageComponent,
    pathMatch:"full"
  },
  {
    path:"changePassword",
    component:ChangePasswordComponent,
    pathMatch:"full"
  },



  {
      path:"user",
      component:DashboardComponent,
      canActivate:[UserGuard],
      children:[
        {
          path:"",
          component:HomeContentComponent,

        },
        {
          path: "myaccount",
          component:MyaccountComponent,
          pathMatch:"full"
        },
        {
          path: "myconnections",
          component:MyconnectionsComponent,
          pathMatch:"full"
        },{
          path: "showQuizzes",
          component:ShowUserQuizzesComponent,
        },{
          path: "showQuizzes/:title",
          component:ShowUserQuizzesComponent,
        },{
          path:"showInformation",
          component:ShowInformationComponent,
          pathMatch:"full"
        },{
          path:"showDetails",
          component:ShowDetailsComponent,
          pathMatch:"full"
        }
        ,{
          path:"getAllUserDetails",
          component:ShowAllUserDetailsComponent,
          pathMatch:"full"
        },{
          path:"getPrices",
          component:PricingTableComponent,
          pathMatch:"full"
        }

      ],
  },{
    path:"admin",
    component:AdmindashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:"",
        component:AdminHomeContentComponent,

      },
      {
        path: "myaccount",
        component:MyaccountComponent,
        pathMatch:"full"
      },
      {
        path: "myconnections",
        component:MyconnectionsComponent,
        pathMatch:"full"
      },
      {
        path:"showCategories",
        component:ShowCategoriesComponent,
        pathMatch:"full"

      },
      {
        path:"quizzes",
        component:ShowQuizzesComponent,
        pathMatch:"full"
      },{
        path:"addCategory",
        component:AddCategoriesComponent,
        pathMatch:"full"
      }
      ,{
        path:"editCategory",
        component:EditCategoryComponent,
        pathMatch:"full"
      },{
        path:"addQuiz",
        component:AddQuizComponent,
        pathMatch:"full"
      },{
        path:"editQuiz",
        component:EditQuizComponent,
        pathMatch:"full"
      },{
        path:"showQuestions",
        component:ShowQuizQuestionsComponent,
        pathMatch:"full"
      },{
        path:"addQuestion",
        component:AddQuestionComponent,
        pathMatch:"full"
      },{
        path:"editQuestion",
        component:EditQuestionComponent,
        pathMatch:"full"
      },{
        path:"showAllUser",
        component:ShowAllUserComponent,
        pathMatch:"full"
      },{
        path:"showDetails",
        component:ShowDetailsComponent,
        pathMatch:'full'
      },{
        path:"addAdmin",
        component:AddAdminComponent,
        pathMatch:"full"
      }

    ],
  },{
    path:"startExam",
    component:StartQuizComponent,
    pathMatch:"full"
  },






  {
    path:"**",
    component:PageNotFountComponent
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
