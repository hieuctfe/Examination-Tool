import {Component, OnInit} from '@angular/core';
import {Course} from '../../../model/course.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap';
import {CourseService} from '../../../services/course.service';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-modal-course',
  templateUrl: './modal-course.component.html',
  styleUrls: ['./modal-course.component.scss']
})
export class ModalCourseComponent implements OnInit {
  data: Course;
  type: string;
  returnDt: any | Course;
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, public modalRef: BsModalRef, private courseSV: CourseService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      code: new FormControl(this.data.code, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
      department: new FormControl(this.data.department, Validators.required),
    });
  }

  submit(form) {
    this.submitted = true;
    if (form.valid) {
      if (this.type === 'edit') {
        this.courseSV.updateCourse(form.value).subscribe(el => {
          this.returnDt = 'Updated Successfully';
          this.modalRef.hide();
        }, el => {
          this.showError();
        });
      } else {
        this.courseSV.createCourse(form.value).subscribe(el => {
          this.returnDt = 'Create Successfully';
          this.modalRef.hide();
        }, el => {
          this.showError();
        });
      }
    }
  }


  showError() {
    swal('error', 'Please try again later!', 'error');
  }
}
