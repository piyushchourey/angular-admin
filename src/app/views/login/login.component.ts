import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonService } from '../../service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  errorMsg:string;
  submitted = false;
  constructor(private router: Router,private service: CommonService,private spinner: NgxSpinnerService){
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
    console.log(this.loginForm.value);
    this.service.postData('users/add',this.loginForm.value).subscribe(
    response=>{
      this.spinner.hide();
      let result:any=response;
      if(result.type=="fail")
      {

      }
      else{
        localStorage.setItem('token','5d039189056eb');
        localStorage.setItem('role','network');
        this.router.navigate(['dashboard']);
        this.service.isLogin = true;
      }
    },
    (error :Response)=>{
        //console.log(error);
    });
  }
  
}
