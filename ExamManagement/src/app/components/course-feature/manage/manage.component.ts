import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'Mex-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  course: any;
  state: any;
  user: any;

  constructor(private route: ActivatedRoute, private router: Router, private userSV: UserService) {
  }

  ngOnInit() {
    this.userSV.getUser.subscribe(el => this.user = el);
    this.route.params.subscribe(params => {
      this.course = params['course'];
    });
  }


  default() {
    this.course = undefined;
    this.router.navigateByUrl('View/Course/FindCourse');
  }


}
