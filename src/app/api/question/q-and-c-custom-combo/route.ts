export const dynamic = 'force-static'


import JSONData_First from "../../../../../public/assets/fake-data/first.json";

export async function GET(request) {
   const url = new URL(request.url);

  const data = await JSONData_First
 
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Set-Cookie': `token` 
    },
  });

}