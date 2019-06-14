import { CourseFilterPipe } from './../../course-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ModalCourseComponent } from './modal-course/modal-course.component';
import { MessageService } from '../../services/message.service';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'FindCourse', pathMatch: 'full'
  },
  {
    path: 'FindCourse', component: CourseComponent,
  },
  {
    path: 'Manage/:course', component: ManageComponent, children: [
      {
        path: 'Chapter',
        loadChildren: '../../components/course-feature/chapter/chapter.module#ChapterModule',
        data: {
          role: ['Leader']
        }
      },
      {
        path: 'LO',
        loadChildren: '../../components/course-feature/learning-outcome/learning-outcome.module#LearningOutcomeModule',
        data: {
          role: ['Leader']
        }
      },
      {
        path: 'Question',
        loadChildren: '../../components/course-feature/question/question.module#QuestionModule',
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    TreeViewModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    CourseComponent,
    ModalCourseComponent,
    ManageComponent,
    CourseFilterPipe
  ],
  entryComponents: [
    ModalCourseComponent
  ],
  providers: [
    MessageService
  ]
})
export class CourseModule {
}
