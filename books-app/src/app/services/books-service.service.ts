import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class BooksService {

  constructor(private _http: Http) {

  }

  getBooks() {
    let url = 'http://localhost:8080/getBooks';
    this._http.get(url, {}).subscribe((data) => {
      console.log(data);
      return data;
    });
  }

}
