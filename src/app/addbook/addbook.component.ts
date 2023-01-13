import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddBook } from '../model/addBook.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  addBookData!: FormGroup;

  constructor(private bookService:BookService,private router :Router) {
    this.addBookData = new FormGroup({
      'bookLogo' : new FormControl('',Validators.required),
      'bookTitle' : new FormControl('',Validators.required),
      'bookCategory' : new FormControl('',Validators.required),
      'bookPrice' : new FormControl('',Validators.required),
      // 'bookAuthorUserName' : new FormControl('',Validators.required),
      'bookAuthor' : new FormControl('',Validators.required),
      'bookPublisher' : new FormControl('',Validators.required),
      'content' : new FormControl('',Validators.required),
    });
   }

  ngOnInit(): void {
    if(sessionStorage.getItem("userName")==null){
      this.router.navigate(["/","login"]);
    }
  }

  onSubmit(){
    //console.log(this.addDataForm);
    let detailsData : AddBook = {
      bookId: 0,
      bookLogo: this.addBookData.value.bookLogo,
      bookTitle: this.addBookData.value.bookTitle,
      bookCategory: this.addBookData.value.bookCategory,
      bookPrice: this.addBookData.value.bookPrice,
      bookAuthorUserName: sessionStorage.getItem("userName"),
      bookAuthor: this.addBookData.value.bookAuthor,
      bookPublisher: this.addBookData.value.bookPublisher,
      bookPublishedDate: new Date().toJSON().slice(0, 10),
      bookActive: true,
      content: this.addBookData.value.content,
    }
    this.bookService.addNewBook(detailsData).subscribe({
      next: (res: any) => {
        // this.areDetailsFine = true;
        // this.router.navigate(["/","dashboard"]);
        console.log(res);
    },
    error: (err: any) => {
      console.log(err);
    }
    });
  }
}
