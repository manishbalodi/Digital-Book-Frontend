import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupDetails } from '../model/signupDetails.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http : HttpClient) { }

  userRegister(registerDetail : SignupDetails){
    return this.http.post("http://localhost:8082/api/v1/digitalbooks/users/register",registerDetail);
  }
}
