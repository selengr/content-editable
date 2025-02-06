
import { useQuery } from '@tanstack/react-query';

const baseUrl = 'http://localhost:3000/api/question/q-and-c-custom-combo';
const customComboFilterModel = {
  type: "COMBO",
  entity: "QUESTIONS",
  mode: "QUESTIONS_IN_FORM_BUILDER__ALL",
  input: "",
  page: 0,
  rows: 10000,
  extMap: {
    formId: 81,
    typeRequest: "ONLY_ALL_QUESTIONS" 
  }
};

const queryString = `?customComboFilterModel=${encodeURIComponent(JSON.stringify(customComboFilterModel))}`;
const url = baseUrl + queryString;


const fetchData = async (url : string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


export const useGetOnlyAllQuestions = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['ONLY_ALL_QUESTIONS'],
    queryFn: () => fetchData(url),
    staleTime: 0,
    gcTime: 600000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3
  });

  const onlySomeQuestionsOptions = data?.dataList?.map((item) => {
    const extMap = item.extMap || {};
    const {
      TEXT_FIELD_PATTERN = '',
      SPECTRAL_TYPE = '',
      MULTI_SELECT = '0', // Default to '0' if missing
      UNIC_NAME = ''
    } = extMap;

    

    // Convert MULTI_SELECT to number safely
    const multiSelectValue = parseInt(MULTI_SELECT, 10) || 0;
    const isMultiSelect = !multiSelectValue;
    const isSpectralSingle = SPECTRAL_TYPE.trim().toUpperCase() === "DISCRETE";
    const isTextFieldNumber = TEXT_FIELD_PATTERN.trim().toUpperCase() === "NUMBER";

    const questionType = (isTextFieldNumber || isMultiSelect || isSpectralSingle)
      ? UNIC_NAME
      : '';

    return {
      value: questionType,
      label: item.caption,
    };
  })?.filter((item) => {
    return item.value !== '';
  });

  return {
    isFetchingOnlyAllQuestions: isFetching,
    onlyAllQuestions: data?.dataList,
    onlyAllQuestionsOptions: data?.dataList?.map((item) => ({
      value: item.extMap?.UNIC_NAME,
      label: item.caption,
    })),
    onlySomeQuestionsOptions
  };
};