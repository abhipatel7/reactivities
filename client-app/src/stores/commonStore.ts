import { makeAutoObservable } from "mobx";
import { ServerError } from "types";

class CommonStore {
  error: ServerError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setServerError = (error: ServerError) => {
    this.error = error;
  };
}

export default CommonStore;
