import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private http: HttpClient) {
  }

  getAllSemester() {
    return this.http.get(GlobalVariable.BASE_API + 'Semester/GetAll');
  }

  createSemester(data) {
    return this.http.post(GlobalVariable.BASE_API + 'Semester', data).toPromise();
  }

  deleteSemester(id) {
    return this.http.delete(GlobalVariable.BASE_API + 'Semester?semesters=' + id);
  }

  getExamCode(code) {
    return this.http.get(GlobalVariable.BASE_API + 'Semester/ExamCode?semesterCode=' + code);
  }

  getAllExamCode(code, config) {
    return this.http.get(GlobalVariable.BASE_API + 'Exam/GetAll?semester='
      + (code ? code : '')
      + (config.pageIndex ? '&pageIndex=' + config.pageIndex : '')
      + (config.pageSize ? '&pageSize=' + config.pageSize : ''),
      {observe: 'response'});
  }

  importStudent(data) {
    return this.http.post(GlobalVariable.BASE_API + 'api/Student', data);
  }

  createExam(data) {
    return this.http.post(GlobalVariable.BASE_API + 'Semester/Exam', data);
  }

  updateExam(data) {
    return this.http.put(GlobalVariable.BASE_API + 'Semester/Exam', data);
  }

  deleteExam(code) {
    return this.http.delete(GlobalVariable.BASE_API + 'Semester/Exam?code=' + code);
  }

  getExam(code) {
    return this.http.get(GlobalVariable.BASE_API + 'api/Exam?examCode=' + code);
  }
}
