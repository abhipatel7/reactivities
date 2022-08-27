import { makeAutoObservable, runInAction } from "mobx";
import services from "services";
import { Profile } from "types";

class ProfileStore {
  profile: Profile | null = null;
  loadingProfile = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await services.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loadingProfile = false));
    }
  };
}

export default ProfileStore;
