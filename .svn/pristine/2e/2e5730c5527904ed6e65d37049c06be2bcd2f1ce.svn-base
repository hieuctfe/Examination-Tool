import {Injectable} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

import {Observable} from 'rxjs';
import {QuestionFormModalComponent} from '../components/course-feature/question/question-form-modal/question-form-modal.component';
import {QuestionMultipleChoice} from '../model/question-multichoice.model';

@Injectable()
export class MessageService {
  bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
  ) {
  }

  createModal(data, modal, config: any = {
    ignoreBackdropClick: true,
    class: 'modal-lg max-size',
    initialState: {
      data: data,
      returnDt: {}
    }
  }): Observable<string> {
    this.bsModalRef = this.bsModalService.show(modal, config);
    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.bsModalService.onHidden.subscribe((data: any) => {
        observer.next(this.bsModalRef.content.returnDt);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    };
  }

}
