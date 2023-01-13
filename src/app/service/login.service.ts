import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../model/loginDetails.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  // async 
  userLogin(loginDetail : LoginDetails){
    // let areDetailsFine : boolean = false;
    // await 
    return this.http.post("http://localhost:8082/api/v1/digitalbooks/users/login",loginDetail);
    // .subscribe((responseData:any) =>{
    //   sessionStorage.setItem("userName",responseData.userName);
    //   sessionStorage.setItem("jwtToken",responseData.jwtToken);
    //   areDetailsFine=true;
    //   });
    // .toPromise().then((responseData:any) =>{
    //   console.log(responseData);
    //   sessionStorage.setItem("userName",responseData.userName);
    //   sessionStorage.setItem("jwtToken",responseData.jwtToken);
    // });
    // if (sessionStorage.getItem("username") !== null) {
    //   areDetailsFine=true;
    // }
    // return areDetailsFine;
  }
}
