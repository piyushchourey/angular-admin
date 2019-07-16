import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { CommonService } from '../../../service/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-client-devices-component',
  templateUrl: './client-devices.component.html'
})
export class ClientDevicesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  clientDevicesInfoData:any = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private service: CommonService,
    public router: Router,
    public toastr : ToastrService
  ){

  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getClientDevices();
  } 

  //Get all records of client devices..
  getClientDevices(){
    this.service.getData("devices/getAll").subscribe(response=>{
      if(response.type=="tokenError"){
           localStorage.setItem('token',"");
           this.router.navigate(['login']);
       }
       else{
         this.clientDevicesInfoData = response;
         this.dtTrigger.next();
       }
     });
  }

  //Edit client device functionality...
  editClientDevice(id){
    this.router.navigate(['devices/add-client', id]);
  }

}
