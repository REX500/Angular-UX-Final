import {Component} from '@angular/core';
import { PagerService } from './shared/_services/index'
import { OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: Http, private pagerService: PagerService) { }

  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    // get dummy data
    // this.http.get('./dummy-data.json')
    //   .map((response: Response) => response.json())
    //   .subscribe(data => {
    //     // set items to json response
    //     this.allItems = data;
    //
    //     // initialize to page 1
    //     this.setPage(1);
    //   });

    this.allItems = [{"name":"2"}];
    this.setPage(1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
