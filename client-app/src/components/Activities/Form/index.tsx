import React, { FC } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const ActivityForm: FC = () => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.TextArea placeholder="Description" />
        <Form.Input placeholder="Category" />
        <Form.Input placeholder="Date" />
        <Form.Input placeholder="City" />
        <Form.Input placeholder="Venue" />
        <Button floated="right" positive type="submit" content="submit" />
        <Button floated="right" type="button" content="submit" />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
