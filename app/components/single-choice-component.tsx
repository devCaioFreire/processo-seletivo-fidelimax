import { useEffect, useState } from "react";
import { ComponentsProps } from "../models/components";

export const SingleChoiceComponent = ({
  content,
  initialValue,
  onChange,
  checked,
  label1,
  label2,
}: ComponentsProps) => {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value); // Convertendo o valor para número
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
      console.log(newValue)
    }
  };

  return (
    <section>
      <div className="pt-10 text-blue-800">
        <h2>{content}</h2>
        <div className="space-x-4 pt-2">
          <input
            type="radio"
            name="singleChoice"
            value={0}
            checked={selectedValue === 0}
            onChange={handleInputChange}
          />
          <label>{label1}</label>

          <input
            type="radio"
            name="singleChoice"
            value={1}
            checked={selectedValue === 1}
            onChange={handleInputChange}
          />
          <label>{label2}</label>
        </div>
      </div>
    </section>
  );
};
