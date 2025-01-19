"use client"

import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { SelectOption } from './_types/conditions'
import JSONData from '../../../public/assets/fake-data/response_v1.json'
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Divider } from '@mui/material'



export default function DependentSelectForm() {

  const [questionType, setQuestionType] = useState('')
  const [operatorType, setOperatorType] = useState('')
  const [conditionType, setConditionType] = useState('')


  let data: any = JSONData.dataList

  const questionTypes = data
    .filter(item => item.elementStr === 'QUESTION')
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



  const getInput = (type: string, operator: string, condition: string) => {
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
            defaultValue="1"
          />
        </FormControl>
      case 'MULTIPLE_CHOICE_QUESTION_less':
      case 'MULTIPLE_CHOICE_QUESTION_greater':
      case 'MULTIPLE_CHOICE_QUESTION_equal':
      case 'MULTIPLE_CHOICE_QUESTION_not_equal':
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={questionType}
            label="نوع سوال"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setQuestionType(e.target.value)}
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
      case 'MULTIPLE_CHOICE_OPTION_less':
      case 'MULTIPLE_CHOICE_OPTION_greater':
      case 'MULTIPLE_CHOICE_OPTION_equal':
      case 'MULTIPLE_CHOICE_OPTION_not_equal':
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={questionType}
            label="نوع سوال2"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setQuestionType(e.target.value)}
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
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={questionType}
            label="calc"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            {calculationTypes.map((type) => (
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


      // { value: 'VALUE', label: 'ارزش' },
      // { value: 'TEXT', label: 'متنی' }

      case 'TEXT_FIELD_TEXT_startWith':
      case 'TEXT_FIELD_TEXT_endWith':
        return <TextField
          label=""
          // type="number"
          defaultValue=""
        />

      case 'TEXT_FIELD_TEXT_startWith':
      case 'TEXT_FIELD_TEXT_endWith':
        return <TextField
          label=""
          // type="number"
          // need to change
          defaultValue=""
        />

      case 'TEXT_FIELD_VALUE_lenEqualText':
      case 'TEXT_FIELD_VALUE_lenGraterThan':
      case 'TEXT_FIELD_VALUE_lenLessThanText':
        return <TextField
          label=""
          type="number"
          defaultValue=""
        />


      default:
        return <TextField
          label=""
          defaultValue=""
          disabled
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
    setOperatorType('')
    setConditionType('')
  }, [questionType])

  useEffect(() => {
    setConditionType('')
  }, [operatorType])



  return (
    <Box sx={{ minWidth: 800, p: 3, direction: "ltr" }}>

      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>نوع سوال</InputLabel>
          <Select
            value={questionType}
            label="نوع سوال"
            sx={{
              minWidth: { md: 200 },
            }}
            onChange={(e) => setQuestionType(e.target.value)}
          >
            <MenuItem
              value=""
              onClick={() => setQuestionType("")}
              sx={{
                fontStyle: 'italic', color: 'text.secondary',
                display: "flex",
                justifyContent: "end"
              }}
            >
              None
            </MenuItem>
            <Divider />
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

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>حالت</InputLabel>
          <Select
            value={operatorType}
            label="حالت"
            onChange={(e) => setOperatorType(e.target.value)}
            disabled={!questionType}
          >
            {getQuestion(questionType).map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>شرط</InputLabel>
          <Select
            value={conditionType}
            label="شرط"
            onChange={(e) => setConditionType(e.target.value)}
            disabled={!operatorType}
          >
            {getCondition(questionType, operatorType).map((val) => (
              <MenuItem key={val.value} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {getInput(questionType, operatorType, conditionType)}


        <Button
          variant="contained"
          color="primary"
          disabled={!conditionType}
          sx={{ height: 56 }}
        >
          تایید
        </Button>
      </Box>
    </Box>
  )
}




