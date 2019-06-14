import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) {
  }

  getAllDepartment() {
    return this.http.get(GlobalVariable.BASE_API + 'api/Department');
  }
}
