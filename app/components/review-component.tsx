import { ComponentsProps } from "../models/components"

export const ReviewComponent = ({ content, initialValue, onChange }: ComponentsProps) => {
  return (
    <section>
      <div className="space-y-[9px] py-10">
        <h2 className="text-blue-800">
          {content} <span className="text-sm text-gray-600 font-medium">(opcional)</span>
        </h2>
        <textarea
          value={initialValue}
          onChange={onChange}
          placeholder="Digite aqui..."
          className="h-[104px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
        />
      </div>
    </section>
  )
}