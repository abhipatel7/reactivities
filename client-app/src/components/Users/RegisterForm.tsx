import { TextInput, ValidationErrors } from "components";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "stores";
import * as Yup from "yup";

const registerValidationSchema = Yup.object({
  displayName: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const RegisterForm: FC = () => {
  const {
    userStore: { register },
  } = useStore();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        displayName: "",
        username: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={registerValidationSchema}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <TextInput name="displayName" placeholder="Display Name" />
          <TextInput name="username" placeholder="User Name" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="password" type="password" placeholder="Password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Button
            loading={isSubmitting}
            positive
            disabled={!isValid || !dirty || isSubmitting}
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
