"use client"

import React from "react"
import { FormProvider } from "react-hook-form"
import { Box, Button, Typography, IconButton } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { useDependentSelectForm } from "../hooks/useDependentSelectForm"
import { SubCondition } from "./SubCondition"
import  CustomSelect  from "./custom-select"
import { CircleDivider } from "./circle-divider"
import { questionGoTo } from "../utils/formUtils"

export default function DependentSelectForm() {
  const { methods, conditions, addCondition, removeCondition, handleSubmit } = useDependentSelectForm()

  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          width: "100%",
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          direction: "ltr",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 700 }}
        >
          شرط
        </Typography>

        {conditions.map((condition, index) => (
          <Box key={`${condition.id}-${index}-${Math.random()}`} sx={{ mb: 2, width: "100%" }}>
            {condition.subConditions.map((subCondition, subIndex) => (
              <Box key={`${subCondition.value}-${subIndex}-${Math.random()}`} sx={{ ml: 4, mt: 2 }}>
                <SubCondition conditionIndex={index} subIndex={subIndex} />
              </Box>
            ))}

            <Box sx={{ mt: 2, ml: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#393939", fontSize: "14px" }}>:برو به</Typography>
              <CustomSelect
                name={`conditions.${index}.returnQuestionId`}
                options={questionGoTo}
                sx={{ minWidth: 200 }}
              />

              <Typography sx={{ color: "#393939", fontSize: "14px", mr: 9.5 }}>در غیر اینصورت برو به:</Typography>
              <CustomSelect name={`conditions.${index}.elseQuestionId`} options={questionGoTo} sx={{ minWidth: 200 }} />

              <IconButton
                onClick={() => removeCondition(index)}
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

            <CircleDivider />
          </Box>
        ))}

        <Button
          variant="outlined"
          onClick={addCondition}
          sx={{
            maxWidth: 155,
            ml: 10,
            bgcolor: "#1758BA",
            borderRadius: "8px",
            height: 52,
            color: "white",
          }}
        >
          افزودن شرط جدید
        </Button>

        <Box
          display="flex"
          gap={3}
          width="100%"
          marginBottom={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingButton
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#1758BA",
              borderRadius: "8px",
              height: "52px",
              "&.MuiButtonBase-root:hover": {
                backgroundColor: "#1758BA",
              },
              minWidth: 113,
            }}
          >
            <Typography variant="body2" component={"p"} py={0.5} sx={{ color: "#fff", fontWeight: 500 }}>
              تایید
            </Typography>
          </LoadingButton>

          <Button
            type="button"
            variant="outlined"
            sx={{
              height: "52px",
              minWidth: 113,
              borderRadius: "8px",
              borderColor: "#1758BA",
              background: "#FFF",
            }}
          >
            <Typography variant="body2" component={"p"} py={0.5} color={"#1758BA"} sx={{ fontWeight: 500 }}>
              انصراف
            </Typography>
          </Button>
        </Box>
      </Box>
    </FormProvider>
  )
}

