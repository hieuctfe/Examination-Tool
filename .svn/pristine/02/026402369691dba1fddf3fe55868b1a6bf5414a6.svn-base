import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../../../global';

@Component({
  selector: 'Mex-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.scss']
})
export class SemesterComponent implements OnInit {
  listSemester: any;
  // @ts-ignore
  url: any;

  constructor(private _router: Router, private http: HttpClient) {
    this.url = GlobalVariable.BASE_API;
    const that = this;
    this.http.get(that.url + '/Semester/GetAll').subscribe((data) => {
      console.log(data);
      that.listSemester = data;
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
