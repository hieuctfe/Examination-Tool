import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageComponent} from './manage/manage.component';
import {RouterModule, Routes} from '@angular/router';
import {ChapterModalComponent} from './chapter-modal/chapter-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MessageService} from '../../../services/message.service';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {NgxSortableModule} from 'ngx-sortable';

const routes: Routes = [
  {
    path: '', component: ManageComponent, pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSortableModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [ManageComponent, ChapterModalComponent],
  entryComponents: [ChapterModalComponent],
  providers: [MessageService]
})
export class ChapterModule {
}
