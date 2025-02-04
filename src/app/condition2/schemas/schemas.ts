import { z } from "zod"

const SubConditionSchema = z.object({
  logicalOperator: z.enum(["AND", "OR"]).optional(),
  questionType: z.string().min(1, "Question type is required"),
  operatorType: z.string().min(1, "Operator type is required"),
  conditionType: z.string().min(1, "Condition type is required"),
  value: z.string().min(1, "Value is required"),
  id: z.string().optional(),
})

export const ConditionSchema = z.object({
  subConditions: z.array(SubConditionSchema).min(1, "At least one sub-condition is required"),
  elseQuestionId: z.string().min(1, "Else question is required"),
  returnQuestionId: z.string().min(1, "Return question is required"),
})

export const ConditionFormSchema = z.object({
  conditions: z.array(ConditionSchema).min(1, "At least one condition is required"),
})

export type TConditionFormData = z.infer<typeof ConditionFormSchema>

