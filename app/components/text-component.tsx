import { ChangeEvent } from "react";
import { ComponentsProps } from "../models/components"

export const TextComponent = ({ content, initialValue, onChange }: ComponentsProps) => {

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange!(newValue);
  };

  return (
    <section>
      <div className="py-10 space-y-2">
        <h2 className="text-blue-800">
          {content}
        </h2>
        <textarea
          value={initialValue ?? ''}
          onChange={handleInputChange}
          placeholder="Digite aqui..."
          className="h-[168px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
        />
      </div>
    </section>
  )
}