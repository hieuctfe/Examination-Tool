import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {SignalR} from 'ng2-signalr';
import {DataTableDirective} from 'angular-datatables';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../../../global';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'Mex-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})

export class ProcessComponent implements AfterViewInit, OnInit {
  _mysig: any;
  @ViewChildren(DataTableDirective)
  private datatableElement: QueryList<DataTableDirective>;
  dtOptions: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtOptions3: DataTables.Settings = {};
  dtOptions4: DataTables.Settings = {};
  selectTab = false;
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
          that.addNewProcess(mess[0]);
        });
        //
      c.listenForRaw('ListenScreen').subscribe(function (mess: any) {
        that.src = mess;
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
    this.url = GlobalVariable.BASE_API;
    this.initProcessRealTime();
    this.initMustKill();
    this.initOnlineStudentList();
    this.initExceptionList();
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
        if (dataPath.indexOf(':\\PROGRAM FILES') === 0) {
          // elc.setAttribute('style', 'background-color: #E9CF3C');
        }
        if (/:\\[\s\S]*\\DESKTOP/g.test(data.Path.toUpperCase())
          || /^(?!C).*$/.test(data.Path.toUpperCase())) {
          tdElement.setAttribute('style', 'background-color: #FE4C4B');
        }
        if (dataPath.indexOf(':\\WINDOWS') === 0) {
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
        url: that.url + 'DefaultProcess/GetProcessesNeedToKill',
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
        if (dataPath.indexOf(':\\PROGRAM FILES') === 0) {
          // elc.setAttribute('style', 'background-color: #E9CF3C');
        }
        if (/:\\[\s\S]*\\DESKTOP/g.test(data.path.toUpperCase())
          || /^(?!C).*$/.test(data.path.toUpperCase())) {
          tdElement.setAttribute('style', 'background-color: #FE4C4B');
        }
        if (dataPath.indexOf(':\\WINDOWS') === 0) {
          tdElement.setAttribute('style', 'background-color: black; color: white');
        }
        //
      },
      scrollCollapse: true,
    };
  }
  initOnlineStudentList() {
    const that = this;
    this.dtOptions3 = {
      ajax: {
        // url: that.url + 'DefaultProcess/GetAll',
        url: GlobalVariable.BASE_WEB + 'Authentication/test',
        dataSrc: '',
      },
      columns: [{
        title: 'Student Code',
        data: 'WebId'
      }, {
        title: 'Student Name',
        data: 'Username'
      }, {
        title: 'ConnectionId',
        data: 'AppId'
      }],
      // @ts-ignore
      rowCallback: (row: Node, data: any | Object, index: number) => {
        const self = this;
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.router.navigate(['../StudentProcess', data.AppId], {relativeTo: this.route});
        });
        return row;
      },
      scrollCollapse: true,
    };
  }
  initExceptionList() {
    const that = this;
    this.dtOptions4 = {
      ajax: {
        url: that.url + 'DefaultProcess/GetProcessesException',
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
        title: 'Relative Path',
        data: 'path'
      }],
      // @ts-ignore
      select: {
        style: 'multi',
      },
      rowCallback: function (elc: any, data: any) {
        const tdElement = elc.firstChild;
        const dataPath = data.path.toUpperCase();
        if (dataPath.indexOf(':\\PROGRAM FILES') === 0) {
          // elc.setAttribute('style', 'background-color: #E9CF3C');
        }
        if (/:\\[\s\S]*\\DESKTOP/g.test(data.path.toUpperCase())
          || /^(?!C).*$/.test(data.path.toUpperCase())) {
          tdElement.setAttribute('style', 'background-color: #FE4C4B');
        }
        if (dataPath.indexOf(':\\WINDOWS') === 0) {
          tdElement.setAttribute('style', 'background-color: black; color: white');
        }
        //
      },
      scrollCollapse: true,
    };
  }
  findStudent() {
    const  that = this;
    this.selectTab = true;
    let connectId = [];
    this.datatableElement.toArray()[0].dtInstance.then((dtInstance: DataTables.Api) => {
      let temp = '';
      connectId = dtInstance.rows({selected: true}).data().toArray().map(el => el.connectId);
      connectId.forEach((el, idx) => {
        if (idx === 0) {
          temp += el;
        } else {
          temp += ' | ' + el;
        }
      });
      that.reloadTable(2, temp);
    });
  }
  async ChangeToMustKill(option = 1) {
    let processList = [];
    let ProcessFull = [];
    await this.datatableElement.toArray()[0].dtInstance.then((dtInstance: DataTables.Api) => {
      ProcessFull = dtInstance.rows({selected: true}).data().toArray().map((el, idx) => {
      if (option === 1) {
        el.isException = false;
      } else {
        el.isException = true;
      }
      return el;
      });
      processList = dtInstance.rows({selected: true}).data().toArray()
        .map(el => el.ProcessName);
    });
    const that = this;
    // http call change list Must KIll
    this.http.post(that.url + '/api/DefaultProcess', ProcessFull).subscribe((data) => {
      this._mysig.invoke('KillProcess', JSON.stringify(processList)).then(() => {
        that.deleteSelectedProcessAfterKill();
        that.reloadTable(option);
      }).catch(function (reason) {
        console.log(reason);
      });
    }, error => {
      console.log(error);
    });
  }

  getAllProcess() {
    this._mysig.invoke('GetAllProcessStudent', this._mysig.id).then(() => {
    }).catch(function (reason) {
      console.log(reason);
    });
  }

  DeleteDatabaseProcess(option = 1) {
    const that = this;
    let pram = '';
    this.datatableElement.toArray()[option].dtInstance.then((dtInstance: DataTables.Api) => {
     dtInstance.rows({selected: true}).data().toArray()
        .map(el => el.id).forEach(function (_) {
            pram += '&ids=' + _;
        });
        that.http.delete(that.url + 'api/DefaultProcess?ids=""' + pram).subscribe((data) => {
          Swal(
            'Sucess!',
            'Remove Sucess',
            'success'
          );
          that.reloadTable(option);
        }, error => {
          console.log(error);
        });
    });
  }

 async AddByFormProcess(isException = true) {
   const {value: formValues} = await Swal({
     title: 'Multiple inputs',
     html:
       '<label for="">ProcessName: </label><input id="processName" class="swal2-input">' +
       '<label for="">AppName: </label><input id="appName" class="swal2-input">' +
       '<label for="">Process Path (May folder): </label><input id="path" class="swal2-input">',
     focusConfirm: false,
     preConfirm: () => {
       return {
         // @ts-ignore
         processName: document.getElementById('processName').value,
         // @ts-ignore
         appName: document.getElementById('appName').value,
         // @ts-ignore
         path: document.getElementById('path').value,
         isException: isException
     };
     }
   });
   if (formValues) {
     const  that = this;
     const temp = [formValues];
     this.http.post(that.url + 'api/DefaultProcess', temp).subscribe((data) => {
         that.reloadTable(3);
       Swal(
         'Success!',
         // @ts-ignore
         "Add new Process Success",
         'success'
       );
     }, error => {
       Swal(
         'Error!',
         // @ts-ignore
         "Can't Add new Process",
         'error'
       );
     });
   }
 }

  async reloadTable(option = 0, searchValue = '') {
    await this.datatableElement.toArray()[option].dtInstance.then((dtInstance: DataTables.Api) => {
      if (option === 2  && searchValue !== '')  {
        dtInstance.search(searchValue, true, true, false);
        dtInstance.draw();
      } else {
        dtInstance.ajax.reload();
      }
    });
  }

  // Sent Process need to kill an
  async KillProcess() {
    let processList = [];
    console.log(this.datatableElement.toArray());
    await this.datatableElement.toArray()[0].dtInstance.then((dtInstance: DataTables.Api) => {
      processList = dtInstance.rows({selected: true}).data().toArray()
        .map(el => el.ProcessName);
    });
    const that = this;
    this._mysig.invoke('KillProcess', JSON.stringify(processList)).then((data) => {
      console.log(data);
      that.deleteSelectedProcessAfterKill();
    }).catch(function (reason) {
      console.log(reason);
    });
  }
// delete View
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

  ngAfterViewInit(): void {
  }
}
