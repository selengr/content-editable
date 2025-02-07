"use client";

import { ICalculator } from "@/types/calculator";
import { ConditionCard } from "./ConditionCard";
import CreateCalculator from "./CreateCalculator";

interface ICalculatorListProps {
  calculators: ICalculator[] | any;
}

const ConditionList: React.FC<ICalculatorListProps> = ({ calculators }) => {
  console.log("calculators reza :>> ", calculators);
  return (
    <div className="w-full max-w-md flex flex-col">
      <div
        dir="rtl"
        className="bg-[#F7F7FF] rounded-lg p-[10px] w-full flex flex-col gap-3"
      >
        {calculators?.map((calculator: ICalculator) => (
          <>{calculator.name && <ConditionCard calculator={calculator} />}</>
        ))}

      </div>
      <CreateCalculator />
    </div>
  );
};

export default ConditionList;
