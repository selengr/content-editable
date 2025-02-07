import Image from "next/image";
import { TConditionData } from "@/app/condition3/schemas/conditionFormSchema";


export function ConditionCard({ condition } : { condition : TConditionData} ) {
    console.log("conditions reza ============== :>> ", condition);
    console.log("conditions item.questionType ============== :>> ", condition.subConditions[0].questionType.split("@"[1]))
  return (
    <div key={condition.elseQuestionId} className="bg-white rounded-lg p-[10px] h-14 flex justify-between w-full cursor-pointer border-[1px] border-[#1758BA]">
      <div className="flex justify-center items-center gap-[10px]">
        <div className="bg-[#F7F7FF] h-8 w-8 rounded-[10px] flex justify-center items-center">{condition.elseQuestionId}</div>
        <div className="flex flex-col">
          {condition?.subConditions?.map((item)=>(
            <>
             <span className="text-[#161616] text-sm">{item.logicalOperator.split("@")[1] ?? "اگر"}</span>
             <span className="text-[#1758BA] text-sm">{item.questionType.split("@")[1]}</span>
             <span className="text-[#161616] text-sm">{item.conditionType.split("@")[1]}</span>
             <span className="text-[#1758BA] text-sm">{item.value}</span>
            </>
          ))}
           <span className="text-[#161616] text-sm">{condition.returnQuestionId.split("@")[1]}</span>
           <span className="text-[#161616] text-sm">{condition.elseQuestionId.split("@")[1]}</span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-[10px]">
        <button 
          className="bg-[#F7F7FF] h-8 w-8 rounded-[10px] flex justify-center items-center"

        >
           <Image
            src={"/images/calc/math.svg"}
            width={25}
            height={25}
             alt="math" 
        />

        </button>
        <div className="bg-[#F7F7FF] h-8 w-8 rounded-[10px] flex justify-center items-center">1</div>
      </div>
    </div>
  )
}

