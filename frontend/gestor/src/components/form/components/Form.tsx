import type { Control, FieldValues, Path } from 'react-hook-form';
import InputForm from "./InputForm";
import Button from './Button';

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
  submitText: string
}

function Form<T extends FieldValues>({ fields, control, errors, onSubmit, submitText }: FormProps<T>) {
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

      <Button type='submit'>{submitText}</Button>
    </form>
  );
}

export default Form;