import { FC } from "react";
import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Option {
  text: string;
  value: string;
}

interface Props {
  placeholder: string;
  name: string;
  options: Option[];
  label?: string;
}

const TextInput: FC<Props> = ({ options, placeholder, name, label }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        options={options}
        clearable
        placeholder={placeholder}
        value={field.value || null}
        onChange={(event, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default TextInput;
