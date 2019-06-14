import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalVariable} from '../global';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  constructor(private http: HttpClient) {
  }

  getChapterBaseOnCourse(code) {
    return this.http.get(GlobalVariable.BASE_API + 'Course/Chapters?courseCode=' + code);
  }

  putChapters(data) {
    return this.http.put(GlobalVariable.BASE_API + 'Course/Chapters', data);
  }
}
