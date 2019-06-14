import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateExamComponent} from './create-exam/create-exam.component';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {VerifyCourseComponent} from './verify-course/verify-course.component';
import {SettingExamComponent} from './setting-exam/setting-exam.component';
import {SetContentExamComponent} from './set-content-exam/set-content-exam.component';
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {SettingLOComponent} from './setting-lo/setting-lo.component';
import {CollapseModule, ModalModule, TabsModule} from 'ngx-bootstrap';
import {QuestionComponent} from './question/question.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {UpdateExamComponent} from './update-exam/update-exam.component';
import {UpdateModalComponent} from './update-modal/update-modal.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MessageService} from '../../services/message.service';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';
import {AuthenGuardService} from '../../services/authen-guard.service';

const DATE_FORMAT = {
  parseInput: 'DD/MM/YYYY hh:mm',
  fullPickerInput: 'DD/MM/YYYY hh:mm',
  datePickerInput: 'DD/MM/YYYY hh:mm',
};

const routes: Routes = [
  {path: '', redirectTo: 'Create', pathMatch: 'full'},
  {
    path: 'Create', component: CreateExamComponent, canActivateChild: [AuthenGuardService], data: {
      role: ['Examinator']
    }
  },
  {
    path: 'Update', component: UpdateExamComponent, canActivateChild: [AuthenGuardService], data: {
      role: ['Examinator']
    }
  },
  {
    path: 'Review', loadChildren: '../../components/exam-feature/review-exam/review.module#ReviewModule', data: {
      role: ['Leader', 'Lecturer','Manager']
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    DragAndDropModule,
    ArchwizardModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    NgxPaginationModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  declarations: [
    CreateExamComponent, VerifyCourseComponent, SettingExamComponent,
    SetContentExamComponent, SettingLOComponent, QuestionComponent, UpdateExamComponent, UpdateModalComponent
  ],
  entryComponents: [UpdateModalComponent],
  providers: [MessageService,
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: DATE_FORMAT
    }
  ]
})


export class ExamModule {
}
