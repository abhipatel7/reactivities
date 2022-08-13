import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Loader, Segment } from "semantic-ui-react";
import { useStore } from "stores";
import { ActivityFormValues } from "types";
import { v4 } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { DateInput, SelectInput, TextArea, TextInput } from "components";
import { categoryOptions } from "common/constants";

const ActivityForm: FC = () => {
  const {
    activityStore: {
      createActivity,
      updateActivity,
      loadActivityById,
      loadingInitial,
    },
  } = useStore();

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const [activity, setActivity] = useState<ActivityFormValues>(
    new ActivityFormValues()
  );

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    date: Yup.string().required("Date is required").nullable(),
    venue: Yup.string().required("Venue is required"),
    city: Yup.string().required("City is required"),
  });

  useEffect(() => {
    if (id)
      loadActivityById(id).then((activity) => {
        setActivity(new ActivityFormValues(activity));
      });
  }, [id, loadActivityById]);

  const onSubmit = (activity: ActivityFormValues) => {
    if (!activity.id) {
      let newActivity = { ...activity, id: v4() };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  if (loadingInitial) return <Loader content="Loading Activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={activity}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit: onSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={onSubmit} autoComplete="off">
            <TextInput name="title" placeholder="Title" />
            <TextArea rows={3} placeholder="Description" name="description" />
            <SelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <DateInput
              placeholderText="Date"
              showTimeSelect
              name="date"
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
            />
            <Header content="Location Details" sub color="teal" />
            <TextInput placeholder="City" name="city" />
            <TextInput placeholder="Venue" name="venue" />
            <Button
              floated="right"
              loading={isSubmitting}
              positive
              type="submit"
              disabled={isSubmitting || !dirty || !isValid}
              content="Submit"
            />
            <Button
              as={Link}
              to="/activities"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
