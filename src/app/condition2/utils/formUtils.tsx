
import JSONData_First from "../../../../public/assets/fake-data/first.json"
import JSONData_goTo from "../../../../public/assets/fake-data/goTo.json"
import { TextField, FormControl, Select, MenuItem } from "@mui/material"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

export interface SelectOption {
  value: string;
  label: string;
}

export const data: any = JSONData_First.dataList

export const questionTypes: SelectOption[] = data.map((item) => {
  const isCalculation = item.elementStr === "CALCULATION"
  const isTextFieldDate = item.extMap.TEXT_FIELD_PATTERN === "DATE"
  const isSpectralDouble = item.extMap.SPECTRAL_TYPE === "DOMAIN"
  const isMultiSelect = Boolean(item.extMap.MULTI_SELECT)
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

export const calculationTypes: SelectOption[] = data
  .filter((item) => item.elementStr === "CALCULATION")
  .map((item) => ({
    value: item.extMap.QUESTION_TYPE || "",
    label: item.caption,
  }))

export const questionGoTo: SelectOption[] = JSONData_goTo.dataList.map((item) => ({
  value: item.extMap.UNIC_NAME || "",
  label: item.caption,
}))

export const getInput = (
  type: string,
  operator: string,
  condition: string,
  value: string,
  setValue: (value: string) => void,
) => {
  const combinedKey = `${type.split("*")[0]}_${operator}_${condition}`
  switch (combinedKey) {
    case "MULTIPLE_CHOICE_VALUE_less":
    case "MULTIPLE_CHOICE_VALUE_greater":
    case "MULTIPLE_CHOICE_VALUE_equal":
    case "MULTIPLE_CHOICE_VALUE_not_equal":
      return (
        <TextField 
          label="Quantity" 
          type="number"
          value={value} 
          onChange={(e) => setValue(e.target.value)}
       />
      )


    case "MULTIPLE_CHOICE_QUESTION_less":
    case "MULTIPLE_CHOICE_QUESTION_greater":
    case "MULTIPLE_CHOICE_QUESTION_equal":
    case "MULTIPLE_CHOICE_QUESTION_not_equal":
      return (
        <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={value}
            label="نوع سوال"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setValue(e.target.value as string)}
          >
            {questionTypes.map((type) => (
              <MenuItem
                key={type.value}
                value={type.value}
                sx={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    // Add more cases for other input types
    case "TEXT_FIELD_DATE_DATE_beforeDate":
    case "TEXT_FIELD_DATE_QUESTION_afterDate":
      return (
        <DatePicker
          calendar={persian}
          locale={persian_fa}
          value={value}
          onChange={(e: any) => setValue(e)}
          className="rmdp-mobile"
          inputClass="h-[50px] px-4 border-[1px] w-full border-neutral-300 rounded-xl text-left p-1"
        />
      )
    default:
      return <TextField label="" value={value} disabled onChange={(e) => setValue(e.target.value)} />
  }
}

export const getCondition = (type: string, operator: string): SelectOption[] => {
  const combinedKey = `${type.split("*")[0]}_${operator}`
  switch (combinedKey) {
    case "MULTIPLE_CHOICE_VALUE":
    case "MULTIPLE_CHOICE_QUESTION":
    case "MULTIPLE_CHOICE_OPTION":
    case "MULTIPLE_CHOICE_CALCULATION":
      return [
        { value: "greater", label: "بزرگتر بود" },
        { value: "less", label: "کوچکتر بود از" },
        { value: "equal", label: "برابر بود با" },
        { value: "not_equal", label: "نابرابر بود با" },
      ]
    default:
      return []
  }
}

export const getQuestion = (type: string): SelectOption[] => {
  switch (type.split("*")[0]) {
    case "MULTIPLE_CHOICE":
      return [
        { value: "VALUE", label: "ارزش" },
        { value: "QUESTION", label: "سوال " },
        { value: "CALCULATION", label: "محاسبه‌گر" },
        { value: "OPTION", label: "گزینه" },
      ]
    default:
      return []
  }
}

