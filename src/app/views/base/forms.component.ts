import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {UpperCaseTextDirective} from '../../directive/upper-case.directive';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent {
  submitted: boolean = false;
  showOSSecretKey:boolean=false;
  showMSSecretKey:boolean=false;
  constructor(public service: CommonService,
    private spinner: NgxSpinnerService) { }

  form = new FormGroup({ 
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
   //console.log(this.form);
    if (this.form.invalid) {
        return;
    }

    this.service.postData('users/insert',this.form.value).subscribe(
      response=>{
        this.spinner.hide();
        let result:any=response;
        if(result.type=="fail"){
          
        }
        else{
          
          this.form.reset();
        }
      },
      (error :Response)=>{
          //console.log(error);
      });
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



}
