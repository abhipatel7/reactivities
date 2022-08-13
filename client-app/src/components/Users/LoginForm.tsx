import { TextInput } from "components";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "stores";

const LoginForm: FC = () => {
  const {
    userStore: { login },
  } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch(() =>
          setErrors({ error: "Invalid email or password" })
        )
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" type="password" placeholder="Password" />
          <ErrorMessage
            name="error"
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color="red"
                content={errors.error}
              />
            )}
          />
          <Button
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
