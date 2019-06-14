import {Deserializable} from '../interface/deserialize.interface';

export class Semester implements Deserializable {
  id: number;
  name: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
