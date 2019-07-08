import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  errorMsg:string;
  submitted = false;
  constructor(private router: Router,
              private service: CommonService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private cookieService: CookieService ){
    if (this.service.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",Validators.required)
  });

  //login function..
  doLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return;
    }
    this.service.postData('users/add',this.loginForm.value).subscribe(
    response=>{
      this.spinner.hide();
      let result:any=response;
      if(result.type=="error")
      {
        this.toastr[result.type](result.msg,'Error');
      }  
      else{
        this.toastr[result.type](result.msg,'Success!');
        localStorage.setItem('token','5d039189056eb');
        localStorage.setItem('role','network');
        this.cookieService.set('_sdata','5d039189056eb',0.25);
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1000);
        this.service.isLogin = true;
      }
    },
    (error :Response)=>{
        //console.log(error);
    });
  }
  
}
