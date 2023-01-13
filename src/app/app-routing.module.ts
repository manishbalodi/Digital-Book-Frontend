import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddbookComponent } from "./addbook/addbook.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { SignupComponent } from "./signup/signup.component";
import { SubscribedBookComponent } from "./subscribed-book/subscribed-book.component";

const routes: Routes = [
    {path:'login',component : LoginComponent},
    {path:'logout',component : LogoutComponent},
    {path:'dashboard',component : HomeComponent},
    {path:'signup',component : SignupComponent},
    {path:'addBook',component : AddbookComponent},
    {path:'subscribedBooks',component : SubscribedBookComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {

   }