import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTableDirective} from 'angular-datatables';
import {SignalR} from 'ng2-signalr';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../../../global';

@Component({
  selector: 'Mex-student-process',
  templateUrl: './student-process.component.html',
  styleUrls: ['./student-process.component.scss']
})
export class StudentProcessComponent implements OnInit, OnDestroy {
  _mysig: any;
  @ViewChildren(DataTableDirective)
  private datatableElement: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  StudentId = '';
  url: any;
  src: '';

  // @ts-ignore
  constructor(private route: ActivatedRoute,
              private _signalR: SignalR,
              private http: HttpClient,
              private router: Router) {
    // signalR
    const that = this;
    this._signalR.connect().then(function (c) {
        that._mysig = c;
        const onMessageSent$ = c.listenForRaw('SetProcessAtClient');
        onMessageSent$.subscribe(function (mess) {
          console.log(mess);
          that.addNewProcess(mess[0]);
        });
        // @ts-ignore
        c.listenForRaw('ListenSubmitMessage').subscribe(function (mess: any) {
          // @ts-ignore
          alert(mess);
        });
        // @ts-ignore
        c.listenForRaw('ListenScreen').subscribe(function (mess2: any, mess: any) {
          // @ts-ignore
          that.src = 'data:image/jpeg;base64,' + mess2[1];
        });
        that.StudentId = that.route.snapshot.paramMap.get('connectionId');
        console.log(that.StudentId);
        c.invoke('GetStudentProcess', that.StudentId, that._mysig.id).then((data) => {
          console.log('call GetStudentProcess success');
        }).catch(function (reason) {
          console.log(reason);
        });

      }
    );
    // end signalr
  }

  addNewProcess(process: any, option = 0) {
    const that = this;
    this.datatableElement.toArray()[option].dtInstance.then((dtInstance: DataTables.Api) => {
      let processList = dtInstance.rows().data().toArray();
      processList = that.arrayUnique([...processList, ...process]);
      // console.log(processList);
      dtInstance.clear();
      dtInstance.rows.add(processList).draw();
    });
  }

  // default process
  ngOnInit(): void {
    const that = this;
    this.url = GlobalVariable.BASE_API;
    this.initProcessRealTime();
    // this.initMustKill();
  }

  ngOnDestroy(): void {
    this._mysig.invoke('StopScreen', this.StudentId).then((data) => {
      console.log('call Stop success');
    }).catch(function (reason) {
      console.log(reason);
    });
  }

  initProcessRealTime() {
    this.dtOptions = {
      columns: [{
        title: 'Application name',
        data: 'AppName'
      }, {
        title: 'Process Name',
        data: 'ProcessName'
      }, {
        title: 'Absolute Path',
        data: 'Path'
      }],
      // @ts-ignore
      select: {
        style: 'multi',
      },
      rowCallback: function (elc: any, data: any) {
        const tdElement = elc.firstChild;
        const dataPath = data.Path.toUpperCase();
        if (dataPath.indexOf('C:\\PROGRAM FILES') === 0) {
          // elc.setAttribute('style', 'background-color: #E9CF3C');
        }
        if (/C:\\[\s\S]*\\DESKTOP/g.test(data.Path.toUpperCase())
          || /^(?!C).*$/.test(data.Path.toUpperCase())) {
          tdElement.setAttribute('style', 'background-color: #FE4C4B');
        }
        if (dataPath.indexOf('C:\\WINDOWS') === 0) {
          tdElement.setAttribute('style', 'background-color: black; color: white');
        }
        //
      },
      scrollCollapse: true,
    };
  }

