import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'Mex-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  config = {
    data: [
      {
        name: 'Kiều Trọng Khánh',
        email: 'khanhkt@fpt.edu.vn',
        role: 1,
      }
    ],
    filter: {
      itemsPerPage: 10,
      currentPage: 0,
      totalItems: 0,
      searchValue: '',
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

  changeRole(data) {
    alert(data);
  }

}
