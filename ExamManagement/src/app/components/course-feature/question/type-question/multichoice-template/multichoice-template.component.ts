import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalVariable} from '../../../../../global';
import {QuestionMultipleChoice} from '../../../../../model/question-multichoice.model';
import {BsModalRef} from 'ngx-bootstrap';
import {Chapter} from '../../../../../model/chapter.model';
import {LearningOutcome} from '../../../../../model/LO.model';
import {LevelModel} from '../../../../../model/level.model';
import {ParserService} from '../../../../../services/parser.service';

@Component({
  selector: 'Mex-multichoice-template',
  templateUrl: './multichoice-template.component.html',
  styleUrls: ['./multichoice-template.component.scss']
})
export class MultichoiceTemplateComponent implements OnInit {
  @Input() data: QuestionMultipleChoice;
  @Input() chapter: Array<Chapter>;
  @Input() lo: Array<LearningOutcome>;
  @Input() level: Array<LevelModel>;
  @Output() action = new EventEmitter();
  form: FormGroup;
  options: FormArray;
  GlobalVariable: any;
  submitted = false;
  config = {
    tabsize: 2,
    insertText: this.data ? this.data.content : '',
    toolbar: [
      // [groupName, [list of button]]
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['picture']
    ],
    popover: {
      image: [
        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
    },
  };

  dropdownSetting = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true,
  };

  constructor(private formBuilder: FormBuilder, public modalRef: BsModalRef, private parserSV: ParserService) {
    this.GlobalVariable = GlobalVariable;
  }

  ngOnInit() {
    const dataArray = [];
    if (Object.keys(this.data).length > 0) {
      this.data.options.forEach(el => (dataArray.push(this.createItem(el))));
    } else {
      dataArray.push(this.createItem(null));
    }
    console.log(this.data);
    this.form = this.formBuilder.group({
      code: new FormControl(this.data.code ? this.data.code : this.parserSV.guidGenerator()),
      content: new FormControl(this.data.content, Validators.required),
      options: this.formBuilder.array(dataArray, [OptionsValidation.OptionsChecked, OptionsValidation.PercentChecked]),
      level: new FormControl(this.data.level, Validators.required),
      learningOutcomes: new FormControl(Object.keys(this.data).length > 0 ? this.mappingLearningOutcome() : []),
      mark: new FormControl(this.data.mark, Validators.required),
      chapters: new FormControl(Object.keys(this.data).length > 0 ? this.mappingChapter() : [], Validators.required),
      type: new FormControl(1)
    });

  }

  get formData() {
    return <FormArray> this.form.get('options');
  }

  mappingChapter() {
    const contain_chapters = [];
    this.data.chapters.forEach(el => {
      const index = this.findOrder(this.chapter, el);
      if (index === -1) {
        return;
      }
      contain_chapters.push(this.chapter[index]);
    });
    return contain_chapters;
  }

  mappingLearningOutcome() {
    const contain_lo = [];
    this.data.learningOutcomes.forEach(el => {
      const index = this.findOrder(this.lo, el);
      if (index === -1) {
        return;
      }
      contain_lo.push(this.lo[index]);
    });
    return contain_lo;
  }

  findOrder(array, order) {
    return array.map(el => Number.parseInt(el.order)).indexOf(Number.parseInt(order));
  }

  createItem(data): FormGroup {
    if (!data) {
      data = {
        content: '',
        percent: 0,
        isCorrect: false
      };
    }
    if (!this.form) {
      return this.formBuilder.group({
        content: new FormControl(data.content, Validators.required),
        percent: data.percent,
        isCorrect: data.isCorrect
      });
    }
    this.options = this.form.get('options') as FormArray;
    if (this.options.length < 2) {
      return this.formBuilder.group({
        content: new FormControl(data.content, Validators.required),
        percent: data.percent,
        isCorrect: data.isCorrect,
      });
    }
    return this.formBuilder.group({
      content: data.content,
      percent: data.percent,
      isCorrect: data.isCorrect,
    });
  }

  removeItem(i: number) {
    this.options = this.form.get('options') as FormArray;
    this.options.removeAt(i);
  }

  addItem(): void {
    this.options = this.form.get('options') as FormArray;
    if (this.options.length < 6) {
      this.options.push(this.createItem(null));
    }
  }

  submit(form) {
    this.submitted = true;
    if (form.valid && (this.form.get('options') as FormArray).length >= 2) {
      const value = Object.assign({}, form.value);
      const chapters = value.chapters.map(el => this.chapter.filter(m => m.id === el.id)[0])
        .map(el => el.order);
      const los = value.learningOutcomes.map(el => this.lo.filter(m => m.id === el.id)[0])
        .map(el => el.order);
      let question = value;
      question.chapters = chapters;
      question.learningOutcomes = los;
      question = this.parserSV.changeType(question);
      this.action.emit(question);
      return;
    }
  }

  setModal(value, index = null) {
    if (value && value !== '') {
      if (index !== null) {
        ((this.form.get('options') as FormArray).controls[index] as FormArray).controls['content'].setValue(value);
      } else {
        this.form.get('content').setValue(value);
      }
    }
  }

}

export class OptionsValidation {

  static OptionsChecked(AC: AbstractControl) {
    const options = AC.value;
    const result = options.filter(el => el.isCorrect === true);
    return (result.length >= 1 && options.length >= 2) ? null : {'OptionsChecked': true};
  }

  static PercentChecked(AC: AbstractControl) {
    const options = AC.value;
    const true_answer = options.filter(el => el.isCorrect === true);
    const total = Math.round(true_answer.reduce((t, el) => {
      return t += el.percent;
    }, 0) * 100) / 100;
    return (total === 100 || total === 0) ? null : {'PercentChecked': true};
  }
}

