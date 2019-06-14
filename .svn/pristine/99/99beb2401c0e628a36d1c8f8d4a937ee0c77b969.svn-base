import {Deserializable} from '../interface/deserialize.interface';
import {Course} from './course.model';
import {SettingCourse} from './setting-course.model';
import {Question} from './question.model';

export class Exam implements Deserializable {
  course: Array<Course> | Course;
  settingCourse: SettingCourse;
  listLOC: Array<any>;
  listQuestion: Array<Question>;
  typeExam: string;
  students: Array<any>;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
