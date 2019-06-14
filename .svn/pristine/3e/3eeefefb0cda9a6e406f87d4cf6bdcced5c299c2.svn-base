import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ManageComponent} from './manage/manage.component';
import {ModalModule} from 'ngx-bootstrap';
import {MessageService} from '../../services/message.service';
import {SemesterModalComponent} from './semester-modal/semester-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {CreateExamCodeComponent} from './create-exam-code/create-exam-code.component';
import {ExamcodeModalComponent} from './examcode-modal/examcode-modal.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
    path: '', redirectTo: 'Management', pathMatch: 'full'
  },
  {
    path: 'Management', component: ManageComponent
  },
  {
    path: 'ExamCode', component: CreateExamCodeComponent
  },
];

const DATE_FORMAT = {
  parseInput: 'DD/MM/YYYY hh:mm',
  fullPickerInput: 'DD/MM/YYYY hh:mm',
  datePickerInput: 'DD/MM/YYYY hh:mm',
};

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    NgMultiSelectDropDownModule,
    OwlMomentDateTimeModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageComponent, SemesterModalComponent, CreateExamCodeComponent, ExamcodeModalComponent],
  entryComponents: [SemesterModalComponent, ExamcodeModalComponent],
  providers: [MessageService,
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})
export class SemesterModule {
}
