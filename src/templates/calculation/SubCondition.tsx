import { Box, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import { SelectController } from "../../app/condition3/components/SelectController"
import { getInput , getQuestion, getCondition } from "../../app/condition3/components/GetConditionInput"
import { useFormContext, useWatch } from "react-hook-form"
import type React from "react"

type SubConditionProps = {
//   key: number
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
//   key,
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
    <Box
    //   key={key}
      sx={{
        mb: 1,
        ml: { md: 2 },
        mt: 1,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "start" }}>
        {subIndex === 0 && (
          <Typography
            sx={{
              color: "#393939",
              fontSize: "14px",
              width: {xs: 22,md : 83},
              pt: 2,
            }}
          >
            اگر
          </Typography>
        )}
        {subIndex > 0 && (
          <SelectController
            name={`conditions.${index}.subConditions.${subIndex}.logicalOperator`}
            options={[
              { value: "&&", label: "و" },
              { value: "||", label: "یا" },
            ]}
            sx={{ minWidth: 78,mr: 1 }}
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
        <SelectController
          name={`conditions.${index}.subConditions.${subIndex}.questionType`}
          options={qacWithOutFilterOptions}
          isLoading={isFetchingQacWithOutFilter}
          sx={{
            width: { sm: "100%", md: "100%" },
            minWidth: 240,
            flexShrink: 0,
          }}
          onChange={() => {
            setValue(
              `conditions.${index}.subConditions.${subIndex}.operatorType`,
              ""
            );
            setValue(
              `conditions.${index}.subConditions.${subIndex}.conditionType`,
              ""
            );
            setValue(
              `conditions.${index}.subConditions.${subIndex}.value`,
              ""
            );
          }}
        />
        <SelectController
          name={`conditions.${index}.subConditions.${subIndex}.operatorType`}
          options={getQuestion(
            currentValues.questionType,
            currentValues
          )}
          sx={{
            width: { sm: "100%", md: "22%" },
            minWidth: 156,
            flexShrink: 0,
          }}
          onChange={() => {
            setValue(
              `conditions.${index}.subConditions.${subIndex}.conditionType`,
              ""
            );
            setValue(
              `conditions.${index}.subConditions.${subIndex}.value`,
              ""
            );
          }}
          disabled={!Boolean(currentValues.questionType)}
        />
        <SelectController
          name={`conditions.${index}.subConditions.${subIndex}.conditionType`}
          options={getCondition(
            currentValues.questionType,
            currentValues.operatorType,
            currentValues
          )}
          sx={{
            width: { sm: "100%", md: "22%" },
            minWidth: 156,
            flexShrink: 0,
          }}
          onChange={() => {
            setValue(
              `conditions.${index}.subConditions.${subIndex}.value`,
              ""
            );
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
        <Box
          sx={{
            display : "flex",
            gap: 1,
          }}
        >
          <IconButton
            onClick={onAddSubCondition}
            sx={{
              width: "52px",
              height: "52px",
              bgcolor: "#1758BA0D",
              borderRadius: "10px",
              border: "1px solid #1758BA",
            }}
          >
            <Image
               src="/images/home-page/Add-fill.svg" 
              alt=""
              width={22}
              height={22}
            />
          </IconButton>
          {subIndex !== 0 && (
            <IconButton
            onClick={onRemoveSubCondition}
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
              <Image
               src="/images/home-page/trash.svg"
                alt=""
                width={24}
                height={24}
              />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}

