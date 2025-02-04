import { SelectController } from "../components/SelectController"
import { TextFieldController } from "../components/TextFieldController"

export const getInput = (
  type: string,
  operator: string,
  condition: string,
  field: { name: any; key?: string },
  {
    onlySomeQuestionsOptions,
    isFetchingOnlyAllQuestions,
    onlyAllCalculationOptions,
    isFetchingOnlyAllCalculation,
    onlyAllQuestions,
    control,
    setValue,
  },
) => {
  const combinedKey = `${type?.split("*")[0]}_${operator}_${condition}`

  switch (combinedKey) {
    case "MULTIPLE_CHOICE_VALUE_#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_VALUE_!#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_VALUE_#lessThanMultiChoiceSingle":
    case "MULTIPLE_CHOICE_VALUE_!#lessThanMultiChoiceSingle":
      return <TextFieldController name={field.name} type="number" />

    case "MULTIPLE_CHOICE_QUESTION_#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_QUESTION_!#equalMultiChoiceSingle":
    case "MULTIPLE_CHOICE_QUESTION_#lessThanMultiChoiceSingle":
    case "MULTIPLE_CHOICE_QUESTION_!#lessThanMultiChoiceSingle":
      return (
        <SelectController
          name={field.name}
          options={onlySomeQuestionsOptions}
          isLoading={isFetchingOnlyAllQuestions}
          sx={{ minWidth: 210 }}
        />
      )

    // ... (include all other cases from the original getInput function)

    default:
      return <TextFieldController name={field.name} disabled />
  }
}

