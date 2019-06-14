import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AuthenService} from '../../services/authen.service';

@Component({
  selector: 'Mex-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

@HostListener('window:resize', ['$event'])

export class IndexComponent implements OnInit {
  custom = `<div class="spinner inside">
  <div class="double-bounce1"></div>
  <div class="double-bounce2"></div>
</div>`;

  constructor(private authSV: AuthenService) {
  }

  onResize() {
    this.detectSize(window.innerHeight, false);
  }

  ngOnInit() {
    this.authSV.getUserFromServer();
    this.detectSize(window.innerHeight, true);
  }

  detectSize(window_height, isInit) {
    const main = document.getElementById('main');
    const header = document.getElementById('header');

    if (main && header) {
      const height = window_height - header.offsetHeight;
      main.style.minHeight = isInit ? 'calc(' + height + 'px - 1.5rem)' : 'calc(' + height + 'px)';
    }
  }


}
