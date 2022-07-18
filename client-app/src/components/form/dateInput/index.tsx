import { FC } from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

const DateInput: FC<Partial<ReactDatePickerProps>> = ({ name, ...rest }) => {
  const [field, meta, helpers] = useField(name!);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...rest}
        name={name}
        selected={field.value && new Date(field.value)}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default DateInput;
