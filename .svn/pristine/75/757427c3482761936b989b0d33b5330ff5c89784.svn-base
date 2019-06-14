import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'Mex-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;

  constructor(private userSV: UserService) {
  }

  async ngOnInit() {
    this.userSV.getUser.subscribe(el => {
      this.user = el;
    });
  }

}
