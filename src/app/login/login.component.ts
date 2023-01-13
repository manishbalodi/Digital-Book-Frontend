import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetails } from '../model/loginDetails.model';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormData!: FormGroup;
  areDetailsFine : boolean = true;

  constructor(private loginService : LoginService,private router :Router) { 
    this.loginFormData = new FormGroup({
      'userName' : new FormControl('',Validators.required),
      'userPassword' : new FormControl('',Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //console.log(this.addDataForm);
    let detailsData : LoginDetails = {
      "userName" : this.loginFormData.value.userName,
      "userPassword" : this.loginFormData.value.userPassword
    }
    this.loginService.userLogin(detailsData).subscribe({
      next: (res: any) => {
        sessionStorage.setItem("userName",res.userName);
        sessionStorage.setItem("jwtToken",res.jwtToken);
        this.areDetailsFine = true;
        this.router.navigate(["/","dashboard"]);
    },
    error: (err: any) => {
      this.areDetailsFine = false;
      this.loginFormData.reset();
    }
    });
    // this.areDetailsFine = 
    // this.loginService.userLogin(detailsData).then(value =>{
    //   this.areDetailsFine = value;
    // });
    // setTimeout(() => {
    //   if(sessionStorage.getItem("jwtToken") !== null){
    //     this.router.navigate(["/","dashboard"]);
    //     this.areDetailsFine=true;
    //   }else{
    //     this.areDetailsFine=false;
    //   }
    //   this.loginFormData.reset();
    // }, 500);
    
  }

}
