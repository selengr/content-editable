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


  const getInput = (type: string, operator: string,condition:string) => { 
    const combinedKey = `${type}_${operator}_${condition}`
    switch (combinedKey) {
      case 'MULTIPLE_CHOICE_VALUE_less':    
      case 'MULTIPLE_CHOICE_VALUE_greater':
        case 'MULTIPLE_CHOICE_VALUE_equal':
          case 'MULTIPLE_CHOICE_VALUE_not_equal':
       return <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>ورودی</InputLabel>
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
          return   <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={questionType}
            label="نوع سوال"
            sx={{
              // textAlign: 'right',
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
                 // textAlign: 'right',
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
   label="نوع سوال2"
   sx={{
     // textAlign: 'right',
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


        default:
          return  <TextField 
          label="" 
          defaultValue=""
          disabled
          />
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
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        // sx={{ direction: 'rtl' }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>نوع سوال</InputLabel>


          <Select
            value={questionType}
            label="نوع سوال"
            sx={{
              // textAlign: 'right',
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

         {/* add here input type */}

         


        {getInput(questionType, operatorType,conditionType)}




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




