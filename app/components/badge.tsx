import { useState } from "react";
import { ComponentsProps } from "../models/components"
import { CheckBadge } from "./check-badge"

export const Badge = ({ data, horizontal, onMultipleChange }: ComponentsProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckBadgeChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      );
    }
    if (onMultipleChange) {
      onMultipleChange(value, checked);
    }
  };

  return (
    <section>
      <div className="pt-10 text-blue-800">
        <h2>Questões de seleção múltipla</h2>
        <div className={`${horizontal ? 'sm:grid sm:grid-cols-2 md:flex gap-4' : 'flex flex-col gap-2'} pt-2`}>
          {data!.map((item: any, index: any) => (
            <CheckBadge
              key={index}
              value={item.value}
              description={item.description}
              horizontal={(horizontal ?? true)}
              selected={selectedItems.includes(item.value)}
              onChange={(value, checked) => handleCheckBadgeChange(value, checked)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};