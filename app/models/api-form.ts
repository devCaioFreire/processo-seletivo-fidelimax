export interface FormResponse {
  stars: number;
  radio: number;
  review: string;
  select: any;
  singleChoice: any;
  multipleChoiceBadge: number[];
  multipleChoiceCheckbox: number[];
  textQuestion1: string;
  textQuestion2: string;
  [key: string]: any;
}

export interface APIProps {
  itens?: ItensProps[];
  error: string;
  warning: string;
}

export interface FormDataInterface {
  stars: ItensProps,
  radio: ItensProps,
  review: ItensProps;
  select: ItensProps,
  singleChoice: ItensProps,
  multipleChoiceBadge: ItensProps,
  multipleChoiceCheckbox: ItensProps,
  textQuestion1: ItensProps,
  textQuestion2: ItensProps,
  [key: string]: any;
}

export interface ItensProps {
  [key: string]: any;
  typeQuestion: number;
  answerValue?: any;
  mandatory: boolean;
  content: string;
  horizontal?: boolean;
  itens: ItensPropsItens[];
}

export interface ItensPropsItens {
  value: number;
  description: string;
}