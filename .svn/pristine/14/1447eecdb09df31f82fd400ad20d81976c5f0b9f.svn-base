import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from './manage/manage.component';
import {RouterModule, Routes} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {ModalModule} from 'ngx-bootstrap';
import {LoModalComponent} from './lo-modal/lo-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TreeModule} from 'angular-tree-component';

const routes: Routes = [
  {
    path: '', component: ManageComponent, pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    TreeModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ManageComponent, LoModalComponent
  ],
  entryComponents: [
    LoModalComponent
  ],
  providers: [
    MessageService
  ]
})
export class LearningOutcomeModule {
}
