

export const CheckboxComponent = (data: ComponentsProps) => {
  return (
    <section>
      <div className="pt-10 text-blue-800">
        <h2>Questões de seleção múltipla</h2>
        {data.data!.map((item: any, index: any) => (
          <div key={index} className="flex items-center pt-2 gap-2">
            <input
              type="checkbox"
              id={item.value}
              value={item.value}
              checked={data.checked}
              onChange={() => data.onChange}
            />
            <label className="text-sm">{item.description}</label>
          </div>
        ))}
      </div>
    </section>
  )
}