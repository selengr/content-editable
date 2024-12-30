const page = () => {
    return (
        <div dir="rtl" className="bg-[#F7F7FF] rounded-lg p-[10px] flex flex-col justify-center items-center w-full gap-3" >
            {[1, 1, 5, 545, 12, 12].map((item, index) => {
                return <div className="bg-white rounded-lg p-[10px] h-14 flex justify-between w-full border-[1px] border-[#1758BA]">
                    <div className="flex justify-center items-center gap-[10px]">
                        <div className="bg-[#F7F7FF] h-8 w-8 rounded-[10px] flex justify-center items-center">{index}</div>
                        <div className="flex flex-col">
                            <h3 className="text-[#161616] text-sm">محاسبه بر روی سوالات یک تا پنج</h3>
                            <span className="text-[#393939] text-xs">#محاسبه گر</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-[10px]">
                        <div className="bg-[#F7F7FF] h-8 w-8 rounded-[10px] flex justify-center items-center">{index}</div>
                        <div className="bg-[#F7F7FF] h-8 w-8 rounded-[10px] flex justify-center items-center">{index}</div>
                    </div>
                </div>
            })}
        </div>
    );
}

export default page;