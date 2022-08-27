import { FC, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {
  Loader,
  NavBar,
  NotFound,
  ServerError,
  TestErrors,
  ModalContainer,
} from "components";
import {
  Home,
  ActivityDashboard,
  ActivityDetails,
  ActivityForm,
  Profile,
} from "pages";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useStore } from "stores";

const App: FC = () => {
  const { key } = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <Loader content="Loading app..." />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={Home} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />
                <Route
                  path={["/create-activity", "/manage/:id"]}
                  key={key}
                  component={ActivityForm}
                />
                <Route path="/profiles/:username" component={Profile} />
                <Route path="/errors" component={TestErrors} />
                <Route path="/server-error" component={ServerError} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default observer(App);
