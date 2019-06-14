import {Component, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {QuestionMultipleChoice} from '../../../../model/question-multichoice.model';
import {LevelService} from '../../../../services/level.service';
import {ChapterService} from '../../../../services/chapter.service';
import {LoService} from '../../../../services/lo.service';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'Mex-question-form-modal',
  templateUrl: './question-form-modal.component.html',
  styleUrls: ['./question-form-modal.component.scss']
})
export class QuestionFormModalComponent implements OnInit {
  typeData: any;
  data: QuestionMultipleChoice;
  returnDt: any;
  finishLoading = false;
  chapter: any;
  lo: any;
  level: any;

  constructor(public modalRef: BsModalRef, private levelSV: LevelService, private chapterSV: ChapterService, private loSV: LoService) {
  }

  ngOnInit() {
    this.mergeApi();
    this.typeData = {
      value: 1,
      listType: [
        {
          id: 1,
          name: 'Multi Choice'
        },
        {
          id: 2,
          name: 'Reading'
        },
        {
          id: 3,
          name: 'Matching'
        },
        {
          id: 4,
          name: 'Indicate Mistake'
        },
        {
          id: 5,
          name: 'Fill Blank'
        }
      ]
    };
  }

  mergeApi() {
    const combine = combineLatest(
      this.levelSV.getLevel(),
      this.chapterSV.getChapterBaseOnCourse('Prx301'),
      this.loSV.getLoBaseOnCourseList('Prx301')
    );

    combine.subscribe((el: any) => {
      this.level = el[0];
      this.chapter = el[1];
      this.lo = el[2];
      this.finishLoading = true;
    }, er => console.log(er));
  }

  returnData(data) {
    this.returnDt = {
      success: true,
      data: data
    };
    this.modalRef.hide();
  }
}
