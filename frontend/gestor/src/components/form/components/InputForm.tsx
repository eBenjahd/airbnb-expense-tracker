import { Controller, type Control, type FieldValues, type Path} from 'react-hook-form';

interface InputFormProps<T extends FieldValues> {
    name: Path<T>
    control: Control<T>
    type?: string
    placeholder?: string
    label?: string
    error?: string
    disabled?: boolean
}


function InputForm<T extends FieldValues>({name, control, type, placeholder, label, error, disabled = false}: InputFormProps<T>) {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={name}>{label}</label>}

      <Controller
        name={name}
        control={control}
        defaultValue={""as any}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`form-input ${error ? "invalid" : ""}`}
            value={field.value ?? ""}
          />
        )}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  )
}

export default InputForm
