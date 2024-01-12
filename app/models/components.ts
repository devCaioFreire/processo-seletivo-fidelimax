import { ChangeEvent } from "react";
import { FormResponse } from "./api-form";

export interface ComponentsProps {
  content?: string;
  initialValue?: number | string;
  checked?: any;
  horizontal?: boolean;
  data?: any[];
  selected?: boolean;
  label1?: string;
  label2?: string;
  updateForm?: (newResponse: Partial<FormResponse>) => void;
  onStarsChange?: (stars: number) => void;
  onRadioChange?: (stars: number) => void;
  onTextChange?: (newValue: string) => void;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement> | string | number | number[] | undefined) => void;
  onMultipleChange?: (value: string | number, checked: boolean) => void;
}
