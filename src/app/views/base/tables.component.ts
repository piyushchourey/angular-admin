import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';


@Component({
  templateUrl: 'tables.component.html',
  styleUrls: ['tables.component.css']
})
export class TablesComponent implements OnInit {
  @ViewChild('primaryModal', {static: false}) public primaryModal: ModalDirective;
  dtOptions: DataTables.Settings = {};
  systemInfoData:any = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private service: CommonService,
    public router: Router,
    public toastr : ToastrService
  ) {
      
   }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getUser();
  } 

 
  getUser(){
    this.service.getData("users/getAll").subscribe(response=>{
      if(response.type=="tokenError"){
           localStorage.setItem('token',"");
           this.router.navigate(['login']);
       }
       else{
         this.systemInfoData = response;
         this.dtTrigger.next();
       }
     });
  }

  editUser(userId){
    console.log('edit'+userId);
    this.router.navigate(['user/add/', userId]);
  }
  deleteUser(userId){ 
    // this.primaryModal.show();
    if(userId){
      let param = {"_id":userId}; 
      this.service.postData("users/delete",param).subscribe(response=>{
        let result:any=response;
        if(result.type=="error"){
          this.toastr.warning(result.msg,'Sorry!');
         }
         else{
          this.toastr.success(result.msg,'Success!');
           console.log(result.data);
         }
       });
    }else{
      this.toastr.error('Something went wrong.','Sorry!');
      this.getUser();
    }
  }
  
}
