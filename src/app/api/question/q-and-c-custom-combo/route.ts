import { type NextRequest } from 'next/server'
import JSONData_goTo from "../../../../../public/assets/fake-data/goTo.json";
import JSONData_First from "../../../../../public/assets/fake-data/first.json";
import JSONData_Calc from "../../../../../public/assets/fake-data/calcList.json";


export const dynamic = 'force-dynamic'

  export async function GET(request:NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const customComboFilterModel = searchParams.get('customComboFilterModel')

   
  let responseData = {}

  if (customComboFilterModel) {
    try {
      const parsedModel = JSON.parse(decodeURIComponent(customComboFilterModel));
      if (parsedModel.extMap && parsedModel.extMap.typeRequest) {
        const typeRequest = parsedModel.extMap.typeRequest;

        if (typeRequest === "QAC_WIHT_OUT_FILTER") {
          responseData = JSONData_First
        } else if(typeRequest === "ONLY_ALL_QUESTIONS") {
          responseData = JSONData_goTo
        } else if(typeRequest === "ONLY_ALL_CALC") {
          responseData = JSONData_Calc
        }
      }
    } catch (error) {
      console.error("Error parsing customComboFilterModel:", error);

      return new Response(JSON.stringify({ error: "Invalid query parameter" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify(responseData), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json', 
      'Set-Cookie': `token` 
    },
  });

}