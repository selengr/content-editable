import { z } from "zod"

export const SubConditionSchema = z.object({
  logicalOperator: z.enum(["AND", "OR"]),
  questionType: z.string(),
  operatorType: z.string(),
  conditionType: z.string(),
  value: z.string(),
  id: z.string().optional(),
})

export const ConditionSchema = z.object({
  subConditions: z.array(SubConditionSchema),
  elseQuestionId: z.string(),
  returnQuestionId: z.string(),
})

export const FormSchema = z.object({
  conditions: z.array(ConditionSchema),
})

export type SubCondition = z.infer<typeof SubConditionSchema>
export type Condition = z.infer<typeof ConditionSchema>
export type FormData = z.infer<typeof FormSchema>

