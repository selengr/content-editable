"use client"
import * as z from "zod"
// hook-form
import { FormProvider } from "react-hook-form"
// mui
import { LoadingButton } from "@mui/lab"
import { Box, Typography, Button } from "@mui/material"
// others
import "react-multi-date-picker/styles/layouts/mobile.css"
// _components
import { CustomSelectController } from "./_components/form/select-controller"
// hooks
import { useFormLogic } from "./hooks/useFormLogic"
import { useWatch } from "react-hook-form"

export default function ConditionalSystem() {
  const {
    methods,
    conditions,
    handleAddCondition,
    handleRemoveCondition,
    handleAddSubCondition,
    handleRemoveSubCondition,
  } = useFormLogic()

  const { control, handleSubmit, setValue } = methods

  const onSubmit = (input: FormData) => {
    console.log("Submitted data:", input)

    // ... (onSubmit function remains unchanged)
  }

  return (
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
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#404040",
          fontWeight: 700,
          mb: 1,
        }}
      >
        شرط
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {conditions.map((condition, index) => (
            <ConditionGroup
              key={condition.id}
              condition={condition}
              index={index}
              onRemoveCondition={handleRemoveCondition}
              onAddSubCondition={handleAddSubCondition}
              onRemoveSubCondition={handleRemoveSubCondition}
            />
          ))}
          <Button
            variant="outlined"
            onClick={handleAddCondition}
            sx={{
              ml: 2,
              height: 52,
              maxWidth: 155,
              color: "white",
              bgcolor: "#1758BA",
              borderRadius: "8px",
            }}
          >
            افزودن شرط جدید
          </Button>
          <SubmitButtons />
        </form>
      </FormProvider>
    </Box>
  )
}
