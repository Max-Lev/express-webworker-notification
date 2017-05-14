
import { BooksService } from './services/books-service.service';
import { Component, OnInit,AfterViewInit } from '@angular/core';
//import { myworker } from './worker.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BooksService],

})
export class AppComponent implements OnInit,AfterViewInit {

 
  worker:Worker = new Worker('worker.js');

  constructor(private booksService: BooksService) {
    
  }
  ngOnInit() {
    this.booksService.getBooks();
  }

  ngAfterViewInit(){
  
      this.getWorkerMsg();
  }
  
  getWorkerMsg(){
    /*
  recieving msg from worker.js
  */
  this.worker.onmessage = function(e){
      console.log('on message');      
    }
  }

  /*
  posting msg to worker.js
  */
  onmessage() {
    this.worker.postMessage('worker init message');
  }


}
