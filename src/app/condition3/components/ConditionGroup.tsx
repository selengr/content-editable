import { Box, Typography, IconButton } from "@mui/material"
import Image from "next/image"
import { useFormContext, useWatch } from "react-hook-form"
import { CustomSelectController } from "@/components/ui/select-controller"
import { CircleDivider } from "@/components/ui/circle-divider"
import { getQuestion, getCondition, getInput } from "../utils/formUtils"
import TrashIcon from "@/public/images/home-page/trash.svg"
import PlusIcon from "@/public/images/home-page/Add-fill.svg"
import {
  qacWithOutFilterOptions,
  isFetchingQacWithOutFilter,
  onlyAllQuestionsOptions,
  isFetchingOnlyAllQuestions,
} from "../utils/formUtils"

export function ConditionGroup({ condition, index, onRemoveCondition, onAddSubCondition, onRemoveSubCondition }) {
  const { control, setValue } = useFormContext()
  const watchedValues = useWatch({ control })

  return (
    <Box key={condition.id} sx={{ width: "100%" }}>
      {condition.subConditions.map((subCondition, subIndex) => {
        const currentValues = watchedValues?.conditions?.[index]?.subConditions?.[subIndex] || {}

        return (
          <SubCondition
            key={subCondition.id}
            subCondition={subCondition}
            subIndex={subIndex}
            index={index}
            currentValues={currentValues}
            onAddSubCondition={onAddSubCondition}
            onRemoveSubCondition={onRemoveSubCondition}
          />
        )
      })}

      <ConditionFooter index={index} onRemoveCondition={onRemoveCondition} />
      <CircleDivider />
    </Box>
  )
}

function SubCondition({ subCondition, subIndex, index, currentValues, onAddSubCondition, onRemoveSubCondition }) {
  const { control, setValue } = useFormContext()

  return (
    <Box
      sx={{
        mb: 1,
        ml: { md: 2 },
        mt: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "start" }}>
        {subIndex === 0 ? (
          <Typography
            sx={{
              color: "#393939",
              fontSize: "14px",
              width: { xs: 22, md: 83 },
              pt: 2,
            }}
          >
            اگر
          </Typography>
        ) : (
          <CustomSelectController
            name={`conditions.${index}.subConditions.${subIndex}.logicalOperator`}
            options={[
              { value: "&&", label: "و" },
              { value: "||", label: "یا" },
            ]}
            sx={{ minWidth: 78, mr: 1 }}
          />
        )}
      </Box>

      <Box
        rowGap={3}
        columnGap={2}
        sx={{
          gap: 1,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <CustomSelectController
          name={`conditions.${index}.subConditions.${subIndex}.questionType`}
          options={qacWithOutFilterOptions}
          isLoading={isFetchingQacWithOutFilter}
          sx={{
            width: { sm: "100%", md: "100%" },
            minWidth: 240,
            flexShrink: 0,
          }}
          onChange={() => {
            setValue(`conditions.${index}.subConditions.${subIndex}.operatorType`, "")
            setValue(`conditions.${index}.subConditions.${subIndex}.conditionType`, "")
            setValue(`conditions.${index}.subConditions.${subIndex}.value`, "")
          }}
        />
        <CustomSelectController
          name={`conditions.${index}.subConditions.${subIndex}.operatorType`}
          options={getQuestion(currentValues.questionType, currentValues)}
          sx={{
            width: { sm: "100%", md: "22%" },
            minWidth: 156,
            flexShrink: 0,
          }}
          onChange={() => {
            setValue(`conditions.${index}.subConditions.${subIndex}.conditionType`, "")
            setValue(`conditions.${index}.subConditions.${subIndex}.value`, "")
          }}
          disabled={!Boolean(currentValues.questionType)}
        />
        <CustomSelectController
          name={`conditions.${index}.subConditions.${subIndex}.conditionType`}
          options={getCondition(currentValues.questionType, currentValues.operatorType, currentValues)}
          sx={{
            width: { sm: "100%", md: "22%" },
            minWidth: 156,
            flexShrink: 0,
          }}
          onChange={() => {
            setValue(`conditions.${index}.subConditions.${subIndex}.value`, "")
          }}
          disabled={!Boolean(currentValues.operatorType)}
        />
        {getInput(currentValues.questionType, currentValues.operatorType, currentValues.conditionType, {
          name: `conditions.${index}.subConditions.${subIndex}.value`,
          key: subCondition.id,
        })}
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <IconButton
            onClick={() => onAddSubCondition(index, subIndex)}
            sx={{
              width: "52px",
              height: "52px",
              bgcolor: "#1758BA0D",
              borderRadius: "10px",
              border: "1px solid #1758BA",
            }}
          >
            <Image src={PlusIcon || "/placeholder.svg"} alt="" width={22} height={22} />
          </IconButton>
          {subIndex !== 0 && (
            <IconButton
              onClick={() => onRemoveSubCondition(index, subIndex)}
              sx={{
                width: "52px",
                height: "52px",
                bgcolor: "#FA4D560D",
                borderRadius: "10px",
                border: "1px solid #FA4D56",
                "&: hover": {
                  bgcolor: "#FA4D560D",
                },
              }}
            >
              <Image src={TrashIcon || "/placeholder.svg"} alt="" width={24} height={24} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  )
}

function ConditionFooter({ index, onRemoveCondition }) {
  return (
    <Box
      sx={{
        ml: { xs: 0, md: 2 },
        display: "flex",
        alignItems: "center",
        gap: 1,
        flexWrap: "wrap",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Typography sx={{ color: "#393939", fontSize: "14px" }}>برو به:</Typography>

      <CustomSelectController
        name={`conditions.${index}.returnQuestionId`}
        options={onlyAllQuestionsOptions}
        isLoading={isFetchingOnlyAllQuestions}
        sx={{ minWidth: 240, ml: 5 }}
      />
      <Typography sx={{ color: "#393939", fontSize: "14px", mr: 4 }}>در غیر اینصورت برو به:</Typography>

      <CustomSelectController
        name={`conditions.${index}.elseQuestionId`}
        options={onlyAllQuestionsOptions}
        isLoading={isFetchingOnlyAllQuestions}
        sx={{ minWidth: 300, width: 360 }}
      />

      <IconButton
        onClick={() => onRemoveCondition(index)}
        sx={{
          width: 113,
          height: "52px",
          bgcolor: "#FA4D560D",
          borderRadius: "8px",
          border: "1px solid #FA4D56",
          "&: hover": {
            bgcolor: "#FA4D560D",
          },
        }}
      >
        <Typography sx={{ color: "#FA4D56", fontSize: "14px" }}>حذف این شرط</Typography>
      </IconButton>
    </Box>
  )
}

