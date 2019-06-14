import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalVariable} from '../../../global';

@Component({
  selector: 'Mex-subject',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  id = '';
  url = GlobalVariable.BASE_API;
  dtOptions: DataTables.Settings = {};

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const that = this;
    this.id = this.route.snapshot.paramMap.get('id');
    this.dtOptions = {
      ajax: {
        url: that.url + '/api/ExamsBySemester?semesterCode=' + that.id,
        dataSrc: '',
      },
      order: [[1, 'asc']],
      columns: [{
        title: 'Code',
        data: 'courseCode'
      }, {
        title: 'Subject Name',
        data: 'courseName'
      }, {
        title: 'Exam',
        data: 'examCode'
      }, {
        title: 'Date',
        type: 'datetime',
        data: 'testDate',
        render: (data: any, type: any, row: any) => {
          return new Date(data).toDateString();
        }
      }],
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.router.navigate(['../../ListExam', data.id], {relativeTo: this.route});
        });
        return row;
      }
    };
  }

}
