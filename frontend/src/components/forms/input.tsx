interface Props {
  type: string
  placeholder: string
  label: string
}

export function Input({ type, placeholder, label }: Props) {
  return (
    <div className="form-control w-full">
      <input
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
