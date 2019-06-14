import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from '../../../../services/chapter.service';
import { MessageService } from '../../../../services/message.service';
import { ChapterModalComponent } from '../chapter-modal/chapter-modal.component';
import swal from 'sweetalert2';
import { ParserService } from '../../../../services/parser.service';

@Component({
  selector: 'Mex-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  @ViewChild('table') table: any;
  code: any;
  chapters: any[];
  defaultList: any[];
  isChange = false;
  deleteChapters = [];

  constructor(private parserSV: ParserService, private route: ActivatedRoute,
    private chapterSV: ChapterService, private messageSV: MessageService) {
    this.route.parent.parent.params.subscribe(params => {
      this.code = params['course'];
      if (this.code) {
        this.loadChapters(this.code);
      }
    });
  }

  ngOnInit() {
  }

  save() {
    swal({
      title: 'Save your edit ?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-info',
      cancelButtonClass: 'btn',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        const final = this.chapters.concat(this.deleteChapters);
        this.chapterSV.putChapters(final).subscribe(() => {
          swal('Success', 'Your Edit have been saved', 'success');
          this.isChange = false;
          this.loadChapters(this.code);
        }, () => {
          swal('Error', 'Cannot save', 'error');
        });
      }
    });
  }

  loadChapters(code) {
    this.chapterSV.getChapterBaseOnCourse(code).subscribe((el: any[]) => {
      this.chapters = el;
      this.defaultList = el.map(x => Object.assign({}, x));
    }, er => console.log(er));
  }

  showModal(type, data) {
    const config = {
      initialState: {
        data: data ? data : { id: this.parserSV.guidGenerator(), courseCode: this.code, state: 1 },
        type: type,
        returnDt: {}
      }
    };
    this.messageSV.createModal(data, ChapterModalComponent, config).subscribe(async (value: any) => {
      if (value.success === true) {
        if (type === 'create') {
          this.chapters.push(value.data);
        } else {
          const index = this.findIndex(this.chapters, value.data);
          if (index !== -1) {
            if (value.data.state !== 1) {
              value.data.state = 2;
            }
            this.chapters[index] = value.data;
          }
        }
        this.isChange = true;
      }
    });
  }

  listOrderChanged(data) {
    this.chapters = data;
    this.isChange = true;
  }

  reset() {
    this.chapters = [...this.defaultList];
    this.deleteChapters = [];
    this.isChange = false;
  }

  delete(chapter) {
    const index = this.findIndex(this.chapters, chapter);
    if (index !== -1) {
      if (chapter.state !== 1) {
        chapter.state = 3;
        this.deleteChapters.push(chapter);
      }
      this.isChange = true;
      this.chapters.splice(index, 1);
    }
  }

  findIndex(array, el) {
    return array.map(q => q.id).indexOf(el.id);
  }

}
