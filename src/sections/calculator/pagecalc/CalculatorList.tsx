"use client";

import { ICalculator } from "@/types/calculator";
import { CalculatorCard } from "./CalculatorCard";

interface ICalculatorListProps {
  calculators: ICalculator[] | any;
}

const CalculatorList: React.FC<ICalculatorListProps> = ({ calculators }) => {
  console.log("calculators reza :>> ", calculators);
  return (
    <div
      dir="rtl"
      className="bg-[#F7F7FF] rounded-lg p-[10px] max-w-md flex flex-col w-full gap-3"
    >
      {calculators?.map((calculator: ICalculator) => (
        { calculator.name && <CalculatorCard calculator={calculator} /> }
      ))}
    </div>
  );
};

export default CalculatorList;
