import { makeAutoObservable, runInAction } from 'mobx';
import { v4 } from 'uuid';
import services from 'services';
import { Activity } from 'types';

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  isEdit = false;
  isLoading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  onLoadActivities = async () => {
    try {
      const activities = await services.Activities.list();
      activities.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  onSelectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  onCancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  onFormOpen = (id?: string) => {
    id ? this.onSelectActivity(id) : this.onCancelSelectedActivity();
    this.isEdit = true;
  };

  onFormClose = () => {
    this.isEdit = false;
  };

  onCreateActivity = async (activity: Activity) => {
    this.isLoading = true;
    activity.id = v4();
    try {
      await services.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEdit = false;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  onUpdateActivity = async (activity: Activity) => {
    this.isLoading = true;
    try {
      await services.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.isEdit = false;
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  onDeleteActivity = async (id: string) => {
    this.isLoading = true;
    try {
      await services.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        if (this.selectedActivity?.id === id) this.onCancelSelectedActivity();
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };
}
