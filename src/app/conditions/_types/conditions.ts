enum QuestionType {
    TEXT_FIELD = "TEXT_FIELD",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    MULTIPLE_CHOICE_IMAGE = "MULTIPLE_CHOICE_IMAGE",
    SPECTRAL = "SPECTRAL"
  }
  
  
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
  
  export interface DataItem {
    value: string;
    caption: string;
    elementStr: string;
    extMap: ExtMap;
  }
  
  export interface SelectOption {
    value: string;
    label: string;
  }

  interface DependentSelectFormProps {
    data: DataItem[]
  }