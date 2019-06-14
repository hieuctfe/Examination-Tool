import {Component, OnInit, ViewChild} from '@angular/core';
import {Course} from '../../../../model/course.model';
import {CourseService} from '../../../../services/course.service';
import {GlobalVariable} from '../../../../global';
import {QuestionService} from '../../../../services/question.service';
import {QuestionMultipleChoice} from '../../../../model/question-multichoice.model';
import {MessageService} from '../../../../services/message.service';
import {ParserService} from '../../../../services/parser.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import swal from 'sweetalert2';
import {QuestionFormModalComponent} from '../question-form-modal/question-form-modal.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'Mex-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  @ViewChild('file') inputFile: any;
  resultTemplate = {
    success: [],
    error: []
  };
  docType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  gifType = 'text/plain';
  xmlType = 'text/xml';
  course: any;
  modalRef: BsModalRef;
  messageCourse = {
    isShow: false,
    message: 'Không tìm thấy'
  };
  GlobalVariable = GlobalVariable;

  constructor(private modalService: BsModalService,
              private courseSV: CourseService,
              private questionSV: QuestionService,
              private parserSV: ParserService,
              private messageSV: MessageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.parent.parent.params.subscribe(params => {
      this.course = params['course'];
    });
  }

  async openModal(data, type) {
    if (!data) {
      data = new QuestionMultipleChoice();
    }
    this.messageSV.createModal(data, QuestionFormModalComponent).subscribe(async (value: any) => {
      if (value.success) {
        if (value.data && Object.keys(value.data).length > 0) {
          const valid = [];
          valid.push(this.parserSV.veryfiContentQuestion(value.data));
          await Promise.all(valid).then(el => {
            if (Object.keys(data).length > 0) {
              if (type === 'success') {
                if (el[0] === true) {
                  this.resultTemplate.success = this.questionSV.updateLocal(this.resultTemplate.success, this.questionSV
                    .findIndex(this.resultTemplate.success, data), value.data);
                } else {
                  const temp = {...value.data};
                  this.questionSV.deleteLocal(this.resultTemplate.success,
                    this.questionSV.findIndex(this.resultTemplate.success, value.data));
                  this.resultTemplate.error = this.questionSV.createLocal(this.resultTemplate.error, temp);
                }
              } else {
                if (el[0] === true) {
                  const temp = {...value.data};
                  this.questionSV.deleteLocal(this.resultTemplate.error,
                    this.questionSV.findIndex(this.resultTemplate.error, value.data));
                  this.resultTemplate.success = this.questionSV.createLocal(this.resultTemplate.success, temp);
                } else {
                  this.resultTemplate.error = this.questionSV.updateLocal(this.resultTemplate.error, this.questionSV
                    .findIndex(this.resultTemplate.error, data), value.data);
                }
              }
            } else {
              value.data.code = this.parserSV.guidGenerator();
              if (el[0] === true) {
                this.resultTemplate.success = this.questionSV.createLocal(this.resultTemplate.success, value.data);
              } else {
                this.resultTemplate.error = this.questionSV.createLocal(this.resultTemplate.error, value.data);
              }
            }
          });
        }
      }
    });
  }

  readFile(event) {
    const that = this;
    const file = event.target.files[0];
    if (file) {
      this.messageCourse.isShow = false;
      switch (file.type) {
        case this.docType: {
          that.parserSV.readFileDocx(file, async function (err, content) {
            if (err) {
              alert('Không thể đọc file');
              return;
            }
            const zip = that.parserSV.getJSZip(content);
            const doc = that.parserSV.getDocXTemplater().loadZip(zip);
            const text = doc.getFullText();
            try {
              const result = await that.parserSV.parseDocx(that.resultTemplate, '1', text);
              that.resultTemplate = result.template;
              that.notifyResult(result.model);
              that.inputFile.nativeElement.value = null;
            } catch (e) {
              alert('File không đúng định dạng');
              that.resultTemplate = {
                success: [],
                error: []
              };
            }
          });
          break;
        }
        case this.gifType: {
          const reader = new FileReader();
          reader.onload = async function () {
            const text = reader.result;
            const result = await that.parserSV.parseGIF(text, that.resultTemplate);
            if (result.template) {
              that.resultTemplate = result.template;
              that.notifyResult(result.model);
            }
          };
          that.inputFile.nativeElement.value = null;
          reader.readAsText(file);
          break;
        }
        case this.xmlType: {
          const reader = new FileReader();
          reader.onload = async function () {
            const text = reader.result;
            const result = await that.parserSV.parseXMLtoJson(text, that.resultTemplate);
            that.resultTemplate = result.template;
            that.notifyResult(result.model);
          };
          that.inputFile.nativeElement.value = null;
          reader.readAsText(file);
          break;
        }
        default:
          alert('File không hợp lệ');
          break;
      }
    }
  }

  notifyResult(data: any) {
    const percent = [data.s / (data.s + data.w + data.e), data.w / (data.s + data.w + data.e), data.e / (data.s + data.w + data.e)];
    swal({
      title: 'Report',
      type: 'info',
      confirmButtonClass: 'btn btn-info',
      cancelButtonClass: 'btn',
      html: `<div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${percent[0] * 100}%"></div>
                <div class="progress-bar bg-warning" role="progressbar" style="width: ${percent[1] * 100}%"></div>
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${percent[2] * 100}%"></div>
             </div>
             <div class="pt-4 text-left">
              <p class="font-weight-bold">Total : ${data.s + data.w + data.e}</p>
              <p class="text-success">Success questions: ${data.s}</p>
              <p class="text-warning">Warning questions: ${data.w}</p>
              <p class="text-danger">Error question: ${data.e}</p>
             </div>`
    });
  }

  getCourse(value) {
    this.messageCourse.isShow = false;
    this.courseSV.getCourse(value).subscribe(
      (el: Course) => {
        if (el) {
          this.course = new Course().deserialize(el);
        } else {
          this.messageCourse.isShow = true;
          this.messageCourse.message = 'Không tìm thấy môn \' ' + value + '\'';
        }
      }
    );
  }

  submitQuestion() {
    const data = {
      course: this.course,
      questions: this.resultTemplate.success
    };
    this.questionSV.importMultipleChoice(data).subscribe(() => {
      this.resultTemplate = {
        success: [],
        error: []
      };
      this.messageCourse.isShow = true;
      this.messageCourse.message = 'Câu hỏi đã được xử lí.';
      swal({
        title: 'Confirm',
        text: 'Do you want to move to process page ?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-info',
        cancelButtonClass: 'btn',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/ProcessQuestion'], {relativeTo: this.route});
        }
      });
    }, (er) => {
      swal('Error', 'Some errors was found', 'error');
      console.log(er);
    });
  }

  destroy(i, type) {
    this.resultTemplate[type].splice(i, 1);
  }
}


