import {Deserializable} from '../interface/deserialize.interface';

export class LearningOutcome implements Deserializable {
  id: number;
  name: string;
  mainObjectiveId: number;
  order: number;
  checked: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
