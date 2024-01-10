'use client'
import { useState } from "react";
import { StarActive } from "@/app/svg/star-active";
import { StarInactive } from "@/app/svg/star-inactive";

interface StarsProps {
  initialValue?: number;
  onStarsChange?: (stars: number) => void;
}

export const Stars = ({ initialValue = 0, onStarsChange }: StarsProps) => {
  const [value, setValue] = useState(initialValue);
  const [hoverValue, setHoverValue] = useState(-1);

  const handleMouseOver = (index: number) => {
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(-1);
  };

  const handleClick = (index: number) => {
    const newValue = index + 1;
    setValue(newValue);
    if (onStarsChange) {
      onStarsChange(newValue);
      console.log(newValue)
    }
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

  return <div className="sm:grid sm:grid-cols-5 sm:gap-11 md:flex">{stars}</div>
};
