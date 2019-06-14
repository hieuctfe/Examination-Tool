import {Deserializable} from '../interface/deserialize.interface';

export class Course implements Deserializable {
  code: number;
  name: string;
  department: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
