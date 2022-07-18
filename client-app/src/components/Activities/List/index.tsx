import { observer } from "mobx-react-lite";
import { FC, Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "stores";
import ActivityListItem from "./item";

const ActivityList: FC = () => {
  const {
    activityStore: { groupedActivities },
  } = useStore();

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivityList);
