import { FC } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavBar, NotFound, ServerError, TestErrors } from "components";
import { Home, ActivityDashboard, ActivityDetails, ActivityForm } from "pages";
import { Route, Switch, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const App: FC = () => {
  const { key } = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
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
