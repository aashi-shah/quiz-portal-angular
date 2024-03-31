
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/login.service';
// declare function razorPay(obj: any): Promise<any>;
declare var Razorpay: any;

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.css']
})
export class PricingTableComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router, private spinner: NgxSpinnerService, private loginService: LoginService) {



  }
  users: any = {}


  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.loginService.getCurrentUser().subscribe((e) => {
        this.spinner.hide()
        this.users = e
        // sessionStorage.setItem("userid", e.userid)
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Something went wrong", "error")
      })
    })
  }


  paymentDetails: any = {}
  // response: any = {}
  is_check:any=false
  getOrderTransaction(buySubscription:any) {
    console.log(buySubscription)
    this.spinner.show().then(() => {
      this.adminService.createOrder().subscribe((e) => {
        this.spinner.hide()
        if (e.status == 200) {
          this.paymentDetails = JSON.parse(e.data)
          if (this.paymentDetails.status == "created") {
            let obj = {
              "amount": this.paymentDetails.amount,
              "created_at": this.paymentDetails.created_at,
              "amount_due": this.paymentDetails.amount_due,
              "currency": this.paymentDetails.currency,
              "orderid": this.paymentDetails.id
            }
            var options = {
              "key": "rzp_test_MiW841P4yRPgnT",
              "amount": JSON.stringify(obj.amount),

              "currency": "INR",
              "name": "PrepArials",
              "description": "Trasaction for Buying Service",
              "image": "../../../assets/img/favicon/favicon.ico",
              "order_id": obj.orderid, //This is a sample Order ID. Pass the
              "handler": this.handlerRespPayment,
              "notes": {
                "address": "By aashi and riya"

              },
              "theme": {
                "color": "#696cff",
              },
              "modal": {
                "animation": true
              }
            };
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', this.handlerRespPayment)
            rzp1.open();
            this.is_check=true
          } else {
            Swal.fire("Error", "Transaction Cancelled Try again..", "error")
          }
        } else {
          Swal.fire("Error", "Something went wrong", "error")
        }
      }, () => {
        this.spinner.hide()
        Swal.fire("Error", "Something went wrong", "error")
      })
    })

  }

  handlerRespPayment(res: any) {
    sessionStorage.setItem("res",JSON.stringify(res))
    Swal.fire("Information","Please Click on button to get Confirmation","info")
  }
  ress:any=null
  handleReq() {
     this.ress = sessionStorage.getItem("res")
    this.ress = JSON.parse(this.ress);

    if (this.ress !=null) {
      sessionStorage.removeItem("res")
      this.spinner.show().then(() => {
        this.adminService.changeRole(this.users.userid).subscribe(() => {
          this.spinner.hide()
          Swal.fire("Success", "Payment Successfully", "success")
          setTimeout(() => {
            this.logOut()
          }, 2000);
        }, error => {
          sessionStorage.removeItem("res")
          this.spinner.hide()
          Swal.fire("Error", "Somethings went wrong", "error")
        })
      })

    } else {
      sessionStorage.removeItem("res")
      this.spinner.hide()
      Swal.fire("Error", "Please Do Payment first", "error")
    }

  }


  logOut() {

    this.loginService.doLogOut()
    this.router.navigateByUrl("/login")
  }
}
