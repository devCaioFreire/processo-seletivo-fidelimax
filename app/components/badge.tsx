import { CheckBadge } from "./check-badge"

export const Badge = (data: ComponentsProps) => {
  return (
    <section>
      <div className="pt-10 text-blue-800">
        <h2>Questões de seleção múltipla</h2>
        <div className={`${data.horizontal ? 'sm:grid sm:grid-cols-2 md:flex gap-4' : 'flex flex-col gap-2'} pt-2`}>
          {data.data!.map((item: any, index: any) => (
            <CheckBadge
              key={index}
              value={item.value}
              description={item.description}
              horizontal={(data.horizontal ?? true)}
              selected={data.selected}
              onChange={() => data.onChange}
            />
          ))}
        </div>
      </div>
    </section>
  )
}