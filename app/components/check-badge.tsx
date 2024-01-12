import { useState } from "react";

interface CheckBadgeProps {
  value: string;
  description: string;
  horizontal: boolean;
  selected: boolean;
  onChange: (value: string, selected: boolean) => void;
}

export const CheckBadge = ({ value, description, horizontal, selected, onChange }: CheckBadgeProps) => {

  const handleClick = () => {
    onChange(value, !selected);
  };

  return (
    <div
      className={`flex items-center justify-center h-[30px] py-2 px-4 border-2 border-blue-100 rounded-full cursor-pointer transition-all ease-in-out duration-300
      ${selected ? 'bg-blue-50 border-blue-custom border-2 ' : 'bg-transparent'}`}
      onClick={handleClick}>
      <span className="text-sm">{description}</span>
    </div>
  )
}