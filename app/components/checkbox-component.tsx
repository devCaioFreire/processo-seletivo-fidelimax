import { useEffect, useState } from "react";
import { ComponentsProps } from "../models/components"


export const CheckboxComponent = ({ data, onChange }: ComponentsProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckboxChange = (value: number, checked: boolean) => {
    setSelectedItems(prevSelectedItems => {
      if (checked) {
        return [...prevSelectedItems, value];
      } else {
        return prevSelectedItems.filter(item => item !== value);
      }
    });
  };

  useEffect(() => {
    onChange!(selectedItems);
  }, [selectedItems, onChange]);

  return (
    <section>
      <div className="pt-10 text-blue-800">
        <h2>Questões de seleção múltipla</h2>
        {data!.map((item: any, index: any) => (
          <div key={index} className="flex items-center pt-2 gap-2">
            <input
              type="checkbox"
              id={item.value}
              value={item.value}
              checked={selectedItems.includes(item.value)}
             onChange={(e) => handleCheckboxChange(item.value, e.target.checked)}
            />
            <label className="text-sm">{item.description}</label>
          </div>
        ))}
      </div>
    </section>
  )
}