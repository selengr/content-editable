import { CustomTextField } from "../components/custom-text-field"
import { CustomSelectController } from "../components/select-controller"

export function getQuestion(type: string, values: any) {
  switch (type?.split("*")[0]) {
    case "MULTIPLE_CHOICE":
      return [
        { value: "VALUE", label: "ارزش" },
        { value: "OPTION", label: "گزینه" },
        { value: "QUESTION", label: "سوال " },
        { value: "CALCULATION", label: "محاسبه‌گر" },
      ]
    case "MULTIPLE_CHOICE_MULTI_SELECT":
      return [{ value: "OPTION", label: "گزینه" }]
    case "TEXT_FIELD":
      return [
        { value: "VALUE", label: "ارزش" },
        { value: "TEXT", label: "متن" },
      ]
    // Add other cases as needed
    default:
      return []
  }
}

export function getCondition(type: string, operator: string, values: any) {
  const combinedKey = `${type?.split("*")[0]}_${operator}`
  switch (combinedKey) {
    case "MULTIPLE_CHOICE_VALUE":
    case "MULTIPLE_CHOICE_OPTION":
    case "MULTIPLE_CHOICE_QUESTION":
    case "MULTIPLE_CHOICE_CALCULATION":
      return [
        { value: "#equalMultiChoiceSingle", label: "برابر با" },
        { value: "!#equalMultiChoiceSingle", label: "نابرابر با" },
        { value: "!#lessThanMultiChoiceSingle", label: "بزرگتر از" },
        { value: "#lessThanMultiChoiceSingle", label: "کوچکتر از" },
      ]
    // Add other cases as needed
    default:
      return []
  }
}

export function getInput(type: string, operator: string, condition: string, field: { name: string; key?: string }) {
  const combinedKey = `${type?.split("*")[0]}_${operator}_${condition}`

  switch (combinedKey) {
    case "MULTIPLE_CHOICE_VALUE_#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_VALUE_!#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_VALUE_#lessThanMultiChoiceSingle":
    case "MULTIPLE_CHOICE_VALUE_!#lessThanMultiChoiceSingle":
      return <CustomTextField name={field.name} type="number" />

    case "MULTIPLE_CHOICE_QUESTION_#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_QUESTION_!#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_QUESTION_#lessThanMultiChoiceSingle":
    case "MULTIPLE_CHOICE_QUESTION_!#lessThanMultiChoiceSingle":
      return (
        <CustomSelectController
          name={field.name}
          options={[]} // Add your options here
          isLoading={false} // Add your loading state here
          sx={{ minWidth: 210 }}
        />
      )

    // Add other cases as needed

    default:
      return <CustomTextField name={field.name} disabled />
  }
}

