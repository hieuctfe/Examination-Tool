import {Component, OnInit} from '@angular/core';
import {GlobalVariable} from '../../../../global';
import {QuestionService} from '../../../../services/question.service';
import {Question} from '../../../../model/question.model';
import {ExamService} from '../../../../services/exam.service';
import swal from 'sweetalert2';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'Mex-switch-question-modal',
  templateUrl: './switch-question-modal.component.html',
  styleUrls: ['./switch-question-modal.component.scss']
})
export class SwitchQuestionModalComponent implements OnInit {
  GlobalVariable = GlobalVariable;
  course: string;
  sortable = {
    type: 'asc',
    current: 'Code'
  };
  currentIDs: Array<string>;
  config = {
    data: [],
    filter: {
      itemsPerPage: 10,
      currentPage: 0,
      totalItems: 0,
      searchValue: '',
      sortField: null
    }
  };
  idQuestion: number;
  idTest: number;
  returnDt;

  constructor(private questionSV: QuestionService, private examSV: ExamService, public modalRef: BsModalRef) {
  }

  ngOnInit() {
    this.getQuestion();
  }

  get(question) {
    if (!question.open) {
      this.config.data.forEach(el => el.open = false);
      this.questionSV.getQuestion(question.code).subscribe((el: Question) => {
        question.content = el.content;
        question.options = el.options;
        question.open = true;
      });
    } else {
      question.open = false;
    }
  }

  getQuestion(data = null, colTable = null) {
    if (colTable) {
      data.sortField = colTable;
      if (this.sortable.current === colTable) {
        this.sortable.type = this.sortable.type === 'asc' ? 'dsc' : 'asc';
      } else {
        this.sortable = {
          type: 'asc',
          current: colTable
        };
      }
    }
    this.questionSV.getAll(this.course, data, this.sortable.type).subscribe((resp: Response) => {
      const paging = JSON.parse(resp.headers.get('paging-header')) as any;
      console.log(resp.body);
      console.log(this.currentIDs);
      this.config = {
        data: resp.body as any,
        filter: {
          itemsPerPage: paging.pageSize,
          currentPage: paging.pageIndex,
          totalItems: paging.totalElement,
          searchValue: paging.searchValue,
          sortField: this.sortable.current
        }
      };
    }, er => console.log(er));
  }

  expand(data) {
    if (data.open === undefined) {
      data.open = true;
      return;
    }
    data.open = !data.open;
  }

  setPage(page) {
    this.config.filter.currentPage = page;
    this.getQuestion(this.config.filter);
  }

  swapQuestion(code) {
    const data = {
      baseTestId: this.idTest,
      oldQuestionCode: this.idQuestion,
      newQuestionCode: code,
    };
    this.examSV.swapQuestion(data).subscribe(el => {
      swal('Success', 'Question is swapped', 'success');
      this.returnDt = {
        success: true
      };
      this.modalRef.hide();
    }, er => {
      swal('Error', 'Cannot swap question', 'error');
      console.log(er);
    });
  }
}
