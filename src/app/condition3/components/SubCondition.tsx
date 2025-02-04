import { Box, IconButton } from "@mui/material"
import Image from "next/image"
import { CustomSelectController } from "./form/select-controller"
import { getQuestion, getCondition } from "../utils/formUtils"
import { getInput } from "../utils/inputUtils"
import { useFormContext, useWatch } from "react-hook-form"
import type React from "react"

type SubConditionProps = {
  index: number
  subIndex: number
  onAddSubCondition: () => void
  onRemoveSubCondition: () => void
  qacWithOutFilterOptions: any[]
  isFetchingQacWithOutFilter: boolean
  onlySomeQuestionsOptions: any[]
  isFetchingOnlyAllQuestions: boolean
  onlyAllCalculationOptions: any[]
  isFetchingOnlyAllCalculation: boolean
  onlyAllQuestions: any[]
}

export const SubCondition: React.FC<SubConditionProps> = ({
  index,
  subIndex,
  onAddSubCondition,
  onRemoveSubCondition,
  qacWithOutFilterOptions,
  isFetchingQacWithOutFilter,
  onlySomeQuestionsOptions,
  isFetchingOnlyAllQuestions,
  onlyAllCalculationOptions,
  isFetchingOnlyAllCalculation,
  onlyAllQuestions,
}) => {
  const { control, setValue } = useFormContext()
  const currentValues = useWatch({
    control,
    name: `conditions.${index}.subConditions.${subIndex}`,
  })

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "flex-start" }}>
      {subIndex > 0 && (
        <CustomSelectController
          name={`conditions.${index}.subConditions.${subIndex}.logicalOperator`}
          options={[
            { value: "&&", label: "و" },
            { value: "||", label: "یا" },
          ]}
          sx={{ minWidth: 78 }}
        />
      )}
      <CustomSelectController
        name={`conditions.${index}.subConditions.${subIndex}.questionType`}
        options={qacWithOutFilterOptions}
        isLoading={isFetchingQacWithOutFilter}
        sx={{ minWidth: 240 }}
        onChange={() => {
          setValue(`conditions.${index}.subConditions.${subIndex}.operatorType`, "")
          setValue(`conditions.${index}.subConditions.${subIndex}.conditionType`, "")
          setValue(`conditions.${index}.subConditions.${subIndex}.value`, "")
        }}
      />
      <CustomSelectController
        name={`conditions.${index}.subConditions.${subIndex}.operatorType`}
        options={getQuestion(currentValues.questionType, currentValues)}
        sx={{ minWidth: 156 }}
        onChange={() => {
          setValue(`conditions.${index}.subConditions.${subIndex}.conditionType`, "")
          setValue(`conditions.${index}.subConditions.${subIndex}.value`, "")
        }}
        disabled={!Boolean(currentValues.questionType)}
      />
      <CustomSelectController
        name={`conditions.${index}.subConditions.${subIndex}.conditionType`}
        options={getCondition(currentValues.questionType, currentValues.operatorType, currentValues)}
        sx={{ minWidth: 156 }}
        onChange={() => {
          setValue(`conditions.${index}.subConditions.${subIndex}.value`, "")
        }}
        disabled={!Boolean(currentValues.operatorType)}
      />
      {getInput(
        currentValues.questionType,
        currentValues.operatorType,
        currentValues.conditionType,
        {
          name: `conditions.${index}.subConditions.${subIndex}.value`,
        },
        {
          onlySomeQuestionsOptions,
          isFetchingOnlyAllQuestions,
          onlyAllCalculationOptions,
          isFetchingOnlyAllCalculation,
          onlyAllQuestions,
          control,
          setValue,
        },
      )}
      <IconButton
        onClick={onAddSubCondition}
        sx={{ bgcolor: "#1758BA0D", borderRadius: "10px", border: "1px solid #1758BA" }}
      >
        <Image src="/images/home-page/Add-fill.svg" alt="" width={22} height={22} />
      </IconButton>
      {subIndex !== 0 && (
        <IconButton
          onClick={onRemoveSubCondition}
          sx={{
            bgcolor: "#FA4D560D",
            borderRadius: "10px",
            border: "1px solid #FA4D56",
            "&:hover": { bgcolor: "#FA4D560D" },
          }}
        >
          <Image src="/images/home-page/trash.svg" alt="" width={24} height={24} />
        </IconButton>
      )}
    </Box>
  )
}

