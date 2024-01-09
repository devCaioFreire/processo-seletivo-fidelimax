'use client'
import { useState } from "react";
import { StarActive } from "@/app/svg/star-active";
import { StarInactive } from "@/app/svg/star-inactive";

interface StarsProps {
  initialValue?: number;
}

export const Stars = ({ initialValue = 0 }: StarsProps) => {
  const [value, setValue] = useState(initialValue);
  const [hoverValue, setHoverValue] = useState(-1);

  const handleMouseOver = (index: number) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(-1);
  };

  const handleClick = (index: number) => {
    setValue(index + 1);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      onMouseOver={() => handleMouseOver(index)}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleClick(index)}
      className="transition-all cursor-pointer"
    >
      {hoverValue > index || value > index ? (
        <StarActive />
      ) : (
        <StarInactive />
      )}
    </div>
  ));

  return <div className="flex">{stars}</div>
};
