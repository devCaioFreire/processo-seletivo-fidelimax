
export const TextComponent = (data: ComponentsProps) => {
  return (
    <section>
      <div className="py-10 space-y-2">
        <h2 className="text-blue-800">
          Questões de texto
        </h2>
        <textarea
          value={data.initialValue}
          onChange={() => data.onChange}
          placeholder="Digite aqui..."
          className="h-[168px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
        />
      </div>
    </section>
  )
}