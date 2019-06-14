import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MessageService} from '../../../services/message.service';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BsDropdownModule, ModalModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {NgModule} from '@angular/core';
import {BaseTestComponent} from './base-test/base-test.component';
import {DetailComponent} from './detail/detail.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SwitchQuestionModalComponent} from './switch-question-modal/switch-question-modal.component';
import {EditQuestionModalComponent} from './edit-question-modal/edit-question-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionSharedModule} from '../../course-feature/question/question.shared.module';
import {PreviousRouteService} from '../../../services/previsousRoute.service';
import {DoTestComponent} from './do-test/do-test.component';
import {ApproveComponent} from './approve/approve.component';
import {SlideToggleModule} from 'ngx-slide-toggle';

const routes: Routes = [
  {
    path: '', redirectTo: 'BaseTest', pathMatch: 'full'
  },
  {
    path: 'BaseTest', component: BaseTestComponent
  },
  {
    path: 'Detail/:id', component: DetailComponent, data: {
      role: ['Lecturer', 'Leader']
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    QuestionSharedModule,
    NgMultiSelectDropDownModule,
    SlideToggleModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    BaseTestComponent,
    DetailComponent,
    SwitchQuestionModalComponent,
    EditQuestionModalComponent,
    DoTestComponent,
    ApproveComponent],
  entryComponents: [
    EditQuestionModalComponent,
    SwitchQuestionModalComponent
  ],
  providers: [
    MessageService,
    PreviousRouteService
  ]
})
export class ReviewModule {
}
