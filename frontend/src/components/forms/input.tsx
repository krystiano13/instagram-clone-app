interface Props {
  type: string
  placeholder: string
  label: string
  name: string
}

export function Input({ type, placeholder, label, name }: Props) {
  return (
    <div className="form-control w-full">
      <input
        name={name}
        required
        type={type}
        placeholder={placeholder as string}
        className="input input-filled peer"
      />
      <label className="input-filled-label">{label as string}</label>
      <span className="input-filled-focused"></span>
    </div>
  )
}
