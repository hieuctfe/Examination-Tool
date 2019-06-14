import {Deserializable} from '../interface/deserialize.interface';

export class Chapter implements Deserializable {
  id: number;
  name: string;
  order: number;
  courseCode: string;
  checked: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
