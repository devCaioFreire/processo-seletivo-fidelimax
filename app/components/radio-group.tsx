import React, { useState } from "react";

interface RadioGroupProps {
  options?: { id: string; label: string }[];
  initialValue: number;
  name: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  initialValue,
  name,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    initialValue
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(Number(event.target.value));
  };

  return (
    <div className="flex w-full items-center justify-between">
      {options?.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2">
          <input
            name={name}
            type="radio"
            id={item.id}
            value={item.id}
            className="w-4 h-4"
            checked={selectedValue === Number(item.id)}
            onChange={handleChange}
          />
          <label>{item.label}</label>
        </div>
      ))}
    </div>
  );
}