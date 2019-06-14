import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SwitchQuestionModalComponent} from '../switch-question-modal/switch-question-modal.component';
import {EditQuestionModalComponent} from '../edit-question-modal/edit-question-modal.component';
import {MessageService} from '../../../../services/message.service';
import swal from 'sweetalert2';
import {ExamService} from '../../../../services/exam.service';
import {PreviousRouteService} from '../../../../services/previsousRoute.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalVariable} from '../../../../global';
import {QuestionService} from '../../../../services/question.service';

@Component({
  selector: 'Mex-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {
  @Input() baseTest: any;
  @Output() baseTestChange = new EventEmitter();
  GlobalVariable = GlobalVariable;
  id: number;

  constructor(private messageSV: MessageService, private examSV: ExamService, private route: ActivatedRoute,
              private previousSV: PreviousRouteService, private router: Router, private questionSV: QuestionService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
  }

  edit(data) {
    this.questionSV.getQuestion(data.questionCode).subscribe(res => {
      this.messageSV.createModal(data, EditQuestionModalComponent, {
        class: 'modal-lg max-size',
        initialState: {
          idTest: this.id,
          data: res,
          returnDt: {}
        }
      }).subscribe((el: any) => {
        if (el.success) {
          this.baseTestChange.emit();
        }
      });
    });
  }

  switch(code) {
    this.messageSV.createModal({}, SwitchQuestionModalComponent, {
      class: 'modal-lg max-size',
      initialState: {
        currentIDs: this.baseTest.questions.map(el => el.questionCode),
        idQuestion: code,
        idTest: this.id,
        course: this.baseTest.course,
        returnDt: {}
      }
    }).subscribe((el: any) => {
      if (el.success) {
        this.baseTestChange.emit();
      }
    });
  }

  approve(isApprove) {
    swal({
      title: 'Are you sure?',
      text: 'This Test will not be allowed Approved/Reject anymore!!!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'btn btn-info',
      cancelButtonClass: 'btn'
    }).then(result => {
      if (result.value) {
        this.examSV.approveExam({isApprove: isApprove, id: this.id}).subscribe(el => {
          swal(
            'Success',
            'The Test has been ' + (isApprove === true ? 'Approved' : 'Rejected') + '!',
            'success'
          );
          let url = this.previousSV.getPreviousUrl();
          if (this.router.url === url) {
            url = 'View/Exam/Review';
          }
          this.router.navigateByUrl(url);
        }, er => {
          swal(
            'Error',
            'Some error has occurred',
            'error'
          );
        });
      }
    });
  }


  retake() {
    this.examSV.retake(this.id).subscribe(el => this.baseTestChange.emit(), er => swal('Error', 'Please try again!!!', 'error'));
  }
}
