import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'Mex-chapter-modal',
  templateUrl: './chapter-modal.component.html',
  styleUrls: ['./chapter-modal.component.scss']
})
export class ChapterModalComponent implements OnInit {
  form: FormGroup;
  data: any;
  type: string;
  returnDt: any;
  submitted = false;

  constructor(public modalRef: BsModalRef, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: new FormControl(this.data.id, Validators.required),
      order: new FormControl(this.data.order ? this.data.order : -1, Validators.required),
      name: new FormControl(this.data.name ? this.data.name : '', Validators.required),
      courseCode: new FormControl(this.data.courseCode, Validators.required),
      state: new FormControl(this.data.state, Validators.required),
    });
  }

  submit(form) {
    this.submitted = true;
    if (form.valid) {
      this.returnDt = {
        success: true,
        data: form.value
      };
      this.modalRef.hide();
    }
  }
}
