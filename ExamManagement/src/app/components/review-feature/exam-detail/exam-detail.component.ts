import {Component, OnInit, ɵQueryValueType} from '@angular/core';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../../../global';

@Component({
  selector: 'Mex-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  testList: any = [];
  Math = Math;
  id: any;
  url = GlobalVariable.BASE_API;
  mess: 'Loading...';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('ExamId');
    const that = this;
    this.http.get(that.url + '/Exam/Review?testId=' + that.id).subscribe((data: any) => {
      console.log(data);
      that.testList = data;
    }, error => {
      console.log(error);
      that.mess = error;
    });
    this.copyFromWeb();
  }

  copyFromWeb() {
    $(document).ready(function () {
      /// flag check
      $('.num-flag span').on('click', function () {
        $(this).toggleClass('active');
        const id = $(this).attr('data-flag-id');
        const numElement = $('a[href$="#' + id + '"]');
        numElement.toggleClass('flaged');
      });
      // question change
      $('.quest input').on('change', function () {
        const id = $(this).parents('.quest').attr('id');
        const numElement = $('p[num-data="' + id + '"]');
        numElement.toggleClass('checked');
      });

      const itemPerPage = 2;

      function renderInfo() {
        const items = $('.question-info .quest');
        const page = Math.ceil(items.length / itemPerPage);
        let pageTemp = '';
        for (let i = 0; i < page; i++) {
          pageTemp += `<li class='page-item'>
                            <a class='page-link'>${i + 1}</a>
                        </li>`;
        }
        const dom = ` <nav class='paging-nav' aria-label='...'>
                    <ul class='pagination'>
                        ${pageTemp}
                    </ul>
                </nav>`;
        $('.question-info').append(dom);
      }

      renderInfo();
      /// click even handle paging
      $('.question-num a').on('click', function () {
        const question = $($(this).attr('href'));
        console.log($('.quest').index(question));
        const atPage = Math.ceil(($('.quest').index(question) + 1) / itemPerPage);
        getPage(atPage);
      });

      $('.pagination').on('click', '.page-link', function () {
        getPage($(this).text());
      });

      function getPage(page) {
        $('.showQuestion').removeClass('showQuestion');
        $('.question-num a p').removeClass('active');
        $('.pagination .active').removeClass('active');
        $($('.pagination .page-item')[page - 1]).addClass('active');
//
        const items = $('.question-info .quest');
        const numItems = $('.question-num a p');
        const indexStart = itemPerPage * (page - 1);
        let indexEnd = indexStart + itemPerPage;
        if (indexEnd > items.length) {
          indexEnd = items.length;
        }
        for (let i = indexStart; i < indexEnd; i++) {
          $(numItems[i]).addClass('active');
          $(items[i]).addClass('showQuestion');
        }
      }

      getPage(1);
    });
  }

  getAnw() {
    const listQuest = $('.quest');
    return listQuest.map((idx, el) => {
      const id = $(el).attr('id');
      const anwser = $('#' + id + ' input').map((idx, el) => {
        // @ts-ignore
        if (el.type == 'checkbox') {
          // @ts-ignore
          if (el.checked) {
            // @ts-ignore
            return el.value;
          }
        } else {
          // @ts-ignore
          return el.value;
        }
      }).get();
      return {
        questionId: id,
        anwser: anwser
      };
    }).get();
  }

  reCheckExam(list) {
    list.forEach(function (el) {
      $('#' + el.questionId + ' input').each((idx, elq) => {
        // @ts-ignore
        if (elq.type === 'checkbox') {
          // @ts-ignore
          if (el.anwser.indexOf(elq.value) >= 0) {
            // @ts-ignore
            elq.checked = true;
          }
        } else {
          // @ts-ignore
          elq.value = el.anwser[idx];
        }
      });
    });
  }
}
