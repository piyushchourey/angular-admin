import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'add-client-devices-component',
  templateUrl: './add-client-devices.component.html'
})
export class AddClientDevicesComponent implements OnInit {
  submitted: boolean = false;
  id: boolean;
  btnText: string  = "Add";

  constructor(public service: CommonService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if( this.id && this.id != undefined) {
        this.getDetailById(this.id);
      }
    });   
   }

clientDeviceForm = new FormGroup({ 
    _id: new FormControl(""),
    clientName: new FormControl("",[Validators.required]),
    deviceName: new FormControl("",[Validators.required]),
    manufacturer: new FormControl("",Validators.required),
    modelNumber: new FormControl("",Validators.required),
    receivedDate: new FormControl("",Validators.required),
    purchaseFrom: new FormControl("",Validators.required),
    serialNumber: new FormControl("",Validators.required),
    remark1: new FormControl("",Validators.required),
    remark2: new FormControl("",Validators.required),
    wifiAddress: new FormControl("",Validators.required)
});


// convenience getter for easy access to form fields
  get f() { return this.clientDeviceForm.controls; }

//Add client device information function..
onSubmit() {
    
  this.submitted = true;
 // stop here if form is invalid.
 
  if (this.clientDeviceForm.invalid) {
    return;
  }
  this.insert(this.clientDeviceForm.value);
}

  //insert function..
  insert(insertFormValue){
    this.service.postData('devices/insert',insertFormValue).subscribe(
      response=>{
        this.spinner.hide();
        let result:any=response;
        if(result.type=="fail"){
          this.toastr.error('Something went wrong.','Sorry!');
        }
        else{
          this.clientDeviceForm.reset();
            this.toastr.success(result.msg,'Success!');
          setTimeout(() => {
            this.router.navigate(['devices/list']);
          }, 1000);
          
        }
      },
      (error :Response)=>{
          //console.log(error);
      });
  }

getDetailById(id){
  let param = { '_id':id };
  this.service.postData('devices/edit',param).subscribe(
    response=>{
     let result:any=response;
      if(result.type=="fail"){
        this.toastr.error('User not found!','Sorry!');
      }
      else{
        this.btnText = "Update";
        this.clientDeviceForm.patchValue(result.data);
      }
    }, 
    (error :Response)=>{
        //console.log(error);
    });
}
ngOnInit() {
}

}
