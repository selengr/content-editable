import type React from "react"
import { useFieldArray, useFormContext, Controller } from "react-hook-form"
import { Box, FormControl, IconButton, Typography } from "@mui/material"
import Image from "next/image"
import  CustomSelect  from "./custom-select"
import { getInput, getCondition, getQuestion, questionTypes } from "../utils/formUtils"
import PlusIcon from "@/../public/images/home-page/Add-fill.svg"
import TrashIcon from "@/../public/images/home-page/trash.svg"

interface SubConditionProps {
  conditionIndex: number
  subIndex: number
}

export const SubCondition: React.FC<SubConditionProps> = ({ conditionIndex, subIndex }) => {
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `conditions.${conditionIndex}.subConditions`,
  })

  const questionType = watch(`conditions.${conditionIndex}.subConditions.${subIndex}.questionType`)
  const operatorType = watch(`conditions.${conditionIndex}.subConditions.${subIndex}.operatorType`)
  const conditionType = watch(`conditions.${conditionIndex}.subConditions.${subIndex}.conditionType`)

  return (
    <Box sx={{ mb: 2, display: "flex", flexDirection: "row" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {subIndex === 0 && <Typography sx={{ color: "#393939", fontSize: "14px", width: 90 }}>اگر</Typography>}
        {subIndex > 0 && (
          <Controller
            name={`conditions.${conditionIndex}.subConditions.${subIndex}.logicalOperator`}
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                options={[
                  { value: "AND", label: "و" },
                  { value: "OR", label: "یا" },
                ]}
                sx={{ minWidth: 78 }}
              />
            )}
          />
        )}
      </Box>
      <Box rowGap={3} columnGap={2} display="flex">
        <FormControl sx={{ minWidth: 200 }}>
          <Controller
            name={`conditions.${conditionIndex}.subConditions.${subIndex}.questionType`}
            control={control}
            render={({ field }) => (
              <CustomSelect {...field} label="نوع سوال" options={questionTypes} sx={{ minWidth: 200 }} />
            )}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <Controller
            name={`conditions.${conditionIndex}.subConditions.${subIndex}.operatorType`}
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label="حالت"
                disabled={!questionType}
                options={getQuestion(questionType)}
                sx={{ minWidth: 200 }}
              />
            )}
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <Controller
            name={`conditions.${conditionIndex}.subConditions.${subIndex}.conditionType`}
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                label="شرط"
                disabled={!operatorType}
                options={getCondition(questionType, operatorType)}
                sx={{ minWidth: 200 }}
              />
            )}
          />
        </FormControl>
        <Controller
          name={`conditions.${conditionIndex}.subConditions.${subIndex}.value`}
          control={control}
          render={({ field }) => getInput(questionType, operatorType, conditionType, field.value, field.onChange)}
        />
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <IconButton
            onClick={() =>
              append({ logicalOperator: "AND", questionType: "", operatorType: "", conditionType: "", value: "" })
            }
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
              onClick={() => remove(subIndex)}
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

