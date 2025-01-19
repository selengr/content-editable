import { SelectOption } from '../types/form-types';

export const formConfig = {
  MULTIPLE_CHOICE: {
    operators: [
      { value: 'VALUE', label: 'ارزش' },
      { value: 'QUESTION', label: 'سوال ' },
      { value: 'CALCULATION', label: 'محاسبه‌گر' },
      { value: 'OPTION', label: 'گزینه' }
    ],
    conditions: {
      VALUE: [
        { value: 'greater', label: 'بزرگتر بود' },
        { value: 'less', label: 'کوچکتر بود از' },
        { value: 'equal', label: 'برابر بود با' },
        { value: 'not_equal', label: 'نابرابر بود با' }
      ],
      QUESTION: [
        { value: 'greater', label: 'بزرگتر بود' },
        { value: 'less', label: 'کوچکتر بود از' },
        { value: 'equal', label: 'برابر بود با' },
        { value: 'not_equal', label: 'نابرابر بود با' }
      ],
      CALCULATION: [
        { value: 'greater', label: 'بزرگتر بود' },
        { value: 'less', label: 'کوچکتر بود از' },
        { value: 'equal', label: 'برابر بود با' },
        { value: 'not_equal', label: 'نابرابر بود با' }
      ],
      OPTION: [
        { value: 'greater', label: 'بزرگتر بود' },
        { value: 'less', label: 'کوچکتر بود از' },
        { value: 'equal', label: 'برابر بود با' },
        { value: 'not_equal', label: 'نابرابر بود با' }
      ]
    }
  },
  TEXT_FIELD: {
    operators: [
      { value: 'VALUE', label: 'ارزش' },
      { value: 'TEXT', label: 'متنی' }
    ],
    conditions: {
      VALUE: [
        { value: 'lenEqualText', label: 'طول متن برابر با ' },
        { value: 'lenGraterThan', label: 'طول متن بیشتر از' },
        { value: 'lenLessThanText', label: ' طول متن کمتر از' }
      ],
      TEXT: [
        { value: 'startWith', label: 'شروع شدن با ' },
        { value: 'endWith', label: 'پایان یافتن با' },
        { value: 'containAny', label: 'شامل شدن' },
        { value: 'not_containAny', label: 'شامل نشدن' }
      ]
    }
  }
};

export const getOperators = (questionType: string): SelectOption[] => {
  return formConfig[questionType as keyof typeof formConfig]?.operators || [];
};

export const getConditions = (questionType: string, operatorType: string): SelectOption[] => {
  return formConfig[questionType as keyof typeof formConfig]?.conditions[operatorType] || [];
};

