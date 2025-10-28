type SelectFormProps = {
    name: string
    label: string
    control: any
    error?: string
    options: { value: string | number; label: string }[]
  }
  
  export default function SelectForm({ name, label, control, error, options }: SelectFormProps) {
    return (
      <div className="input-wrapper">
        <label htmlFor={name}>{label}</label>
        <select id={name} {...control.register(name)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="error-text">{error}</p>}
      </div>
    )
  }