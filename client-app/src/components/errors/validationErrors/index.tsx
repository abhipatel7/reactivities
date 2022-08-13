import React, { FC } from "react";
import { Message } from "semantic-ui-react";

interface Props {
  errors: any;
  // errors: string[];
}

const ValidationErrors: FC<Props> = ({ errors }) => {
  return (
    <Message error>
      {errors.length ? (
        <Message.List>
          {errors.map((err: any, i: number) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      ) : null}
    </Message>
  );
};

export default ValidationErrors;
