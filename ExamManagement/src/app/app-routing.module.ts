import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthenGuardService} from './services/authen-guard.service';
import {ProcessComponent} from './components/process/process.component';
import {SecretKeyComponent} from './secret-key/secret-key.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'View',
    pathMatch: 'full'
  },
  {
    path: 'View',
    component: DashboardComponent,
    canActivate: [AuthenGuardService],
    canActivateChild: [AuthenGuardService],
    children: [
      {
        path: 'Exam',
        loadChildren: './components/exam-feature/exam.module#ExamModule',
        data: {
          role: ['Examinator', 'Lecturer', 'Leader', 'Manager']
        }
      },
      {
        path: 'Password',
        component: SecretKeyComponent,
        data: {
          role: ['Manager']
        },
      },
      {
        path: 'Course',
        loadChildren: './components/course-feature/course.module#CourseModule',
        data: {
          role: ['Lecturer', 'Leader', 'Examinator']
        }
      },
      {
        path: 'Semester',
        loadChildren: './components/semester-feature/semester.module#SemesterModule',
        data: {
          role: ['Examinator']
        }
      },
      {
        path: 'Review',
        loadChildren: './components/review-feature/review.module#ReviewModule',
        data: {
          role: ['Examinator']
        }
      },
      {
        path: 'Process',
        loadChildren: './components/process-feature/process.module#ProcessModule',
        data: {
          role: ['IT']
        }
      },
    ]
  },
  {
    path: 'ProcessQuestion',
    component: ProcessComponent,
    canActivate: [AuthenGuardService],
    data: {
      role: ['Lecturer', 'Leader']
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
