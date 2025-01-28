"use client"

import { useState } from "react"
import { useForm, useFieldArray, Controller, FormProvider, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { Box, IconButton, Typography, Button, TextField } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import "react-multi-date-picker/styles/layouts/mobile.css"
import TrashIcon from "@/../public/images/home-page/trash.svg"
import PlusIcon from "@/../public/images/home-page/Add-fill.svg"
import CustomSelect from "./_components/form/custom-select"
import { CircleDivider } from "./_components/circle-divider"
import JSONData_First from "../../../public/assets/fake-data/first.json"
import JSONData_goTo from "../../../public/assets/fake-data/goTo.json"
import CustomTextField from "./_components/form/custom-text-field"
import { SelectOption } from "./utils/formUtils"

const SubConditionSchema = z.object({
  logicalOperator: z.string().optional(),
  questionType: z.string().min(1, { message: "اين فيلد الزامي است" }),
  operatorType: z.string().min(1, { message: "اين فيلد الزامي است" }),
  conditionType: z.string().min(1, { message: "اين فيلد الزامي است" }),
  value: z.string().min(1, { message: "اين فيلد الزامي است" }),
  id: z.string().optional(),
})

const ConditionSchema = z.object({
  subConditions: z.array(SubConditionSchema),
  elseQuestionId: z.string().min(1, { message: "اين فيلد الزامي است" }),
  returnQuestionId: z.string(),
})

const FormSchema = z.object({
  conditions: z.array(ConditionSchema),
})

type FormData = z.infer<typeof FormSchema>



// const questionTypes = JSONData_First.dataList.map((item) => ({
//   value: `${item.extMap.QUESTION_TYPE || item.elementStr}*${item.extMap.UNIC_NAME || ""}`,
//   label: item.caption,
// }))

export const questionTypes: SelectOption[] = JSONData_First.dataList.map((item) => {
    const isCalculation = item.elementStr === "CALCULATION"
    const isTextFieldDate = item.extMap.TEXT_FIELD_PATTERN === "DATE"
    const isSpectralDouble = item.extMap.SPECTRAL_TYPE === "DOMAIN"
    const isMultiSelect = parseInt(item.extMap.MULTI_SELECT)
    const questionType = isCalculation
      ? `${item.elementStr}*${item.extMap.UNIC_NAME}`
      : isTextFieldDate
        ? `${item.extMap.QUESTION_TYPE}_${item.extMap.TEXT_FIELD_PATTERN}*${item.extMap.UNIC_NAME}`
        : isMultiSelect
          ? `${item.extMap.QUESTION_TYPE}_MULTI_SELECT*${item.extMap.UNIC_NAME}`
          : isSpectralDouble
            ? `${item.extMap.QUESTION_TYPE}_${item.extMap.SPECTRAL_TYPE}*${item.extMap.UNIC_NAME}`
            : `${item.extMap.QUESTION_TYPE}*${item.extMap.UNIC_NAME || ""}`
  
    return {
      value: questionType,
      label: item.caption,
    }
  })
  

const calculationTypes = JSONData_First.dataList
  .filter((item) => item.elementStr === "CALCULATION")
  .map((item) => ({
    value: item.extMap.QUESTION_TYPE || "",
    label: item.caption,
  }))

const questionGoTo = JSONData_goTo.dataList.map((item) => ({
  value: item.extMap.UNIC_NAME || "",
  label: item.caption,
}))

export default function DependentSelectForm() {
  const [calendarValue, setCalendarValue] = useState(new Date())

  
  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      conditions: [
        {
          subConditions: [
            {
              logicalOperator: "",
              questionType: "",
              operatorType: "",
              conditionType: "",
              value: "",
              id: "",
            },
          ],
          elseQuestionId: "",
          returnQuestionId: "",
        },
      ],
    },
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods

  const {
    fields: conditions,
    append: appendCondition,
    remove: removeCondition,
  } = useFieldArray({
    control,
    name: "conditions",
  })

  const watchedValues = useWatch({ control })

  const getQuestion = (type: string, values : any) => {
    console.log("value1", values)
    console.log("value1 bool", Boolean(values.questionType.length > 0))
    console.log(type.split("*")[0])
    switch (type.split("*")[0]) {
      case "MULTIPLE_CHOICE":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "QUESTION", label: "سوال " },
          { value: "CALCULATION", label: "محاسبه‌گر" },
          { value: "OPTION", label: "گزینه" },
        ]
      case "MULTIPLE_CHOICE_MULTI_SELECT":
        return [{ value: "OPTION", label: "گزینه" }]
      case "TEXT_FIELD":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "TEXT", label: "متن" },
        ]
      case "TEXT_FIELD_DATE":
        return [
          { value: "QUESTION", label: "سوال" },
          { value: "DATE", label: "تاریخ" },
        ]
      case "SPECTRAL":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "QUESTION", label: "سوال " },
          { value: "CALCULATION", label: "محاسبه‌گر" },
        ]
      case "SPECTRAL_DOMAIN":
        return [{ value: "VALUE", label: "ارزش" }]
      case "CALCULATION":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "QUESTION", label: "سوال " },
          { value: "CALCULATION", label: "محاسبه‌گر" },
        ]
      default:
        return []
    }
  }

  const getCondition = (type: string, operator: string, values: any) => {
    console.log("value2", values)
    const combinedKey = `${type.split("*")[0]}_${operator}`
    switch (combinedKey) {
      case "MULTIPLE_CHOICE_VALUE":
      case "MULTIPLE_CHOICE_QUESTION":
      case "MULTIPLE_CHOICE_OPTION":
      case "MULTIPLE_CHOICE_CALCULATION":
        return [
          { value: "!#lessThanMultiChoiceSingle", label: "بزرگتر بود" },
          { value: "#lessThanMultiChoiceSingle", label: "کوچکتر بود از" },
          { value: "#equalMultiChoiceSingle", label: "برابر بود با" },
          { value: "!#equalMultiChoiceSingle", label: "نابرابر بود با" },
        ]
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION":
        return [
          { value: "containAny", label: "شامل شدن" },
          { value: "not_containAny", label: "شامل نشدن" },
          { value: "equal", label: "برابر  با" },
          { value: "not_equal", label: "نابرابر با" },
        ]
      case "TEXT_FIELD_VALUE":
      case "TEXT_FIELD_TEXT":
        return [
          { value: "startWith", label: "شروع شدن با " },
          { value: "endWith", label: "پایان یافتن با" },
          { value: "containAny", label: "شامل شدن" },
          { value: "not_containAny", label: "شامل نشدن" },
          { value: "lenEqualText", label: "طول متن برابر با " },
          { value: "lenGraterThan", label: "طول متن بیشتر از" },
          { value: "lenLessThanText", label: " طول متن کمتر از" },
        ]

      case "TEXT_FIELD_DATE_DATE":
      case "TEXT_FIELD_DATE_QUESTION":
        return [
          { value: "beforeDate", label: "قبل از" },
          { value: "afterDate", label: "بعد از" },
        ]

      case "SPECTRAL_VALUE":
      case "SPECTRAL_QUESTION":
      case "SPECTRAL_CALCULATION":
        return [
          { value: "greater", label: "بزرگتر از" },
          { value: "less", label: "کوچکتر  از" },
          { value: "greaterEqual", label: "بزرگتر مساوی" },
          { value: "lessEqual", label: " کوچکتر مساوی" },
          { value: "equal", label: "برابر  با" },
        ]
      case "SPECTRAL_DOMAIN_VALUE":
        return [
          { value: "greater", label: "بزرگتر از" },
          { value: "less", label: "کوچکتر  از" },
        ]

      case "CALCULATION_VALUE":
      case "CALCULATION_QUESTION":
      case "CALCULATION_CALCULATION":
        return [
          { value: "greater", label: "بزرگتر از" },
          { value: "less", label: "کوچکتر از" },
          { value: "greaterEqual", label: "بزرگتر مساوی" },
          { value: "lessEqual", label: " کوچکتر مساوی" },
          { value: "equal", label: "برابر  با" },
          { value: "not_equal", label: "نابرابر با" },
        ]

      case "MULTIPLE_CHOICE":
        return [
          { value: "selected", label: "انتخاب شده" },
          { value: "not_selected", label: "انتخاب نشده" },
        ]
      default:
        return []
    }
  }


  const getInput = (type: string, operator: string, condition: string, field: any) => {
    const combinedKey = `${type.split("*")[0]}_${operator}_${condition}`
    switch (combinedKey) {
        case "MULTIPLE_CHOICE_VALUE_!#lessThanMultiChoiceSingle":
            case "MULTIPLE_CHOICE_VALUE_#lessThanMultiChoiceSingle":
            case "MULTIPLE_CHOICE_VALUE_#equalMultiChoiceSingle":
            case "MULTIPLE_CHOICE_VALUE_!#equalMultiChoiceSingle":

        return <CustomSelect name={field.name} options={questionTypes} sx={{ minWidth: 200 }} />
      case "TEXT_FIELD_TEXT_startWith":
      case "TEXT_FIELD_TEXT_endWith":
        return <CustomTextField name={field.name} label="" type="string" />
      case "TEXT_FIELD_DATE_DATE_beforeDate":
      case "TEXT_FIELD_DATE_QUESTION_afterDate":
        return (
            <Controller
              name={field.name}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    "& .rmdp-wrapper.rmdp-border": {
                      borderRadius: "20px",
                    },
                  }}
                >
                  <DatePicker
                    shadow={false}
                    calendar={persian}
                    locale={persian_fa}
                    value={value}
                    onChange={(e: any) => onChange(e)}
                    className={"rmdp-mobile"}
                    zIndex={9999}
                    inputClass={`h-[50px] px-4 border-[1px] w-full border-neutral-300 rounded-xl text-left p-1 ${error ? "border-red-500" : ""}`}
                    highlightToday
                    portal
                  />
                </Box>
              )}
            />
          )

        case "MULTIPLE_CHOICE_OPTION_!#lessThanMultiChoiceSingle":
            case "MULTIPLE_CHOICE_OPTION_#lessThanMultiChoiceSingle":
            case "MULTIPLE_CHOICE_OPTION_#equalMultiChoiceSingle":
            case "MULTIPLE_CHOICE_OPTION_!#equalMultiChoiceSingle":
        return <CustomSelect name={field.name} options={questionTypes} sx={{ minWidth: 200 }} />

      case "MULTIPLE_CHOICE_CALCULATION_!#lessThanMultiChoiceSingle":
      case "MULTIPLE_CHOICE_CALCULATION_#lessThanMultiChoiceSingle":
      case "MULTIPLE_CHOICE_CALCULATION_#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_CALCULATION_!#equalMultiChoiceSingle":
        return <CustomSelect name={field.name} options={calculationTypes} sx={{ minWidth: 200 }} />

      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_containAny":
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_not_containAny":
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_equal":
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_not_equal":
        return JSONData_First.dataList.map((item) => {
          if (item?.extMap?.UNIC_NAME === type.split("*")[1]) {
            const options = item?.extMap?.OPTIONS

            const optionsList = []
            Object.keys(options).forEach((key) => {
              optionsList.push({
                value: key,
                label: options[key][1],
              })
            })
            return <CustomSelect name={field.name} options={optionsList} sx={{ minWidth: 200 }} />
          }
        })

      case "TEXT_FIELD_TEXT_containAny":
      case "TEXT_FIELD_TEXT_not_containAny":
        return <CustomTextField name={field.name} label="" type="string" />

      case "TEXT_FIELD_VALUE_lenEqualText":
      case "TEXT_FIELD_VALUE_lenGraterThan":
      case "TEXT_FIELD_VALUE_lenLessThanText":
        return <CustomTextField name={field.name} label="" type="number" />

      case "SPECTRAL_VALUE_greater":
      case "SPECTRAL_VALUE_less":
      case "SPECTRAL_VALUE_greaterEqual":
      case "SPECTRAL_VALUE_lessEqual":
      case "SPECTRAL_VALUE_equal":
        return <CustomTextField name={field.name} label="" type="number" />

      case "SPECTRAL_QUESTION_greater":
      case "SPECTRAL_QUESTION_less":
      case "SPECTRAL_QUESTION_greaterEqual":
      case "SPECTRAL_QUESTION_lessEqual":
      case "SPECTRAL_QUESTION_equal":
        return <CustomSelect name={field.name} options={questionTypes} sx={{ minWidth: 200 }} />

      case "SPECTRAL_CALCULATION_greater":
      case "SPECTRAL_CALCULATION_less":
      case "SPECTRAL_CALCULATION_greaterEqual":
      case "SPECTRAL_CALCULATION_lessEqual":
      case "SPECTRAL_CALCULATION_equal":
        return <CustomSelect name={field.name} options={calculationTypes} sx={{ minWidth: 200 }} />

      case "SPECTRAL_DOMAIN_VALUE_greater":
      case "SPECTRAL_DOMAIN_VALUE_less":
        return <CustomTextField name={field.name} label="" type="number" />

      case "CALCULATION_VALUE_greater":
      case "CALCULATION_VALUE_less":
      case "CALCULATION_VALUE_greaterEqual":
      case "CALCULATION_VALUE_lessEqual":
      case "CALCULATION_VALUE_equal":
        return <CustomTextField name={field.name} label="" type="number" />

      case "CALCULATION_QUESTION_greater":
      case "CALCULATION_QUESTION_less":
      case "CALCULATION_QUESTION_greaterEqual":
      case "CALCULATION_QUESTION_lessEqual":
      case "CALCULATION_QUESTION_equal":
        return <CustomSelect name={field.name} options={questionTypes} sx={{ minWidth: 200 }} />

      case "CALCULATION_CALCULATION_greater":
      case "CALCULATION_CALCULATION_less":
      case "CALCULATION_CALCULATION_greaterEqual":
      case "CALCULATION_CALCULATION_lessEqual":
      case "CALCULATION_CALCULATION_equal":
        return <CustomSelect name={field.name} options={calculationTypes} sx={{ minWidth: 200 }} />

      default:
        return <CustomTextField name={field.name} label="" disabled />
    }
  }


  const onSubmit = (data: FormData) => {
    console.log("Submitted data:", data)
  }

  return (
    <Box
      sx={{ width: "100%", p: 3, display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr" }}
    >
      <Typography
        variant="subtitle1"
        sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 700 }}
      >
        شرط
      </Typography>
      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {conditions.map((condition, index) => (
          <Box key={condition.id} sx={{ mb: 2, width: "100%" }}>
             {condition.subConditions.map((subCondition, subIndex) => {
                const currentValues = watchedValues?.conditions?.[index]?.subConditions?.[subIndex] || {}
                return (
                  <Box key={subCondition.id} sx={{ ml: 4, mt: 2 }}>
                    <Box sx={{ mb: 2, display: "flex", flexDirection: "row" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {subIndex === 0 && (
                          <Typography sx={{ color: "#393939", fontSize: "14px", width: 90 }}>اگر</Typography>
                        )}
                        {subIndex > 0 && (
                          <CustomSelect
                            name={`conditions.${index}.subConditions.${subIndex}.logicalOperator`}
                            options={[
                              { value: "&&", label: "و" },
                              { value: "||", label: "یا" },
                            ]}
                            sx={{ minWidth: 78 }}
                          />
                        )}
                      </Box>
                      <Box rowGap={3} columnGap={2} display="flex">
                        <CustomSelect
                          name={`conditions.${index}.subConditions.${subIndex}.questionType`}
                          options={questionTypes}
                          sx={{ minWidth: 200 }}
                          
                        />
                        <CustomSelect
                          name={`conditions.${index}.subConditions.${subIndex}.operatorType`}
                          options={getQuestion(currentValues.questionType, currentValues)}
                          sx={{ minWidth: 200 }}
                          disabled={!Boolean(currentValues.questionType)}
                        />
                        <CustomSelect
                          name={`conditions.${index}.subConditions.${subIndex}.conditionType`}
                          options={getCondition(currentValues.questionType, currentValues.operatorType, currentValues)}
                          sx={{ minWidth: 200 }}
                          disabled={!Boolean(currentValues.operatorType)}
                        />
                        {getInput(currentValues.questionType, currentValues.operatorType, currentValues.conditionType, {
                          name: `conditions.${index}.subConditions.${subIndex}.value`,
                        })}
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                          <IconButton
                            onClick={() => {
                              const newSubCondition = {
                                logicalOperator: "",
                                questionType: "",
                                operatorType: "",
                                conditionType: "",
                                value: "",
                                id: "",
                              }
                              const newConditions = [...conditions]
                              newConditions[index].subConditions.splice(subIndex + 1, 0, newSubCondition)
                              appendCondition(newConditions)
                            }}
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
                              onClick={() => {
                                const newConditions = [...conditions]
                                newConditions[index].subConditions.splice(subIndex, 1)
                                appendCondition(newConditions)
                              }}
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
                  </Box>
                )
              })}
            <Box sx={{ mt: 2, ml: 4, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#393939", fontSize: "14px" }}>:برو به</Typography>

               <CustomSelect
                  name={`conditions.${index}.returnQuestionId`}
                  options={questionGoTo}
                  sx={{ minWidth: 200, ml: 5 }}
                />
              <Typography sx={{ color: "#393939", fontSize: "14px", mr: 9.5 }}>در غیر اینصورت برو به:</Typography>
            
              <CustomSelect
                  name={`conditions.${index}.elseQuestionId`}
                  options={questionGoTo}
                  sx={{ minWidth: 410 }}
                />

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
          onClick={() =>
            appendCondition({
              subConditions: [
                {
                  logicalOperator: "",
                  questionType: "",
                  operatorType: "",
                  conditionType: "",
                  value: "",
                  id: "",
                },
              ],
              elseQuestionId: "",
              returnQuestionId: "",
            })
          }
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
            type="submit"
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
      </form>
      </FormProvider>
    </Box>
  )
}

