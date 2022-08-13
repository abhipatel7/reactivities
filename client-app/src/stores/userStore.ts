import { history } from "common";
import { makeAutoObservable, runInAction } from "mobx";
import services from "services";
import { User, UserFormValues } from "types";
import { store } from "./store";

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
      store.commonStore.setToken(user.token);
      runInAction(() => (this.user = user));
      history.push("/activities");
      store.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    history.push("/");
  };

  getUser = async () => {
    try {
      const user = await services.Account.current();
      runInAction(() => (this.user = user));
    } catch (error) {
      throw error;
    }
  };
}

export default UserStore;
