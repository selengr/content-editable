"use client"

import { useState, useEffect } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Divider } from '@mui/material'
import JSONData from '../../../public/assets/fake-data/response_v1.json'


enum QuestionType {
  TEXT_FIELD = "TEXT_FIELD",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  MULTIPLE_CHOICE_IMAGE = "MULTIPLE_CHOICE_IMAGE",
  SPECTRAL = "SPECTRAL"
}


export interface ExtMap {
  QUESTION_TYPE?: string;
  DESCRIPTION?: string;
  MAXIMUM_LEN?: string;
  UNIC_NAME?: string;
  REQUIRED?: string;
  MINIMUM_LEN?: string;
  TEXT_FIELD_PATTERN?: string;
  MULTI_SELECT?: string;
  OPTIONS?: {
    [key: string]: [number, string];
  };
  OPTIONS_SIZE?: number;
  FORMULA?: string;
}

export interface DataItem {
  value: string;
  caption: string;
  elementStr: string;
  extMap: ExtMap;
}

export interface SelectOption {
  value: string;
  label: string;
}






interface DependentSelectFormProps {
  data: DataItem[]
}

export default function DependentSelectForm() {

  const [questionType, setQuestionType] = useState('')
  const [operatorType, setOperatorType] = useState('')
  const [conditionType, setConditionType] = useState('')
  // const [condition, setCondition] = useState('')

  let data: any = JSONData.dataList

  // Filter unique question types
  const questionTypes = data
    .filter(item => item.elementStr === 'QUESTION')
    .map(item => ({
      value: item.extMap.QUESTION_TYPE || '',
      label: item.caption
    }))

  // Get operators based on question type
  const getOperators = (type: string): SelectOption[] => {
    switch (type) {
      case 'MULTIPLE_CHOICE':
        return [
          { value: 'greater', label: 'بزرگتر بود از' },
          { value: 'less', label: 'کوچکتر بود از' },
          { value: 'equal', label: 'برابر بود با' },
          { value: 'not_equal', label: 'نابرابر بود با' }
        ]
      case 'TEXT_FIELD':
        return [
          { value: 'greater', label: 'بزرگتر بود از' },
          { value: 'less', label: 'کوچکتر بود از' },
          { value: 'equal', label: 'برابر بود با' }
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

  // Get values based on question type and operatorType
  const getCondition = (type: string, operator: string): SelectOption[] => {
    const combinedKey = `${type}_${operator}`
    // const question = data.find(
    //   item => item.elementStr === 'QUESTION' && item.extMap.QUESTION_TYPE === type
    // )

    // if (!question) return []

    // if (type === 'MULTIPLE_CHOICE' && question.extMap.OPTIONS) {
    //   return Object.entries(question.extMap.OPTIONS).map(([key, [_, label]]) => ({
    //     value: key,
    //     label: label.toString()
    //   }))
    // }

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
      case 'TEXT_FIELD':
        return [
          { value: 'greater', label: 'بزرگتر بود از' },
          { value: 'less', label: 'کوچکتر بود از' },
          { value: 'equal', label: 'برابر بود با' }
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
          { value: 'VALUE', label: 'VALUE' },
          { value: 'QUESTION', label: 'QUESTIONion' },
          { value: 'CALCULATION', label: 'CALCULATION' },
          { value: 'OPTION', label: 'OPTIONon' }
        ]
      default:
        return []
    }
  }

  // Get conditions based on previous selections
  const getConditions = (): SelectOption[] => {
    if (!questionType || !operatorType || !conditionType) return []

    return [
      { value: 'and', label: 'و' },
      { value: 'or', label: 'یا' }
    ]
  }

  // Reset dependent fields when parent selection changes
  useEffect(() => {
    setOperatorType('')
    setConditionType('')
    // setCondition('')
  }, [questionType])

  useEffect(() => {
    setConditionType('')
    // setCondition('')
  }, [operatorType])

  useEffect(() => {
    // setCondition('')
  }, [conditionType])

  return (
    <Box sx={{ minWidth: 800, p: 3, direction: "ltr" }}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ direction: 'rtl' }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>نوع سوال</InputLabel>


          <Select
            value={questionType}
            label="نوع سوال"
            sx={{
              textAlign: 'right',
              minWidth: { md: 220 },
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





        {/* <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>شرط</InputLabel>
          <Select
            value={conditionType}
            label="شرط"
            // onChange={(e) => setCondition(e.target.value)}
            disabled={!conditionType}
          >
            {getConditions().map((cond) => (
              <MenuItem key={cond.value} value={cond.value}>
                {cond.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

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

