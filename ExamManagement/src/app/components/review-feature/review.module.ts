import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CourseComponent} from './course/course.component';
import {SemesterComponent} from './semester/semester.component';
import {DataTablesModule} from 'angular-datatables';
import {ListExamComponent} from './list-exam/list-exam.component';
import {ExamDetailComponent} from './exam-detail/exam-detail.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
    path: '', redirectTo: 'Semester', pathMatch: 'full'
  },
  {
    path: 'Semester', component: SemesterComponent
  },
  {
    path: 'Course/:id', component: CourseComponent
  },
  {
    path: 'ListExam/:CourseId', component: ListExamComponent
  },
  {
    path: 'ExamDetail/:ExamId', component: ExamDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    DataTablesModule,
  ],
  declarations: [SemesterComponent, CourseComponent, ListExamComponent, ExamDetailComponent]
})
export class ReviewModule {
}
