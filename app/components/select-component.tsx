import { Select, SelectItem } from "@nextui-org/react"

export const SelectComponent = ({ content, initialValue, onChange, data }: ComponentsProps) => {
  return (
    <Select
      label={content}
      value={initialValue}
      onChange={() => onChange}
      className="w-full border border-gray-200 rounded-lg"
    >
      {data.map((item: any) => (
        <SelectItem key={item.value} value={item.value}>
          {item.description}
        </SelectItem>
      ))}
    </Select>
  )
}