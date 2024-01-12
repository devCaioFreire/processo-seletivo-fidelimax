'use client'
import { useState } from "react";
import { StarActive } from "@/app/svg/star-active";
import { StarInactive } from "@/app/svg/star-inactive";

export const StarComponent = ({ initialValue = 0, onStarsChange }: ComponentsProps) => {
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

  return (
    <section>
      <div className="space-y-[9px]">
        <h2 className="font-semibold text-2xl leading-[30px] text-blue-400">
          Questões de estrela
        </h2>
        <p className="text-sm leading-[21px]">
          { }
        </p>
      </div>

      <div className="pt-4 pb-10 sm:grid sm:grid-cols-3 md:flex">
        {stars}
      </div>
    </section>
  )
};
