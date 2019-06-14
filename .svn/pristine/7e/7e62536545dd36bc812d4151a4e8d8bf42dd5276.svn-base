import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../../../services/message.service';
import swal from 'sweetalert2';
import {ExamService} from '../../../../services/exam.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PreviousRouteService} from '../../../../services/previsousRoute.service';
import {ParserService} from '../../../../services/parser.service';

@Component({
  selector: 'Mex-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: number;
  baseTest: any;

  constructor(private messageSV: MessageService, private examSV: ExamService, private route: ActivatedRoute,
              private previousSV: PreviousRouteService, private router: Router, private parseSV: ParserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadTest();
    });
  }

  loadTest() {
    this.examSV.getBaseTest(this.id).subscribe((el: any) => {
      this.baseTest = el;
      if (this.baseTest) {
        if (el.status === 3) {
          this.baseTest.questions.map(q => {
            q.content = this.parseSV.descript(q.content);
          });
        }
      }
    }, er => {
      swal('Error', 'Cannot get Test', 'error');
    });
  }

  redirect() {
    this.router.navigateByUrl(this.previousSV.getPreviousUrl());
  }

}

