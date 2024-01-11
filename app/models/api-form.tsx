export interface ItensInsideItensProps {
  value: number;
  description: string;
}

export interface ItensProps {
  typeQuestion: number;
  answerValue: any;
  mandatory: boolean;
  content: string;
  horizontal?: boolean;
  itens: ItensInsideItensProps[];
}

export interface APIProps {
  itens?: ItensProps[];
  error: string;
  warning: string;
}

export interface FormType {
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

export interface FormularioObjeto {
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
