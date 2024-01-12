import { Select, SelectItem } from "@nextui-org/react"
import { ComponentsProps } from "../models/components"
import { ChangeEvent } from "react";

export const SelectComponent = ({ content, initialValue, onChange, data }: ComponentsProps) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (onChange) {
      onChange(value === '' ? undefined : value);
    }
  };
  
  return (
    <Select
      label={content}
      value={initialValue || ''}
      onChange={handleSelectChange}
      className="w-full border border-gray-200 rounded-lg"
    >
      {data!.map((item: any) => (
        <SelectItem key={item.value} value={item.value}>
          {item.description}
        </SelectItem>
      ))}
    </Select>
  )
}