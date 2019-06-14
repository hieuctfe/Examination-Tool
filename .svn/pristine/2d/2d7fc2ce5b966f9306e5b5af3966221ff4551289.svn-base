import {Deserializable} from '../interface/deserialize.interface';

export class SettingCourse implements Deserializable {
  numberOfQuesion: number;
  numberOfTest: number;
  startDate: any;
  endDate: any;
  duration: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
