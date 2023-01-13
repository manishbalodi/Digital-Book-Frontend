import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookDetails } from '../model/bookDetails.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-subscribed-book',
  templateUrl: './subscribed-book.component.html',
  styleUrls: ['./subscribed-book.component.css']
})
export class SubscribedBookComponent implements OnInit {

  userName : any = sessionStorage.getItem("userName");
  bookList!: BookDetails[];

  constructor(private bookService:BookService,private router :Router) { }

  ngOnInit(): void {
    this.bookService.getAllSubscribedBooks(this.userName)
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

  unSubscribeBook(book:BookDetails){
    this.bookService.unSubscribeBook(this.userName,book.bookId)
    .subscribe({
      next: (res: any) => {
          console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        alert("can't unsubscribe on the same day you subscribed");
      }
    });
  }

}
