import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<any>(null);
  }

  get getUser() {
    return this.user.asObservable();
  }

  set setUser(user) {
    this.user.next(user);
  }

  getLecturers() {
    return this.http.get(GlobalVariable.BASE_API + 'Resource/GetLectures?isCache=true');
  }

  getUserFromModule() {
    return this.http.get(GlobalVariable.BASE_API + 'Resource/CurrentUser').toPromise();
  }

  logout() {
    return this.http.get(GlobalVariable.BASE_API + 'auth/logout');
  }
}
