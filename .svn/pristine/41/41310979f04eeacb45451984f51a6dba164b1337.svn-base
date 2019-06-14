import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../../model/question.model';
import {GlobalVariable} from '../../../global';
import {ParserService} from '../../../services/parser.service';

@Component({
  selector: 'Mex-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() type: 'data' | 'question';
  @Input() isDescript = false;
  @Output() destroy: EventEmitter<any> = new EventEmitter();
  collapse = true;
  GlobalVariable = GlobalVariable;

  constructor(public parseSV: ParserService) {
  }

  ngOnInit() {
    if (this.question.options) {
      this.question.options = this.question.options.map(el => {
        return {
          isCorrect: el.isCorrect,
          content: this.parseSV.descript(el.content)
        };
      });
    }
  }

}
