import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  userName : any = sessionStorage.getItem('userName');

  constructor(private router :Router) { }

  ngOnInit(): void {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("jwtToken");
    setTimeout(() => {
      this.router.navigate(["/","dashboard"]);
    }, 5000);
  }

}
