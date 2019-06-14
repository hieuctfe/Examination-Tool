import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { AuthenService } from './authen.service';
import 'rxjs/add/operator/first';

@Injectable({
  providedIn: 'root'
})
export class AuthenGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private userSV: UserService, private authSV: AuthenService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLogin = false;
    let user = await this.userSV.getUser.first().toPromise().then(data => data);
    if (!user) {
      isLogin = await this.authSV.getUserFromServer();
    } else {
      isLogin = true;
    }
    if (isLogin) {
      user = await this.userSV.getUser.first().toPromise().then(data => data);
      const listRole = route.data.role as Array<any>;
      if (listRole) {
        let isAccess = false;
        listRole.forEach(el => {
          user.roles.forEach(r => {
            if (el === r) {
              isAccess = true;
            }
          });
        });
        if (!isAccess) {
          this.router.navigate(['/View']);
          this.userSV.logout();
          return false;
        }
      }
      return true;
    }
    this.userSV.logout();
    return false;
  }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLogin = false;
    let user = await this.userSV.getUser.first().toPromise().then(data => data);
    if (!user) {
      isLogin = await this.authSV.getUserFromServer();
    } else {
      isLogin = true;
    }
    if (isLogin) {
      user = await this.userSV.getUser.first().toPromise().then(data => data);
      const listRole = route.data.role as Array<any>;
      if (listRole) {
        let isAccess = false;
        listRole.forEach(el => {
          user.roles.forEach(r => {
            if (el === r) {
              isAccess = true;
            }
          });
        });
        if (!isAccess) {
          this.router.navigate(['/View']);
          this.userSV.logout();
          return false;
        }
      }
      return true;
    }
    this.userSV.logout();
    return false;
  }

}
