import type { Control, FieldValues, Path } from 'react-hook-form';
import InputForm from "./InputForm";

interface Field {
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
}

interface FormProps<T extends FieldValues> {
  fields: Field[];
  control: Control<T>;
  errors: Record<string, any>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

function Form<T extends FieldValues>({ fields, control, errors, onSubmit }: FormProps<T>) {
  return (
    <form onSubmit={onSubmit}>
      {fields.map((field) => (
        <InputForm
          key={field.name}
          name={field.name as Path<T>}
          control={control}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          error={errors[field.name]?.message as string | undefined}
        />
      ))}

      <button type="submit">Register</button>
    </form>
  );
}

export default Form;