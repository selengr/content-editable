
  
  export interface ExtMap {
    QUESTION_TYPE?: string;
    DESCRIPTION?: string;
    MAXIMUM_LEN?: string;
    UNIC_NAME?: string;
    REQUIRED?: string;
    MINIMUM_LEN?: string;
    TEXT_FIELD_PATTERN?: string;
    MULTI_SELECT?: string;
    OPTIONS?: {
      [key: string]: [number, string];
    };
    OPTIONS_SIZE?: number;
    FORMULA?: string;
  }
  
  export interface IQuestionType {
    value: string;
    caption: string;
    elementStr: string;
    extMap: ExtMap;
  }
  
  export interface SelectOption {
    value: string;
    label: string;
  }



  export interface SelectOption {
    value: string;
    label: string;
  }
  
  export interface QuestionType {
    value: string;
    label: string;
    elementStr: string;
    extMap: {
      QUESTION_TYPE?: string;
    };
  }
  
  export interface FormState {
    questionType: string;
    operatorType: string;
    conditionType: string;
    inputValue: string | number;
  }
  
  export type FormAction =
    | { type: 'SET_QUESTION_TYPE'; payload: string }
    | { type: 'SET_OPERATOR_TYPE'; payload: string }
    | { type: 'SET_CONDITION_TYPE'; payload: string }
    | { type: 'SET_INPUT_VALUE'; payload: string | number };
  
  