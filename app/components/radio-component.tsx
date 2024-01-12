import { RadioGroupConst } from "../constants/radio-group";
import { RadioGroup } from "./radio-group";

interface RadioProps {
  content: string;
  initialValue: number;
  onRadioChange: (stars: number) => void;
}

export const RadioComponent = ({ content, initialValue, onRadioChange }: ComponentsProps) => {
  return (
    <section>
      <div className="space-y-[9px]">
        <h2 className="font-semibold text-2xl leading-[30px] text-blue-400">
          Questões que tem os rádios fixos de 1 até 10
        </h2>
        <p className="text-sm leading-[21px]">
          {content}
        </p>
      </div>

      <div className="flex pt-4 w-full justify-between">
        <RadioGroup
          options={RadioGroupConst}
          initialValue={initialValue!}
          name="rating"
          onRadioChange={() => onRadioChange} />
      </div>
    </section>
  )
}