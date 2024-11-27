import { BaseModel } from "./BaseModel.ts";

export interface TaskProps {
  name: string;
  description: string;
  completed: boolean;
}

export class Task extends BaseModel<TaskProps> {
  get name(): string {
    return this._props.name;
  }

  get description(): string {
    return this._props.description;
  }

  get completed(): boolean {
    return this._props.completed;
  }
}
