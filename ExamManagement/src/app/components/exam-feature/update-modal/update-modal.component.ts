import {Component, OnInit} from '@angular/core';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {SemesterService} from '../../../services/semester.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {UserService} from '../../../services/user.service';
import {ExamService} from '../../../services/exam.service';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {
  form: FormGroup;
  data: any;
  type: string;
  returnDt: any;
  submitted = false;
  lecturers = [];
  setting = {
    singleSelection: true,
    idField: 'Code',
    textField: 'Email',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  constructor(public modalRef: BsModalRef, private fb: FormBuilder,
              private examSV: ExamService,
              private semesterSV: SemesterService, private userSV: UserService) {
  }

  ngOnInit() {
    this.loadLecturers();
  }

  mapLecturer(l) {
    let lecturer = null;
    this.lecturers.map(el => {
      if (el.Email === l) {
        lecturer = el;
      }
    });
    return lecturer ? [lecturer] : '';
  }

  loadLecturers() {
    this.userSV.getLecturers().subscribe((el: any) => {
      this.lecturers = JSON.parse(el);
      if (!this.form) {
        this.form = this.fb.group({
          id: new FormControl(this.data.id ? this.data.id : -1, Validators.required),
          approver: new FormControl(this.data.approver ? this.mapLecturer(this.data.approver) : '', Validators.required),
          startTime: new FormControl(this.data.startTime
            ? moment(this.data.startTime, 'YYYY-MM-DDTHH:mm:ssZ').toDate() : new Date(), Validators.required),
          endTime: new FormControl(this.data.endTime
            ? moment(this.data.endTime, 'YYYY-MM-DDTHH:mm:ssZ').toDate() : new Date(), Validators.required),
        });
      }
    }, er => console.log(er));
  }

  submit(form) {
    this.submitted = true;
    if (form.valid) {
      const data = {
        id: this.form.value.id,
        approver: this.form.value.approver[0].Email,
        startTime: moment(this.form.value.startTime._d).format('YYYY-MM-DDTHH:mm:ssZ'),
        endTime: moment(this.form.value.endTime._d).format('YYYY-MM-DDTHH:mm:ssZ'),
      };
      this.examSV.updateBaseTest(data).subscribe(el => {
        swal('Success', 'Update Successful', 'success');
        this.returnDt = {
          success: true
        };
        this.modalRef.hide();
      }, er => swal('Error', 'Some errors has occurred', 'error'));
    }
  }
}
