"use client"


interface Condition {
  logicalOperator: "AND" | "OR" | string
  subConditions: SubCondition[]
  goTo: {
    type: string
    value: string
  }
}

interface SubCondition {
  questionType: string
  operatorType: string
  conditionType: string
  value: string
}




import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { SelectOption } from './_types/conditions'
import JSONData from '../../../public/assets/fake-data/response_v1.json'
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Divider, IconButton, Typography } from '@mui/material'
import { Add, Delete } from '@mui/icons-material';


export default function DependentSelectForm() {
  const [conditions, setConditions] = useState<Condition[]>([
    {
      logicalOperator: null,
      subConditions: [{
        questionType: "",
      operatorType: "",
      conditionType: "",
      value: "",
      }],
      goTo: {
        type: "",
        value: "",
      },
    },
  ])

  const addCondition = () => {
    setConditions((prevConditions) => [
      ...prevConditions,
      {
        logicalOperator: "",
        subConditions: [{
          questionType: "",
          operatorType: "",
          conditionType: "",
          value: "",
        }],
        goTo: {
          type: "",
          value: "",
        },
      },
    ])
  }


  const addSubCondition = (conditionIndex: number, subConditionIndex: number) => {
    setConditions((prevConditions) => {
      const newConditions = [...prevConditions];

      const newSubConditions = [
        {
          questionType: "",
          operatorType: "",
          conditionType: "",
          value: "",
        },
      ];
      
      if (newConditions[conditionIndex]?.subConditions) {
        newConditions[conditionIndex].subConditions.splice(subConditionIndex + 1, 0, ...newSubConditions);
      }
  
      return newConditions;
    });
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  const removeSubCondition = (conditionIndex: number, subIndex: number) => {
    setConditions((prevConditions) => {
      const newConditions = [...prevConditions]
      newConditions[conditionIndex].subConditions.splice(subIndex, 1)
      return newConditions
    })
  }

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    setConditions(prevConditions => {
      const newConditions = [...prevConditions];
      newConditions[index] = { ...newConditions[index], [field]: value };

      return newConditions;
    });
  }


  const updateSubCondition = (conditionIndex: number, subIndex: number, field: keyof SubCondition, value: string) => {
    setConditions((prevConditions) => {
      const newConditions = [...prevConditions]
      const subCondition = { ...newConditions[conditionIndex].subConditions[subIndex] }

      subCondition[field] = value

      if (field === "questionType") {
        subCondition.operatorType = ""
        subCondition.conditionType = ""
        subCondition.value = ""
      } else if (field === "operatorType") {
        subCondition.conditionType = ""
        subCondition.value = ""
      }

      newConditions[conditionIndex].subConditions[subIndex] = subCondition
      return newConditions
    })
  }


  let data: any = JSONData.dataList

  const questionTypes = data
    .map(item => ({
      value: item.extMap.QUESTION_TYPE || '',
      label: item.caption
    }))
  const calculationTypes = data
    .filter(item => item.elementStr === 'CALCULATION')
    .map(item => ({
      value: item.extMap.QUESTION_TYPE || '',
      label: item.caption
    }))

  const getInput = (type: string, operator: string, condition: string, value: string, setValue: (value: string) => void) => {
    const combinedKey = `${type}_${operator}_${condition}`
    switch (combinedKey) {
      case 'MULTIPLE_CHOICE_VALUE_less':
      case 'MULTIPLE_CHOICE_VALUE_greater':
      case 'MULTIPLE_CHOICE_VALUE_equal':
      case 'MULTIPLE_CHOICE_VALUE_not_equal':
        return <FormControl sx={{ minWidth: 200 }}>
          <TextField
            label="Quantity"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>
      case 'MULTIPLE_CHOICE_QUESTION_less':
      case 'MULTIPLE_CHOICE_QUESTION_greater':
      case 'MULTIPLE_CHOICE_QUESTION_equal':
      case 'MULTIPLE_CHOICE_QUESTION_not_equal':
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={value}
            label="نوع سوال"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setValue(e.target.value)}
          >
            {questionTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}
                sx={{
                  display: "flex",
                  justifyContent: "end"
                }}
              >
                {type.label}
              </MenuItem>
            ))}
            {/* {questionTypes.map((type) => (
                Object.entries(type.extMap.OPTIONS || {}).map(([key, [_, label]]) => (
                  <MenuItem key={key} value={label.toString()}
                    sx={{
                      display: "flex",
                      justifyContent: "end"
                    }}
                  >
                    {label.toString()}
                  </MenuItem>
                ))
              ))} */}
          </Select>
        </FormControl>
      case 'MULTIPLE_CHOICE_OPTION_less':
      case 'MULTIPLE_CHOICE_OPTION_greater':
      case 'MULTIPLE_CHOICE_OPTION_equal':
      case 'MULTIPLE_CHOICE_OPTION_not_equal':
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={value}
            label="نوع سوال2"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setValue(e.target.value)}
          >
            {questionTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}
                sx={{
                  display: "flex",
                  justifyContent: "end"
                }}
              >
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      case 'MULTIPLE_CHOICE_CALCULATION_less':
      case 'MULTIPLE_CHOICE_CALCULATION_greater':
      case 'MULTIPLE_CHOICE_CALCULATION_equal':
      case 'MULTIPLE_CHOICE_CALCULATION_not_equal':
        return <FormControl>
          <Select
            value={value}
            label="calculation"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setValue(e.target.value)}
          >
            {calculationTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}
              >
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      case 'TEXT_FIELD_TEXT_startWith':
      case 'TEXT_FIELD_TEXT_endWith':
        return <TextField
          label=""
          type="string"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

      case 'TEXT_FIELD_TEXT_containAny':
      case 'TEXT_FIELD_TEXT_not_containAny':
        return <>eek;eugf</>

      case 'TEXT_FIELD_VALUE_lenEqualText':
      case 'TEXT_FIELD_VALUE_lenGraterThan':
      case 'TEXT_FIELD_VALUE_lenLessThanText':
        return <TextField
          label=""
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

      default:
        return <TextField
          label=""
          value={value}
          disabled
          onChange={(e) => setValue(e.target.value)}
        />
    }
  }

  const getCondition = (type: string, operator: string): SelectOption[] => {
    const combinedKey = `${type}_${operator}`

    switch (combinedKey) {
      case 'MULTIPLE_CHOICE_VALUE':
      case 'MULTIPLE_CHOICE_QUESTION':
      case 'MULTIPLE_CHOICE_OPTION':
      case 'MULTIPLE_CHOICE_CALCULATION':
        return [
          { value: 'greater', label: 'بزرگتر بود' },
          { value: 'less', label: 'کوچکتر بود از' },
          { value: 'equal', label: 'برابر بود با' },
          { value: 'not_equal', label: 'نابرابر بود با' }
        ]
      case 'TEXT_FIELD_VALUE':
      case 'TEXT_FIELD_TEXT':
        return [
          { value: 'startWith', label: 'شروع شدن با ' },
          { value: 'endWith', label: 'پایان یافتن با' },
          { value: 'containAny', label: 'شامل شدن' },
          { value: 'not_containAny', label: 'شامل نشدن' },
          { value: 'lenEqualText', label: 'طول متن برابر با ' },
          { value: 'lenGraterThan', label: 'طول متن بیشتر از' },
          { value: 'lenLessThanText', label: ' طول متن کمتر از' }
        ]
      case 'MULTIPLE_CHOICE':
        return [
          { value: 'selected', label: 'انتخاب شده' },
          { value: 'not_selected', label: 'انتخاب نشده' }
        ]
      default:
        return []
    }
  }

  const getQuestion = (type: string): SelectOption[] => {
    switch (type) {
      case 'MULTIPLE_CHOICE':
        return [
          { value: 'VALUE', label: 'ارزش' },
          { value: 'QUESTION', label: 'سوال ' },
          { value: 'CALCULATION', label: 'محاسبه‌گر' },
          { value: 'OPTION', label: 'گزینه' }
        ]
      case 'TEXT_FIELD':
        return [
          { value: 'VALUE', label: 'ارزش' },
          { value: 'TEXT', label: 'متنی' }
        ]
      default:
        return []
    }
  }



  useEffect(() => {
    setConditions(prevConditions => prevConditions.map(condition => {
      if (condition.questionType === '') {
        return { ...condition, operatorType: '', conditionType: '', value: '' }
      }
      return condition;
    }))
  }, [])



  const renderConditionInputs = (
    condition: SubCondition,
    index: number,
    subIndex?: number,
  ) => {
    console.log(
      "index", index,
      "subIndex", subIndex,
    )

    const updateFn =
      // isSubCondition && subIndex !== undefined
         (field: keyof SubCondition, value: string) => updateSubCondition(subIndex, index, field, value)
        // : (field: keyof Condition, value: string) => updateCondition(index, field, value)

    return (
      <Box sx={{ mb: 2, display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {conditions[index]?.subConditions.length === 0 && <Typography sx={{ width: 90 }} variant="h6">اگر </Typography>}
          {/* {index !== 0 && conditions.length > 0 && ( */}
          <Select
            value={condition.logicalOperator || ''}
            sx={{
              width: 90,
              mr: 1
            }}
            onChange={(e) => updateCondition(index, 'logicalOperator', e.target.value)}
          >
            {[{ value: "AND", label: "و" }, { value: "OR", label: "یا" }].map((type) => (
              <MenuItem key={type.value} value={type.value}
                sx={{
                  display: "flex",
                  justifyContent: "end"
                }}
              >
                {type.label}
              </MenuItem>
            ))}
          </Select>
          {/* )} */}
        </Box>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
          }}
        >

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>نوع سوال</InputLabel>
            <Select
              value={condition.questionType}
              label="نوع سوال"
              onChange={(e) => updateFn("questionType", e.target.value)}
            >
              <MenuItem
                value=""
                onClick={() => updateFn("questionType", "")}
                sx={{
                  fontStyle: "italic",
                  color: "text.secondary",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                None
              </MenuItem>
              <Divider />
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

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>حالت</InputLabel>
            <Select
              value={condition.operatorType}
              label="حالت"
              onChange={(e) => updateFn("operatorType", e.target.value)}
              disabled={!condition.questionType}
            >
              {getQuestion(condition.questionType).map((op) => (
                <MenuItem key={op.value} value={op.value}>
                  {op.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>شرط</InputLabel>
            <Select
              value={condition.conditionType}
              label="شرط"
              onChange={(e) => updateFn("conditionType", e.target.value)}
              disabled={!condition.operatorType}
            >
              {getCondition(condition.questionType, condition.operatorType).map((val) => (
                <MenuItem key={val.value} value={val.value}>
                  {val.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {getInput(condition.questionType, condition.operatorType, condition.conditionType, condition.value, (value) =>
            updateFn("value", value),
          )}

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {/* {(isSubCondition || index === 0) && ( */}
              <Button
                variant="contained"
                color="secondary"
                onClick={() => addSubCondition(index,subIndex)}
                startIcon={<Add />}
                sx={{
                  background: "#FFF",
                  color: "#1758BA",
                  border: "2px solid #1758BA",
                  p: 1.5,
                  maxWidth: "52px",
                  borderRadius: 2,
                }}
              />
 
            {(subIndex  !== 0) && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => removeSubCondition(subIndex, index)
                }
                startIcon={<Delete />}
                sx={{
                  background: "#FFF",
                  color: "#FA4D56",
                  border: "2px solid #FA4D56",
                  p: 1.5,
                  maxWidth: "52px",
                  borderRadius: 2,
                }}
              />
             )} 
          </Box>
        </Box>
      </Box>
    )
  }

  const handleSubmit = () => {
    console.log('Submitted conditions:', conditions[0]);

  }

  return (
    <Box sx={{ width: "100%", p: 3, display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr" }}>
      {conditions.map((condition, index) => (
        <Box key={index} sx={{ mb: 2, width: "100%" }}>


          {condition.subConditions.map((subCondition, subIndex) => (
            <Box key={`${index}-${subIndex}`} sx={{ ml: 4, mt: 2 }}>
              {renderConditionInputs(subCondition, index, subIndex)}
            </Box>
          ))}

          {/* Go To Section */}
          <Box sx={{ mt: 2, ml: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>:برو به</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <Select value={condition.goTo.type} onChange={(e) => updateCondition(index, "goTo", e.target.value)}>
                <MenuItem value="item">آیتم</MenuItem>
                <MenuItem value="section">بخش</MenuItem>
                <MenuItem value="page">صفحه</MenuItem>
              </Select>
            </FormControl>
            {condition.goTo.type && (
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  value={condition.goTo.value}
                  onChange={(e) => {
                    setConditions((prev) => {
                      const newConditions = [...prev]
                      newConditions[index].goTo.value = e.target.value
                      return newConditions
                    })
                  }}
                >
                  <MenuItem value="1">گزینه 1</MenuItem>
                  <MenuItem value="2">گزینه 2</MenuItem>
                  <MenuItem value="3">گزینه 3</MenuItem>
                </Select>
              </FormControl>
            )}

            <Typography sx={{ mr: 7.6 }}>در غیر اینصورت برو به:</Typography>
            <FormControl sx={{ minWidth: 382 }}>
              <Select value={condition.goTo.type} onChange={(e) => updateCondition(index, "goTo", e.target.value)}>
                <MenuItem value="item">آیتم</MenuItem>
                <MenuItem value="section">بخش</MenuItem>
                <MenuItem value="page">صفحه</MenuItem>
              </Select>
            </FormControl>
            {/* removeCondition */}
            <Button variant="outlined" color="error" sx={{ minWidth: 150, py: 2, }} onClick={() => removeCondition(index)}>
              حذف این شرط
            </Button>

          </Box>

          <Divider sx={{ my: 3 }} />
        </Box>
      ))}




      <Button variant="outlined" onClick={addCondition} sx={{ maxWidth: 150, ml: 10 }}>
        افزودن شرط جدید
      </Button>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>


        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          // disabled={conditions.some((c) => !c.conditionType)}
          sx={{ minWidth: 150 }}
        >
          تایید
        </Button>

        <Button variant="outlined" color="error" sx={{ minWidth: 150 }}>
          انصراف
        </Button>
      </Box>

    </Box>
  )
}

