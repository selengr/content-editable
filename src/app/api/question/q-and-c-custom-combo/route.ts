export const dynamic = 'force-static'

import { type NextRequest } from 'next/server'
import JSONData_First from "../../../../../public/assets/fake-data/first.json";




  export async function GET(request:NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const customComboFilterModel = searchParams.get('customComboFilterModel')

   
  let responseJSONData_First = JSONData_First;
  let responseData = {}

  console.log("test====================================================>33",customComboFilterModel)
  
  if (customComboFilterModel) {
    try {
      const parsedModel = JSON.parse(decodeURIComponent(customComboFilterModel));
      responseData = responseJSONData_First
      if (parsedModel.extMap && parsedModel.extMap.typeRequest) {
        const typeRequest = parsedModel.extMap.typeRequest;

        if (typeRequest === "QAC_WIHT_OUT_FILTER") {
          responseData = responseJSONData_First
        } else {
          // You can add more conditions based on different typeRequest values
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