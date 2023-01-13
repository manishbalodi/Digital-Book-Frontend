import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookDetails } from '../model/bookDetails.model';
import { BookService } from '../service/book.service';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bookList!: BookDetails[];
  isUserAuthor : boolean =false;

  constructor(private bookService:BookService,private router :Router,private jwtService:JwtService) { }

  ngOnInit(): void {
    if((sessionStorage.getItem("userName") ===null) || (this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'READER')){
    this.bookService.getAllActiveBooks()
    .subscribe({
      next: (res: any) => {
          this.bookList = res;
          console.log(this.bookList);
      },
      error: (err: any) => {
        console.log(err);
        localStorage.clear();
        this.router.navigate(["/login"])
      }
    });
  }
  if(this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'AUTHOR'){
    this.isUserAuthor=true;
    this.bookService.getWrittenBooks(sessionStorage.getItem("userName"))
    .subscribe({
      next: (res: any) => {
          this.bookList = res;
          console.log(this.bookList);
      },
      error: (err: any) => {
        console.log(err);
        localStorage.clear();
        this.router.navigate(["/login"])
      }
    });
  }
}

// ngDoCheck(){
//   if((sessionStorage.getItem("userName") ===null) || (this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'READER')){
//     this.bookService.getAllActiveBooks()
//     .subscribe({
//       next: (res: any) => {
//           this.bookList = res;
//           console.log(this.bookList);
//       },
//       error: (err: any) => {
//         console.log(err);
//         localStorage.clear();
//         this.router.navigate(["/login"])
//       }
//     });
//   }
//   if(this.jwtService.decodeToken(sessionStorage.getItem("jwtToken")).role[0].roleName === 'AUTHOR'){
//     this.isUserAuthor=true;
//     this.bookService.getWrittenBooks(sessionStorage.getItem("userName"))
//     .subscribe({
//       next: (res: any) => {
//           this.bookList = res;
//           console.log(this.bookList);
//       },
//       error: (err: any) => {
//         console.log(err);
//         localStorage.clear();
//         this.router.navigate(["/login"])
//       }
//     });
//   }
// }

  subscribeBook(book :BookDetails){
    if(sessionStorage.getItem("userName")==null){
      this.router.navigate(["/login"])
    }
    this.bookService.subscribeBook(sessionStorage.getItem("userName"),book.bookId)
    .subscribe({
      next: (res: any) => {
          console.log(res);

      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  deleteBook(book :BookDetails){
    if(sessionStorage.getItem("userName")==null){
      this.router.navigate(["/login"])
    }
    this.bookService.deleteBook(sessionStorage.getItem("userName"),book.bookId)
    .subscribe({
      next: (res: any) => {
          console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        alert("Book not deleted , as subscribed by someone")
      }
    });
  }

  reloadCurrentRoute() {
    console.log("inside alien");
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  toggleStatus(book :BookDetails){
    this.bookService.toggleStatus(sessionStorage.getItem("userName"),book.bookId)
    .subscribe({
      next: (res: any) => {
          console.log(res);
          // this.router.navigate(["/dashboard"])
      },
      error: (err: any) => {
        console.log(err);
      }
    });
    this.reloadCurrentRoute();
  }


}
