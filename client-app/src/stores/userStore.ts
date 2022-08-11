import { makeAutoObservable } from "mobx";
import services from "services";
import { User, UserFormValues } from "types";

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await services.Account.login(creds);
      console.log(user);
    } catch (error) {
      throw error;
    }
  };
}

export default UserStore;
