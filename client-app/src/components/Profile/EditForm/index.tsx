import { TextInput, TextArea } from "components";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { Button } from "semantic-ui-react";
import { useStore } from "stores";
import * as Yup from "yup";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm: FC<Props> = ({ setEditMode }) => {
  const {
    profileStore: { profile, updateProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      onSubmit={(values) => {
        updateProfile(values).then(() => {
          setEditMode(false);
        });
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <TextInput placeholder="Display Name" name="displayName" />
          <TextArea rows={3} placeholder="Add your bio" name="bio" />
          <Button
            positive
            type="submit"
            loading={isSubmitting}
            content="Update profile"
            floated="right"
            disabled={!isValid || !dirty}
          />
        </Form>
      )}
    </Formik>
  );
};

export default observer(ProfileEditForm);
