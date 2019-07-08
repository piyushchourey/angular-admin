import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {UpperCaseTextDirective} from '../../directive/upper-case.directive';
import { ToastrService } from 'ngx-toastr';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent {
  submitted: boolean = false;
  showOSSecretKey:boolean=false;
  showMSSecretKey:boolean=false;
  userId: any;
  btnText : string = "Add User";
  constructor(public service: CommonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {  
      this.route.params.subscribe(params => {
        this.userId = params['userId'];
        if( this.userId !== '' && this.userId != undefined) {
          this.getUserById(this.userId);
        }
      });     
    }

  form = new FormGroup({ 
    _id: new FormControl(""),
    username: new FormControl("",[Validators.required],this.service.userValidator('user')),
    ipAddress: new FormControl("",[Validators.required]),
    systemName: new FormControl("",Validators.required),
    // configuration: new FormControl("",Validators.required),
    ram: new FormControl("",Validators.required),
    processor: new FormControl("",Validators.required),
    hardDisk: new FormControl("",Validators.required),
    tagging: new FormControl("",Validators.required),
    osActive: new FormControl("",Validators.required),
    osSecretKey: new FormControl(""),
    osName: new FormControl("",Validators.required),
    machineName: new FormControl("",Validators.required),
    msoffice: new FormControl("",Validators.required),
    MSName: new FormControl("",Validators.required),
    msSecretKey:new FormControl(""),
    officeNumber: new FormControl("",Validators.required),
    spare: new FormControl("",Validators.required),
    teamName: new FormControl("",Validators.required),
    remark: new FormControl("",Validators.required)
  });

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  //Add User function..
  onSubmit() {
    
    this.submitted = true;
   // stop here if form is invalid.
   
    if (this.form.invalid) {
      return;
    }
    if(this.form.value._id!=""){
      this.update(this.form.value);
    }else{
      this.insert(this.form.value);
    }
  }

    //MS office & OS office secret key show event..
  activationOnChange(event){
      if(event.target.value == "Yes"){
        if(event.target.id=="msoffice"){
          this.showMSSecretKey = true;
          this.form.get("msSecretKey").setValidators(Validators.required);
        }else{
          this.showOSSecretKey = true;
          this.form.get("osSecretKey").setValidators(Validators.required);
        }
      }
      else{
        this.showMSSecretKey = false;
        this.showOSSecretKey = false;
        this.form.get("osSecretKey").clearValidators();
        this.form.get("msSecretKey").clearValidators();
      }
    }

    //Get User by id..
  getUserById(userId) {
    console.log('get edit data -- '+userId);
    let param = { '_id':userId };
    this.service.postData('users/edit',param).subscribe(
      response=>{
       let result:any=response;
        if(result.type=="fail"){
          this.toastr.error('User not found!','Sorry!');
        }
        else{
          if(result.data.msSecretKey)
            this.showMSSecretKey = true;
          if(result.data.osSecretKey)
            this.showOSSecretKey = true;
          
          this.btnText = "Update User";
          this.form.controls['username'].disable();
          console.log('get data '+result.data._id);
          this.form.patchValue(result.data);
        }
      }, 
      (error :Response)=>{
          //console.log(error);
      });
  }

  //User insert function..
  insert(insertFormValue){
    this.service.postData('users/insert',insertFormValue).subscribe(
      response=>{
        this.spinner.hide();
        let result:any=response;
        if(result.type=="fail"){
          
        }
        else{
          this.form.reset();
          this.toastr.success('User Insert Successfully!','Success!');
          setTimeout(() => {
            this.router.navigate(['user/list']);
          }, 1000);
          
        }
      },
      (error :Response)=>{
          //console.log(error);
      });
  }

  update(updateFormValue){
    console.log(updateFormValue);
    this.service.postData('users/update',updateFormValue).subscribe(
      response=>{
        this.spinner.hide();
        let result:any=response;
        if(result.type=="errro"){
          this.toastr.error(result.msg,'Error!');
        }
        else{
          this.form.reset();
          this.toastr.success(result.msg,'Success!');
          setTimeout(() => {
            this.router.navigate(['user/list']);
          }, 1000);
          
        }
      },
      (error :Response)=>{
          //console.log(error);
      });
  }


} 