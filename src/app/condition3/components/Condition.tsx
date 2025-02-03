import { useFieldArray, useFormContext } from "react-hook-form"
import { Box, Typography, IconButton } from "@/components/ui"
import { SubCondition } from "./SubCondition"
import { CustomSelectController } from "./CustomSelectController"
import { CircleDivider } from "./CircleDivider"
import { useGetOnlyAllQuestions } from "../hooks/useGetOnlyAllQuestions"

interface ConditionProps {
  index: number
  onRemove: () => void
}

export function Condition({ index, onRemove }: ConditionProps) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `conditions.${index}.subConditions`,
  })

  const { onlyAllQuestionsOptions, isFetchingOnlyAllQuestions } = useGetOnlyAllQuestions()

  const handleAddSubCondition = () => {
    append({
      logicalOperator: fields.length > 0 ? "&&" : "",
      questionType: "",
      operatorType: "",
      conditionType: "",
      value: "",
      id: Date.now().toString(),
    })
  }

  return (
    <Box className="w-full">
      {fields.map((subCondition, subIndex) => (
        <SubCondition
          key={subCondition.id}
          conditionIndex={index}
          subIndex={subIndex}
          onRemove={() => remove(subIndex)}
        />
      ))}
      <Box className="ml-0 md:ml-2 flex items-center gap-1 flex-wrap flex-col md:flex-row">
        <Typography className="text-gray-700 text-sm">برو به:</Typography>
        <CustomSelectController
          name={`conditions.${index}.returnQuestionId`}
          options={onlyAllQuestionsOptions}
          isLoading={isFetchingOnlyAllQuestions}
          className="min-w-[240px] ml-5"
        />
        <Typography className="text-gray-700 text-sm mr-4">در غیر اینصورت برو به:</Typography>
        <CustomSelectController
          name={`conditions.${index}.elseQuestionId`}
          options={onlyAllQuestionsOptions}
          isLoading={isFetchingOnlyAllQuestions}
          className="min-w-[300px] w-[360px]"
        />
        <IconButton
          onClick={onRemove}
          className="w-[113px] h-13 bg-red-100 rounded-lg border border-red-500 hover:bg-red-200"
        >
          <Typography className="text-red-500 text-sm">حذف این شرط</Typography>
        </IconButton>
      </Box>
      <CircleDivider />
    </Box>
  )
}

