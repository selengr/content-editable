

export default function PaymentPage() {

    return (
        <div className="container mx-auto py-8 flex justify-center items-center h-screen bg-white">

            <div className="w-[70%] p-2">

                   <div className="w-full justify-center items-center">
                   <div className="bg-[#F7F7FF] rounded-lg w-ful h-[52px text-center] mb-5">
                            <h3 className="text-[#161616] font-bold text-base">سبد خرید</h3>
                    </div>
                    <div className="px-16">
                        {[1,2,3,4,5].map(()=>(
                            <div className="rounded-[20px] border-[1px] border-[#DDE1E6] h-[84px]">

                            </div>
    ))}
                    </div>
                   </div>
            </div>

            <div className="w-[30%]">

            </div>
         </div>
    )
}