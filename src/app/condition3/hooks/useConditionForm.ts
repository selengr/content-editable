import { v4 as uuidv4 } from "uuid";
import type { FormData } from "../types/form"
import {
    useForm,
    useFieldArray,
    Controller,
    FormProvider,
    useWatch,
  } from "react-hook-form";


export function useConditionForm(conditions : any, setConditions) {
    const {
        fields: conditions,
        append: appendCondition,
        remove: removeCondition,
        update: updateCondition,
      } = useFieldArray({
        control,
        name: "conditions",
      });

      
    const handleAddCondition = () => {
        appendCondition({
          subConditions: [
            {
              logicalOperator: "",
              questionType: "",
              operatorType: "",
              conditionType: "",
              value: "",
              id: uuidv4(),
            },
          ],
          elseQuestionId: "",
          returnQuestionId: "",
        });
      };
    
      const handleRemoveCondition = (index: number) => {
        removeCondition(index);
      };
    

      const onSubmit = (input: FormData) => {
    
        const transformInputToOutput = (input) => {
          return input.conditions.map((condition) => {
            const { subConditions, returnQuestionId, elseQuestionId } = condition;
    
            const conditionFormula = subConditions
              .map((subCondition) => {
                const {
                  conditionType,
                  questionType,
                  operatorType,
                  value,
                  logicalOperator,
                } = subCondition;
                console.log(
                  "val  formatContainText(value)45645",
                  formatContainText(value)
                );
    
                let formattedValue: string;
    
                if (operatorType === "OPTION") {
                  formattedValue = `{${value}}`;
                } else if (operatorType === "VALUE") {
                  formattedValue = `{#v_${value}}`;
                } else if (operatorType === "TEXT") {
                  if (
                    conditionType === "#startWithText" ||
                    conditionType === "#endWithText"
                  ) {
                    formattedValue = `{"${value}"}`;
                  } else if (
                    conditionType === "!#containAnyText" ||
                    conditionType === "#containAnyText"
                  ) {
                    formattedValue = `{${formatContainText(value)}}`;
                  } else if (
                    conditionType === "#lenEqualText" ||
                    conditionType === "#lenGraterThanText" ||
                    conditionType === "!#lenGraterThanText"
                  ) {
                    formattedValue = `{#v_${value}}`;
                  } else {
                    formattedValue = value;
                  }
                } else if (operatorType === "DATE") {
                  formattedValue = `{#v_"${value}"}`;
                } else {
                  formattedValue = value;
                }
    
                const baseCondition = `${conditionType}(${
                  questionType.split("*")[1]
                },${formattedValue})`;
    
                return logicalOperator
                  ? ` ${logicalOperator} ${baseCondition}`
                  : baseCondition;
              })
              .join("");
    
            return {
              conditionFormula: conditionFormula,
              formBuilderId: 81,
              returnQuestionId: condition.returnQuestionId,
              elseQuestionId: condition.elseQuestionId,
            };
          });
        };
    
        const output = transformInputToOutput(input);
        console.log(output);
      };

  return { handleAddCondition, handleRemoveCondition, onSubmit }
}

