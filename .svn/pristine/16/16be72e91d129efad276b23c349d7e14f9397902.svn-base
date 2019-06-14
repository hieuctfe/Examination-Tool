import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';
import {Course} from '../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getCourse(courseCode: string) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/IsExisted?courseCode=' + courseCode + '&isCache=true');
  }

  getAllCourse() {
    return this.http.get(GlobalVariable.BASE_API + 'Course/GetAll');
  }

  getCourseByDepartment(departmentCode) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/GetCoursesByDepartment?departmentCode=' + departmentCode);
  }

  createCourse(course: Course) {
    return this.http.post(GlobalVariable.BASE_API + '/Course', course);
  }

  updateCourse(course: Course) {
    return this.http.put(GlobalVariable.BASE_API + '/Course', course);
  }

  delete(code: string) {
    return this.http.delete(GlobalVariable.BASE_API + '/Course?code=' + code);
  }
}
