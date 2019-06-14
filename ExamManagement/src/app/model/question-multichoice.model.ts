import {Deserializable} from '../interface/deserialize.interface';

export class QuestionMultipleChoice implements Deserializable {
  code: number | string;
  content: string;
  options: Array<any>;
  level: number;
  type: number;
  learningOutcomes: Array<number>;
  mark: number;
  chapters: Array<number>;
  isExam: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
