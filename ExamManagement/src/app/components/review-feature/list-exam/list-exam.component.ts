import { Component, OnInit } from '@angular/core';
import {GlobalVariable} from '../../../global';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import {SignalR} from 'ng2-signalr';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'Mex-list-exam',
  templateUrl: './list-exam.component.html',
  styleUrls: ['./list-exam.component.scss']
})
export class ListExamComponent implements OnInit {
  id = '';
  url = GlobalVariable.BASE_API;
  dtOptions: DataTables.Settings = {};
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const that = this;
    this.id = this.route.snapshot.paramMap.get('CourseId');
    // @ts-ignore
    // @ts-ignore
    this.dtOptions = {
      ajax: {
        url: that.url + '/api/Test?testId=' + this.id,
        dataSrc: '',
      },
      ordering: true,
      order: [[ 1, 'asc' ]],
      columns: [{
        title: 'Student Code',
        data: 'studentCode'
      }, {
        title: 'Student Name',
        data: 'studentName',
      }, {
        title: 'Mark',
        data: 'studentMark',
        render: (data: any, type: any, row: any) => {
          console.log(row);
          return ((row.studentMark / row.maxMark) * 100).toFixed(2) + '%' ;
      }}],
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.router.navigate(['../../ExamDetail', data.testId], {relativeTo: this.route});
        });
        return row;
      },
      dom: 'Bfrtip',
      // @ts-ignore
      buttons: [
        'columnsToggle',
        'copy',
        'print',
        // {extend: 'excel', title: new Date().toDateString()},
        'excel',
        'pdf'
      ]
    };
  }


}