  initMustKill() {
    const that = this;
    this.dtOptions2 = {
      ajax: {
        url: that.url + 'DefaultProcess/GetAll',
        dataSrc: '',
      },
      rowId: 'id',
      columns: [{
        title: 'Application name',
        data: 'appName'
      }, {
        title: 'Process Name',
        data: 'processName'
      }, {
        title: 'Absolute Path',
        data: 'path'
      }],
      // @ts-ignore
      select: {
        style: 'multi',
      },
      rowCallback: function (elc: any, data: any) {
        const tdElement = elc.firstChild;
        const dataPath = data.path.toUpperCase();
        if (dataPath.indexOf('C:\\PROGRAM FILES') === 0) {
          // elc.setAttribute('style', 'background-color: #E9CF3C');
        }
        if (/C:\\[\s\S]*\\DESKTOP/g.test(data.path.toUpperCase())
          || /^(?!C).*$/.test(data.path.toUpperCase())) {
          tdElement.setAttribute('style', 'background-color: #FE4C4B');
        }
        if (dataPath.indexOf('C:\\WINDOWS') === 0) {
          tdElement.setAttribute('style', 'background-color: black; color: white');
        }
        //
      },
      scrollCollapse: true,
    };
  }

  summitExam() {
    this._mysig.invoke('SubmmitStudentExam', this.StudentId, this._mysig.id).then((data) => {
      console.log('Submiting screen....');
    }).catch(function (reason) {
      console.log(reason);
    });
  }

  async ChangeToMustKill() {
    let processList = [];
    let ProcessFull = [];
    await this.datatableElement.toArray()[0].dtInstance.then((dtInstance: DataTables.Api) => {
      ProcessFull = dtInstance.rows({selected: true}).data().toArray();
      processList = dtInstance.rows({selected: true}).data().toArray()
        .map(el => el.path);
    });
    const that = this;
    // http call change list Must KIll
    this.http.post(that.url + '/api/DefaultProcess', ProcessFull).subscribe((data) => {
      this._mysig.invoke('KillProcess', JSON.stringify(processList), that.StudentId).then(() => {
        that.deleteSelectedProcessAfterKill();
        that.reloadTable();
      }).catch(function (reason) {
        console.log(reason);
      });
    }, error => {
      console.log(error);
    });
  }

  DeleteDatabaseProcess() {
    const that = this;
    let pram = '';
    this.datatableElement.toArray()[1].dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.rows({selected: true}).data().toArray()
        .map(el => el.id).forEach(function (_) {
        pram += '&ids=' + _;
      });
      that.http.delete(that.url + '/api/DefaultProcess?ids=""' + pram).subscribe((data) => {
        that.reloadTable(1);
      }, error => {
        console.log(error);
      });
    });
  }

  async reloadTable(option = 0) {
    await this.datatableElement.toArray()[option].dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  // Sent Process need to kill an
  async KillProcess() {
    let processList = [];
    console.log(this.datatableElement.toArray());
    await this.datatableElement.toArray()[0].dtInstance.then((dtInstance: DataTables.Api) => {
      processList = dtInstance.rows({selected: true}).data().toArray()
        .map(el => el.Path);
    });
    const that = this;
    this._mysig.invoke('KillProcess', JSON.stringify(processList), that.StudentId).then((data) => {
      console.log(data);
      that.deleteSelectedProcessAfterKill();
    }).catch(function (reason) {
      console.log(reason);
    });
  }

  TestScreen() {
    this._mysig.invoke('GetScreen', this.StudentId, this._mysig.id).then((data) => {
      console.log('listening screen....');
    }).catch(function (reason) {
      console.log(reason);
    });
  }

  deleteSelectedProcessAfterKill(option = 0) {
    let ProcessAfterDelete = [];
    this.datatableElement.toArray()[option].dtInstance.then((dtInstance: DataTables.Api) => {
      ProcessAfterDelete = dtInstance.rows({selected: false}).data().toArray();
      dtInstance.clear();
      dtInstance.rows.add(ProcessAfterDelete).draw();
    });
  }

  arrayUnique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].Path === a[j].Path) {
          a.splice(j--, 1);
        }
      }
    }
    return a;
  }
}
