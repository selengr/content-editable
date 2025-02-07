"use client";

import { ConditionCard } from "./ConditionCard";
import CreateCalculator from "./CreateCalculator";
import { TConditionFormData, TConditionData } from "@/app/condition3/schemas/conditionFormSchema";

interface IConditionListProps {
  conditions: TConditionFormData[] | any;
}

const ConditionList: React.FC<IConditionListProps> = ({ conditions }) => {
  // console.log("conditions reza :>> ", conditions);
  return (
    <div className="w-full max-w-md flex flex-col">
      <div
        dir="rtl"
        className="bg-[#F7F7FF] rounded-lg p-[10px] w-full flex flex-col gap-3"
      >
        {conditions?.map((condition: TConditionData) => (
             <ConditionCard condition={condition} />
        ))}

      </div>
      <CreateCalculator />
    </div>
  );
};

export default ConditionList;
