import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParserService} from '../../../../services/parser.service';

@Component({
  selector: 'Mex-lo-modal',
  templateUrl: './lo-modal.component.html',
  styleUrls: ['./lo-modal.component.scss']
})
export class LoModalComponent implements OnInit {
  form: FormGroup;
  data: any;
  type: string;
  returnDt: any;
  submitted = false;

  constructor(public modalRef: BsModalRef, private fb: FormBuilder, private parserSV: ParserService) {
  }

  ngOnInit() {
    console.log(this.data);
    this.type = this.data ? 'Edit' : 'Create';
    this.form = this.fb.group({
      name: new FormControl(this.data ? this.data.name : '', Validators.required),
      order: new FormControl(this.data ? this.data.order : -1),
      id: new FormControl(this.data ? this.data.id : this.parserSV.guidGenerator()),
      state: new FormControl(this.data ? this.data.state : 1),
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
