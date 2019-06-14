import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DepartmentService} from '../../../services/department.service';
import {CourseService} from '../../../services/course.service';
import {Route, Router} from '@angular/router';
import 'rxjs/add/operator/map'
import {Observable} from 'rxjs';
import {MessageService} from '../../../services/message.service';
import {ModalCourseComponent} from '../modal-course/modal-course.component';
import {Course} from '../../../model/course.model';
import swal from 'sweetalert2';
import {UserService} from '../../../services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'Mex-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

export class CourseComponent implements OnInit {
  departments: Observable<any[]>;
  parsedData: Observable<any[]>;
  expandList = [];
  course = null;
  user: any;
  searchText = '';

  constructor(private departSV: DepartmentService,
              private courseSV: CourseService,
              private messageSV: MessageService,
              private router: Router, private userSV: UserService) {
  }

  async ngOnInit() {
    this.userSV.getUser.subscribe(el => {
      this.user = el;
    });
    this.loadDepartment();
  }

  loadDepartment() {
    this.departments = this.departSV.getAllDepartment().pipe(map((response: any) => {
      return response;
    }));
  }

  loadCourse = (data) => this.courseSV.getCourseByDepartment(data.code).pipe(map((response: any) => {
    response = response.map(el => {
      return {
        code: el.code,
        name: el.name,
        department: el.department,
        child: true
      };
    });
    return response;
  }));

  setCourse(source) {
    if (source.originalEvent.target.classList[0].indexOf('ion') === -1) {
      if (source.item.dataItem && source.item.dataItem.child) {
        if (this.user && (this.user.roles.indexOf('Leader') !== -1 || this.user.roles.indexOf('Lecturer') !== -1)) {
          this.course = source.item.dataItem;
          this.router.navigateByUrl('View/Course/Manage/' + source.item.dataItem.code);
        }
      } else {
        if (this.expandList.indexOf(source.item.index) !== -1) {
          const index = this.expandList.indexOf(source.item.index);
          this.expandList.splice(index, 1);
        } else {
          this.expandList.push(source.item.index);
        }
      }
    }
  }


  hasCourse(item: any) {
    return 'name' in item;
  }

  showModal(source, code) {
    this.messageSV.createModal(source, ModalCourseComponent, {
      initialState: {
        data: source ? source : new Course().deserialize({department: code, code: '', name: ''}),
        type: source ? 'edit' : 'create',
        returnDt: null
      }
    }).subscribe((rs: any) => {
      if (rs) {
        swal('Sucess', rs, 'success');
        this.loadDepartment();
      }
    });
  }

  delete(source) {
    swal({
      title: 'Are you sure?',
      text: 'Course ' + source.code + ' will be deleted!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'btn btn-info',
      cancelButtonClass: 'btn'
    }).then(result => {
      if (result.value) {
        this.courseSV.delete(source.code).subscribe(sc => {
          swal(
            'Deleted!',
            'Question has been deleted',
            'success'
          );
          this.loadDepartment();
        }, er => {
          swal(
            'Error',
            'Some error has occurred',
            'error'
          );
        });
      }
    });
  }
}
