import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {GlobalVariable} from '../../../../global';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ExamService} from '../../../../services/exam.service';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-do-test',
  templateUrl: './do-test.component.html',
  styleUrls: ['./do-test.component.scss']
})
export class DoTestComponent implements OnInit, OnDestroy {
  @Input() baseTest: any;
  @Output() baseTestChange = new EventEmitter();
  form: FormGroup;
  GlobalVariable = GlobalVariable;
  timer = '00 : 00 : 00';
  redTime = false;
  timeout = false;
  interval: any;

  constructor(private fb: FormBuilder, private examSV: ExamService) {
  }

  ngOnInit() {
    this.counter();
    const controls = {};
    this.baseTest.questions.forEach(el => {
      if (el.typeId === 4) {
        controls[el.questionCode] = this.fb.control(null);
      } else {
        const data = {};
        el.options.forEach(x => {
          data[x.id] = this.fb.control(false);
        });
        controls[el.questionCode] = this.fb.group(data);
      }
    });
    this.form = this.fb.group(controls);
    console.log(this.form);
  }

  counter() {
    if (this.baseTest) {
      const date = moment(this.baseTest.duration, 'hh:mm:ss') as any;
      this.redTime = false;
      let time = date._date.getHours() * 3600 + date._date.getMinutes() * 60;
      // let time = 13;
      this.interval = setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 3600) / 60);
        const seconds = time % 60;

        this.timer = (hours < 10 ? '0' + hours : hours) + ' : ' +
          (minutes < 10 ? '0' + minutes : minutes) + ' : ' +
          (seconds < 10 ? '0' + seconds : seconds);
        if (time <= 10) {
          this.redTime = true;
        }
        if (--time < 0) {
          clearInterval(this.interval);
          this.submit(this.form.value);
        }
        console.log(time);
      }, 1000);
    }
  }

  submit(form) {
    this.timeout = true;
    if (form) {
      let data = {
        examId: this.baseTest.id,
        examAs: []
      };
      data = this.parseData(form, data);
      this.examSV.submitReviewExam(data).subscribe(el => {
        this.baseTestChange.emit();
      }, er => {
        swal('Error', 'Please try again !!!', 'error');
      });
    }
  }

  parseData(form, data) {
    for (const k in form) {
      if (form.hasOwnProperty(k)) {
        const obj = {};
        if (typeof form[k] === 'object') {
          const answers = [];
          for (const x in form[k]) {
            if (form[k].hasOwnProperty(x)) {
              if (form[k][x] === true) {
                answers.push(Number.parseInt(x));
              }
            }
          }
          data.examAs.push({
            questionCode: k,
            answers: answers
          });
        } else {
          data.examAs.push({
            questionCode: k,
            answers: [(form[k])]
          });
        }
      }
    }
    return data;
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
