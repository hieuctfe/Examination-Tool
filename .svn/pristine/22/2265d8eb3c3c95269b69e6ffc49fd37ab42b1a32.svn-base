import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {SemesterService} from '../../../services/semester.service';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-semester-modal',
  templateUrl: './semester-modal.component.html',
  styleUrls: ['./semester-modal.component.scss'],
})
export class SemesterModalComponent implements OnInit {
  form: FormGroup;
  data: any;
  type: string;
  returnDt: any;
  submitted = false;

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private semesterSV: SemesterService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      code: new FormControl(this.data.code ? this.data.code : '', Validators.required),
      startDate: new FormControl(this.data.startDate
        ? moment(this.data.startDate, 'YYYY-MM-DDTHH:mm:ssZ').toDate() : new Date(), Validators.required),
      endDate: new FormControl(this.data.endDate
        ? moment(this.data.endDate, 'YYYY-MM-DDTHH:mm:ssZ').toDate() : new Date(), Validators.required),
    });
  }

  async submit(form) {
    this.submitted = true;
    if (form.valid) {
      const data = {
        code: this.form.value.code.toUpperCase(),
        startDate: moment(this.form.value.startDate._d).format('YYYY-MM-DDTHH:mm:ssZ'),
        endDate: moment(this.form.value.endDate._d).format('YYYY-MM-DDTHH:mm:ssZ'),
      };
      const result = await this.semesterSV.createSemester(data).then(() => true, () => false);
      if (result) {
        this.returnDt = {
          success: true
        };
        this.modalRef.hide();
      } else {
        swal({
          type: 'error',
          title: 'Error',
          text: 'Cannot create new Semester',
        });
      }
    }
  }
}
