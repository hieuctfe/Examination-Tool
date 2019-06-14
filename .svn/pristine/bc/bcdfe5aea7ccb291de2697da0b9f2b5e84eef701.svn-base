import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ManageComponent} from './manage/manage.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '', redirectTo: 'Management', pathMatch: 'full'
  },
  {
    path: 'Management', component: ManageComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageComponent]
})
export class RoleModule {
}
