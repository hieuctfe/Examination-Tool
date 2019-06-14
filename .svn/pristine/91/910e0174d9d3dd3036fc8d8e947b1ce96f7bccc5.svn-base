import {Deserializable} from '../interface/deserialize.interface';
import {LearningOutcome} from './LO.model';
import {logging} from 'selenium-webdriver';
import Level = logging.Level;
import {Chapter} from './chapter.model';

export class Question implements Deserializable {
  code: number;
  content: string;
  options: Array<any>;
  chapters: Array<Chapter>;
  level: Level;
  mark: number;
  lo: Array<LearningOutcome>;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
