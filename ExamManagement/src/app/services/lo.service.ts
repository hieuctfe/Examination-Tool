import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';

@Injectable({
  providedIn: 'root'
})
export class LoService {

  constructor(private http: HttpClient) {
  }

  getLoBaseOnCourse(code) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/LearningOutcomesTreeView?courseCode=' + code);
  }

  saveLO(data) {
    return this.http.put(GlobalVariable.BASE_API + 'Course/LearningOutcome', data);
  }

  getLoBaseOnCourseList(code) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/LearningOutcomes?courseCode=' + code);
  }

  getMainObjectiveBaseOnCourse(code) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/MainObjectives?courseCode=' + code);
  }

  getLOBaseOnMO(code) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/MainObjectives?courseCode=' + code);
  }
}
