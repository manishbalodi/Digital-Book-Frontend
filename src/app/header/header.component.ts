import { Component, DoCheck, OnInit } from '@angular/core';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,DoCheck {

  isUserLoggedIn: boolean = false; 
  isUserReader:boolean =false;
  isUserWriter:boolean =false;

  constructor(private jwtService:JwtService) { }

  ngOnInit() {
    let accessToken = sessionStorage.getItem('jwtToken');
    if(accessToken){
    let accessToken = sessionStorage.getItem('jwtToken');
    if(this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'READER'){
      this.isUserReader=true;
      this.isUserWriter=false;
      }
      if(this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'AUTHOR'){
        this.isUserWriter=true;
        this.isUserReader=false;
        }
      this.isUserLoggedIn = true;
    }else{
      this.isUserLoggedIn = false;
      this.isUserReader=false;
      this.isUserWriter=false;

    }
    console.log(this.isUserReader);
  }

  ngDoCheck(){
    let accessToken = sessionStorage.getItem('jwtToken');
    if(accessToken){
    let accessToken = sessionStorage.getItem('jwtToken');
    if(this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'READER'){
      this.isUserReader=true;
      this.isUserWriter=false;
      }
      if(this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'AUTHOR'){
        this.isUserWriter=true;
        this.isUserReader=false;
        }
      this.isUserLoggedIn = true;
    }else{
      this.isUserLoggedIn = false;
      this.isUserReader=false;
      this.isUserWriter=false;

    }
  }

}
