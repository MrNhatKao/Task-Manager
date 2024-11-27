import { v4 } from "uuid";

export abstract class BaseModel<T> {
  private readonly _id: string;
  protected readonly _props: T;

  constructor(props: T, id?: string) {
    this._props = props;
    this._id = id || v4();
  }

  get id(): string {
    return this._id;
  }

  toJSON(): T & { id: string } {
    return {
      id: this._id,
      ...this._props,
    };
  }
}
