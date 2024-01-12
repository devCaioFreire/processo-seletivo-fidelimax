export const SingleChoiceComponent = ({ content, initialValue, onChange, checked, label1, label2 }: ComponentsProps) => {
  return (
    <section>
      <div className="pt-10 text-blue-800">
        <h2>{content}</h2>
        <div className="space-x-4 pt-2">
          <input
            type="radio"
            name="singleChoice"
            value={initialValue}
            checked={checked}
            onChange={() => onChange}
          />
          <label>{label1}</label>

          <input
            type="radio"
            name="singleChoice"
            value={initialValue}
            checked={checked}
            onChange={() => onChange}
          />
          <label>{label2}</label>
        </div>
      </div>
    </section>
  )
}