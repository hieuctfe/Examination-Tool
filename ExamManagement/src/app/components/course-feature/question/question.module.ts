import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImportComponent} from './import/import.component';
import {RouterModule, Routes} from '@angular/router';
import {QuestionFormModalComponent} from './question-form-modal/question-form-modal.component';
import {AlertModule, ModalModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultichoiceTemplateComponent} from './type-question/multichoice-template/multichoice-template.component';
import {MessageService} from '../../../services/message.service';
import {NgxSummernoteModule} from 'ngx-summernote';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ManageQuestionComponent} from './manage-question/manage-question.component';
import {QuestionSharedModule} from './question.shared.module';

const routes: Routes = [
  {path: '', redirectTo: 'Manage', pathMatch: 'full'},
  {path: 'Create', component: ImportComponent},
  {path: 'Manage', component: ManageQuestionComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    NgxSummernoteModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
    NgxPaginationModule,
    QuestionSharedModule
  ],
  declarations: [
    ImportComponent, QuestionFormModalComponent,
    ManageQuestionComponent],
  providers: [
    MessageService,
  ],
  entryComponents: [QuestionFormModalComponent]
})

export class QuestionModule {
}
