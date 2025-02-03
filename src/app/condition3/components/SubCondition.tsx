import { useFormContext, useWatch } from "react-hook-form"
import { Box, Typography } from "@/components/ui"
import { CustomSelectController } from "./CustomSelectController"
import { DynamicInput } from "./DynamicInput"
import { useGetQacWithOutFilter } from "../hooks/useGetQacWithOutFilter"
import { getQuestion, getCondition } from "../utils/formUtils"

interface SubConditionProps {
  conditionIndex: number
  subIndex: number
  onRemove: () => void
}

export function SubCondition({ conditionIndex, subIndex, onRemove }: SubConditionProps) {
  const { control, setValue } = useFormContext()
  const { qacWithOutFilterOptions, isFetchingQacWithOutFilter } = useGetQacWithOutFilter()

  const currentValues = useWatch({
    control,
    name: `conditions.${conditionIndex}.subConditions.${subIndex}`,
  })

  return (
    <Box className="mb-1 ml-0 md:ml-2 mt-1 flex flex-row">
      <Box className="flex items-start">
        {subIndex === 0 ? (
          <Typography className="text-gray-700 text-sm w-[22px] md:w-[83px] pt-2">اگر</Typography>
        ) : (
          <CustomSelectController
            name={`conditions.${conditionIndex}.subConditions.${subIndex}.logicalOperator`}
            options={[
              { value: "&&", label: "و" },
              { value: "||", label: "یا" },
            ]}
            className="min-w-[78px] mr-1"
          />
        )}
      </Box>
      <Box className="gap-1 w-full flex flex-wrap">
        <CustomSelectController
          name={`conditions.${conditionIndex}.subConditions.${subIndex}.questionType`}
          options={qacWithOutFilterOptions}
          isLoading={isFetchingQacWithOutFilter}
          className="w-full md:w-full min-w-[240px] flex-shrink-0"
          onChange={() => {
            setValue(`conditions.${conditionIndex}.subConditions.${subIndex}.operatorType`, "")
            setValue(`conditions.${conditionIndex}.subConditions.${subIndex}.conditionType`, "")
            setValue(`conditions.${conditionIndex}.subConditions.${subIndex}.value`, "")
          }}
        />
        <CustomSelectController
          name={`conditions.${conditionIndex}.subConditions.${subIndex}.operatorType`}
          options={getQuestion(currentValues.questionType, currentValues)}
          className="w-full md:w-[22%] min-w-[156px] flex-shrink-0"
          onChange={() => {
            setValue(`conditions.${conditionIndex}.subConditions.${subIndex}.conditionType`, "")
            setValue(`conditions.${conditionIndex}.subConditions.${subIndex}.value`, "")
          }}
          disabled={!currentValues.questionType}
        />
        <CustomSelectController
          name={`conditions.${conditionIndex}.subConditions.${subIndex}.conditionType`}
          options={getCondition(currentValues.questionType, currentValues.operatorType, currentValues)}
          className="w-full md:w-[22%] min-w-[156px] flex-shrink-0"
          onChange={() => {
            setValue(`conditions.${conditionIndex}.subConditions.${subIndex}.value`, "")
          }}
          disabled={!currentValues.operatorType}
        />
        <DynamicInput
          questionType={currentValues.questionType}
          operatorType={currentValues.operatorType}
          conditionType={currentValues.conditionType}
          name={`conditions.${conditionIndex}.subConditions.${subIndex}.value`}
        />
      </Box>
    </Box>
  )
}

