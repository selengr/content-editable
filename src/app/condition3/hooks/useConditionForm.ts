    import { useForm, useFieldArray } from "react-hook-form"
    import { zodResolver } from "@hookform/resolvers/zod"
    import { v4 as uuidv4 } from "uuid"
    import { FormSchema, type FormData } from "../schemas/formSchema"
    
    export function useConditionForm() {
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
                  id: uuidv4(),
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
        setValue,
        getValues,
      } = methods
    
      const {
        fields: conditions,
        append: appendCondition,
        remove: removeCondition,
        update: updateCondition,
      } = useFieldArray({
        control,
        name: "conditions",
      })
    
      const handleAddCondition = () => {
        appendCondition({
          subConditions: [
            {
              logicalOperator: "",
              questionType: "",
              operatorType: "",
              conditionType: "",
              value: "",
              id: uuidv4(),
            },
          ],
          elseQuestionId: "",
          returnQuestionId: "",
        })
      }
    
      const handleRemoveCondition = (index: number) => {
        removeCondition(index)
      }
    
      const handleAddSubCondition = (index: number, subIndex: number) => {
        const currentCondition = getValues().conditions[index]
        const clonedCondition = structuredClone(currentCondition)
    
        const newSubConditions = [
          ...clonedCondition.subConditions.slice(0, subIndex + 1),
          {
            logicalOperator: clonedCondition.subConditions.length > 0 ? "&&" : "",
            questionType: "",
            operatorType: "",
            conditionType: "",
            value: "",
            id: uuidv4(),
          },
          ...clonedCondition.subConditions.slice(subIndex + 1),
        ]
    
        updateCondition(index, {
          ...clonedCondition,
          subConditions: newSubConditions,
        })
      }
    
      const handleRemoveSubCondition = (conditionIndex: number, subConditionIndex: number) => {
        const updatedCondition = { ...conditions[conditionIndex] }
        updatedCondition.subConditions.splice(subConditionIndex, 1)
        updateCondition(conditionIndex, updatedCondition)
      }
    
      return {
        methods,
        conditions,
        handleAddCondition,
        handleRemoveCondition,
        handleAddSubCondition,
        handleRemoveSubCondition,
      }
    }
    
       