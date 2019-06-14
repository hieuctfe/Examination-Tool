import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {SemesterService} from '../../../services/semester.service';
import {SemesterModalComponent} from '../semester-modal/semester-modal.component';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  code: any;
  semesters: any[];

  constructor(private semesterSV: SemesterService, private messageSV: MessageService) {
  }

  ngOnInit() {
    this.loadSemester(null);
  }

  loadSemester(callback) {
    this.semesterSV.getAllSemester().subscribe((el: any[]) => {
      console.log(el);
      this.semesters = el;
      if (callback) {
        callback();
      }
    }, er => console.log(er));
  }

  showModal(type, data) {
    const config = {
      initialState: {
        data: data ? data : {},
        type: type,
        returnDt: {}
      }
    };
    this.messageSV.createModal(data, SemesterModalComponent, config).subscribe((value: any) => {
      if (value.success) {
        this.loadSemester(() => {
          swal(
            'Success',
            'Semester has been added',
            'success'
          );
        });
      }
    });
  }

  confirm(q) {
    if (q) {
      swal({
        title: 'Delete ' + q.code,
        text: 'You won\'t be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.semesterSV.deleteSemester(q.code).subscribe(() => {
            this.loadSemester(() => {
              swal({
                type: 'success',
                title: 'Success',
                text: q.code + ' has been deleted',
              });
            });
          }, () => {
            swal({
              type: 'error',
              title: 'Error',
              text: 'Cannot delete Semester now',
            });
          });
        }
      });
    }
  }

}
