import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProcessComponent} from './process/process.component';
import { SignalRConfiguration } from 'ng2-signalr';
import { SignalRModule } from 'ng2-signalr';
import {DataTablesModule} from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap';
import { StudentProcessComponent } from './student-process/student-process.component';
import {GlobalVariable} from '../../global';

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'ProcessKillerHub';
  c.jsonp = true;
  // c.qs = { user: 'donald' };
  c.url = GlobalVariable.BASE_WEB;

  c.logging = true;

  // >= v5.0.0
  c.executeEventsInZone = true; // optional, default is true
  c.executeErrorsInZone = false; // optional, default is false
  c.executeStatusChangeInZone = true; // optional, default is true
  return c;
}

const routes: Routes = [
  {
    path: '', component: ProcessComponent, pathMatch: 'full'
  },
  {
    path: 'StudentProcess/:connectionId', component: StudentProcessComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
    SignalRModule.forRoot(createConfig),
    DataTablesModule,
    HttpClientModule
  ],
  declarations: [ProcessComponent, StudentProcessComponent]
})
export class ProcessModule {
}
