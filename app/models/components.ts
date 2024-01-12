interface ComponentsProps {
  content?: string;
  initialValue?: number;
  checked?: any;
  horizontal?: boolean;
  data?: any[];
  selected?: boolean;
  label1?: string;
  label2?: string;
  onStarsChange?: (stars: number) => void;
  onRadioChange?: (stars: number) => void;
  onChange?: (stars: number) => void;
}
