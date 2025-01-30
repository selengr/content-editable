
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch('http://localhost:3000/api/question/q-and-c-custom-combo?customComboFilterModel=%7B%22type%22%3A%22COMBO%22%2C%22entity%22%3A%22QUESTIONS%22%2C%22mode%22%3A%22QUESTIONS_IN_FORM_BUILDER__ALL%22%2C%22input%22%3A%22%22%2C%22page%22%3A0%2C%22rows%22%3A10000%2C%22extMap%22%3A%7B%22formId%22%3A81%2C%22typeRequest%22%3A%22QAC_WIHT_OUT_FILTER%22%7D%7D');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};



export const useGetQacWithOutFilter = () => {

  const { data, isFetching } = useQuery({
    queryKey: ['QAC_WIHT_OUT_FILTER'],
    queryFn: () => fetchData(),
    staleTime: 0,
    gcTime: 600000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3
  });

  return {
    isFetchingQacWithOutFilter: isFetching,
    qacWithOutFilter: data?.dataList,
  };
};
