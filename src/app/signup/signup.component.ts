import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupDetails } from '../model/signupDetails.model';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrationFormData!: FormGroup;
  anyIssue : boolean=false;

  constructor(private signupService:SignupService) {
    this.registrationFormData = new FormGroup({
      'userName' : new FormControl('',Validators.required),
      'userFirstName' : new FormControl('',Validators.required),
      'userLastName' : new FormControl('',Validators.required),
      'userPassword' : new FormControl('',Validators.required),
      'role' : new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    let detailsData : SignupDetails = {
      "userName": this.registrationFormData.value.userName,
      "userPassword": this.registrationFormData.value.userPassword,
      "userFirstName": this.registrationFormData.value.userFirstName,
      "userLastname": this.registrationFormData.value.userLastName,
      "role": [{
        "roleName" : this.registrationFormData.value.role
      }]
    }
    this.signupService.userRegister(detailsData)
    .subscribe({
      next: (res: any) => {
          this.anyIssue=false;
      },
      error: (err: any) => {
        console.log(err);
        this.anyIssue=true;
      }
    });
    this.registrationFormData.reset();
  }


}
