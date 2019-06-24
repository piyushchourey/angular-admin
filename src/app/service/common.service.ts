import { Injectable } from '@angular/core';
import { HttpClient,HttpParams ,HttpHeaders } from '@angular/common/http';
import {Observable, throwError, timer} from 'rxjs';
import {catchError, retry , map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';

const URL = 'http://localhost/imsApi/api/checkExist';
const IPADRESSCHECKURL = 'http://localhost/imsApi/api/ipAdressCheckExist';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLogin:any = false;
  private baseUrl = 'http://localhost:8081/';
  //API URL's

  private postUrl:string;

   public constructor(
      public http: HttpClient,
      public _router: Router,
      public spinner: NgxSpinnerService) {
  }
  
  getToken() { 
    return (localStorage.getItem('token')!=null && localStorage.getItem('token')!="") ? true : false;
  }

  getData(postUrl):Observable<any>
  {
    // let params = new HttpParams().set('tableName', 'systemconfiguration');
    return this.http.get(this.baseUrl+postUrl);
  }

  postData(url,data,header:any=''){
    this.spinner.show();
    let loginUrl = this.baseUrl+url;
    // let loginUrl = url;

   return this.http.post(loginUrl,data,header);
  }
  logout() {
    localStorage.removeItem("token");
    this._router.navigate(['/login']);
  }
  //Uniqueness..
  userValidator(elementType): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value,elementType)
        .pipe(
          map(res => {
            // if username is already taken
            if (res.length > 0) {
              // return error
              return { 'userNameExists': true};
            }
          })
        );
    };
  }

  searchUser(text,elementType) {
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          if(elementType=="user")
            return this.http.get<any>(`${URL}?username=${text}`)
          else
          return this.http.get<any>(`${IPADRESSCHECKURL}?ipAddress=${text}`)
        })
      );
  }
  //Uniqueness..  
} 