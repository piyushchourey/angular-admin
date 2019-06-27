import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Route, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bulk-component',
  templateUrl: './bulk-component.component.html'
})
export class BulkComponentComponent implements OnInit {
  selectedFile: File;
  uploadBtnDisable = true;
  systemInfoData:any = [];
  constructor(
      private service: CommonService,
      public router: Router) { }

  ngOnInit() {
  }

  onFileChanged(event: any) {
    let fileName = event.target.files[0].name;
    let extn = fileName.split(".").pop();
    var checkimg = extn.toLowerCase();
    if(event.target.files.length && (/(\xlsx|\xls)$/i.test(checkimg))){
      this.selectedFile = event.target.files[0];
      this.uploadBtnDisable = false;
    }
    else{
      console.log('Please Import xlsx or xls file.', 'Sorry!!');
    }
  }

  onUpload() {
    
    const _formData = new FormData();
    _formData.append('file', this.selectedFile);
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    this.service.postData('author/upload', _formData, header).subscribe(
      response=>{
        console.log(this.selectedFile);
        let result:any=response;
        if(result.type=="fail"){
          console.log(result.msg, 'Sorry!!');
        }
        else if(result.type=="tokenError"){
          console.log(result.msg, 'Sorry!!');
          this.router.navigate(['login']);
        }
        else{
          this.systemInfoData = result.data;
        }
      }, 
      (error :Response)=>{
          console.log(error);
      });
  } 

}
