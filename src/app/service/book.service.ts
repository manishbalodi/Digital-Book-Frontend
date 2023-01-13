import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBook } from '../model/addBook.model';
import { BookDetails } from '../model/bookDetails.model';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList: BookDetails[] | any;

  constructor(private http:HttpClient) { }

  getAllActiveBooks() {
    return this.http.get("http://localhost:8082/api/v1/digitalbooks/users/allActiveBooks");
  }

  addNewBook(addBook:AddBook){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.post("http://localhost:8082/api/v1/digitalbooks/users/author/createBook",addBook,{ 'headers': headers });
  }

  getAllSubscribedBooks(userName:string) {
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.get("http://localhost:8082/api/v1/digitalbooks/users/reader/getSubscribedBooks?userName="+userName,{ 'headers': headers });
  }

  unSubscribeBook(userName:string,bookId:number){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.post("http://localhost:8082/api/v1/digitalbooks/users/reader/unsubscribeBook?bookId="+bookId+"&userName="+userName,null,{ 'headers': headers });
  }

  subscribeBook(userName:any,bookId:number){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.get("http://localhost:8082/api/v1/digitalbooks/users/reader/subscribeBook?bookId="+bookId+"&userName="+userName,{ 'headers': headers });
  }

  getWrittenBooks(userName:any){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.get("http://localhost:8082/api/v1/digitalbooks/users/author/books?userName="+userName,{ 'headers': headers });
  }

  deleteBook(userName:any,bookId:number){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.delete("http://localhost:8082/api/v1/digitalbooks/users/author/deleteBook?bookId="+bookId+"&userName="+userName,{ 'headers': headers });
  }

  toggleStatus(userName:any,bookId:number){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + sessionStorage.getItem("jwtToken"));
    return this.http.put("http://localhost:8082/api/v1/digitalbooks/users/author/toggleLock?userName="+userName+"&bookId="+bookId,null,{ 'headers': headers });
  }
}
