import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../services/message.service';
import {SemesterService} from '../../../services/semester.service';
import swal from 'sweetalert2';
import {ExamcodeModalComponent} from '../examcode-modal/examcode-modal.component';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'Mex-create-exam-code',
  templateUrl: './create-exam-code.component.html',
  styleUrls: ['./create-exam-code.component.scss']
})
export class CreateExamCodeComponent implements OnInit {
  code: any;
  semester = ['All'];
  sizes = [
    10, 25, 50
  ];
  selectedSemester = ['All'];
  courseSetting = {
    singleSelection: true,
    idField: 'code',
    textField: 'code',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };
  config = {
    data: [],
    pageIndex: 1,
    pageSize: this.sizes[0],
    totalElement: 0
  };
  today = new Date();

  constructor(private semesterSV: SemesterService, private messageSV: MessageService) {
  }

  ngOnInit() {
    const combine = combineLatest(
      this.semesterSV.getAllSemester(),
      this.loadCode(null, this.config)
    );
    combine.subscribe((el: any) => {
      this.semester = this.semester.concat(el[0]);
      const paging = JSON.parse(el[1].headers.get('paging-header')) as any;
      this.config.data = el[1].body;
      this.config.pageSize = paging.pageSize;
      this.config.pageIndex = paging.pageIndex;
      this.config.totalElement = paging.totalElement;
    }, er => console.log(er));
  }

  loadCode(code, config) {
    return this.semesterSV.getAllExamCode(this.selectedSemester[0] == this.semester[0] ? '' : this.selectedSemester[0], config);
  }

  refreshData(code, config) {
    this.loadCode(code, config).subscribe((el: any) => {
      const paging = JSON.parse(el.headers.get('paging-header')) as any;
      const data = el.body.map((r: any) => this.compareDate(r)) as any;
      this.config.data = data;
      this.config.pageSize = paging.pageSize;
      this.config.pageIndex = paging.pageIndex;
      this.config.totalElement = paging.totalElement;
    });
  }

  showModal(exam) {
    if (exam) {
      this.semesterSV.getExam(exam.code).subscribe(el => {
        const config = {
          class: 'modal-lg max-size',
          initialState: {
            data: el,
            type: 'edit'
          }
        };
        this.messageSV.createModal(exam, ExamcodeModalComponent, config).subscribe((value: any) => {
          if (value && value.success) {
            swal(
              'Success',
              'Exam has been updated',
              'success'
            );
            this.refreshData(this.selectedSemester, this.config);
          }
        });
      });
    } else {
      const config = {
        class: 'modal-lg max-size',
        initialState: {
          data: null,
          type: 'create'
        }
      };
      this.messageSV.createModal(null, ExamcodeModalComponent, config).subscribe((value: any) => {
        if (value && value.success) {
          swal(
            'Success',
            'Exam has been created',
            'success'
          );
          this.refreshData(this.selectedSemester, this.config);
        }
      });
    }
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
          this.semesterSV.deleteExam(q.code).subscribe(() => {
            swal({
              type: 'success',
              title: 'Success',
              text: q.code + ' has been deleted',
            });
            this.refreshData(this.selectedSemester, this.config);
          }, () => {
            swal({
              type: 'error',
              title: 'Error',
              text: 'Cannot delete Exam Code',
            });
          });
        }
      });
    }
  }

  compareDate(object) {
    const startDate = Date.parse(object.startDate);
    if (startDate < this.today.getTime()) {
      object.outOfDate = 'out';
    } else {
      object.outOfDate = 'wait';
    }
    return object;
  }

  changeSize(size) {
    this.config.pageSize = size;
    this.refreshData(this.selectedSemester, this.config);
  }


  changeSemester(semester) {
    this.selectedSemester = ['' + semester];
    this.refreshData(this.selectedSemester, this.config);
  }


}
