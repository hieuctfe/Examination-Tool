import {Component, Input, OnInit} from '@angular/core';
import {Exam} from '../../../model/exam.model';
import {Question} from '../../../model/question.model';
import {QuestionService} from '../../../services/question.service';
import {LevelService} from '../../../services/level.service';
import swal from 'sweetalert2';

@Component({
  selector: 'Mex-set-content-exam',
  templateUrl: './set-content-exam.component.html',
  styleUrls: ['./set-content-exam.component.scss']
})
export class SetContentExamComponent implements OnInit {
  @Input() exam: Exam;
  levels = [];
  config = {
    pageIndex: 1,
    pageSize: 5,
    level: null,
    totalElement: 0,
    sameType: false
  };

  constructor(private questionSV: QuestionService, private levelSV: LevelService) {
  }

  ngOnInit() {
    this.levelSV.getLevel().subscribe((el: any) => this.levels = el);
    this.exam.listQuestion = new Array<Question>();
    this.exam.listLOC.forEach(el => {
      el.questions = [];
      if (this.exam.typeExam === 'lo') {
        this.loadingQuestionByLO(el.id, el);
      } else {
        this.loadingQuestionByChapter(el.id, el);
      }
    });
  }

  loadingQuestionByChapter(chapterId, el, isLoad = false) {
    if (!el.config) {
      el.config = Object.assign({}, this.config);
      el.questions = [];
    }
    if (el.config.sameType !== isLoad) {
      el.config.pageIndex = 1;
    }
    this.questionSV.getQuestionByChapter(chapterId, el.config).subscribe(resp => {
      const paging = JSON.parse(resp.headers.get('paging-header')) as any;
      el.config.totalElement = paging.totalElement;
      if (!isLoad) {
        el.questions = el.questions.concat(resp.body);
      } else {
        el.questions = resp.body;
      }
    }, er => console.log(er));
  }

  loadingQuestionByLO(loId, el, isLoad = false) {
    if (!el.config) {
      el.config = Object.assign({}, this.config);
      el.questions = [];
    }
    if (el.config.sameType !== isLoad) {
      el.config.pageIndex = 1;
    } else {
      this.config.sameType = isLoad;
    }
    this.questionSV.getQuestionByLearningOutcome(loId, el.config).subscribe(resp => {
      const paging = JSON.parse(resp.headers.get('paging-header')) as any;
      el.config.totalElement = paging.totalElement;
      if (!isLoad) {
        el.questions = el.questions.concat(resp.body);
      } else {
        el.questions = resp.body;
      }
    }, er => console.log(er));
  }

  addData(data) {
    if (this.exam.listQuestion.length < this.exam.settingCourse.numberOfQuesion) {
      this.exam.listQuestion.push(data);
    } else {
      swal('Error', 'Conent Test Exam has max number of questions', 'error');
    }
  }

  changeLevel(level, el) {
    el.config.level = level;
    if (this.exam.typeExam === 'lo') {
      this.loadingQuestionByLO(el.id, el, true);
    } else {
      this.loadingQuestionByChapter(el.id, el, true);
    }
  }

  checkIndex(id) {
    return this.exam.listQuestion.map(el => el.code).indexOf(id);
  }

  destroy(i) {
    this.exam.listQuestion.splice(i, 1);
  }

  loadMore(el) {
    el.config.pageIndex++;
    if (this.exam.typeExam === 'lo') {
      this.loadingQuestionByLO(el.id, el, el.config.sameType);
    } else {
      this.loadingQuestionByChapter(el.id, el, el.config.sameType);
    }
    console.log(el.config);
  }

  reset() {
    this.exam.listQuestion = [];
  }
}
