"use client"

// import { useState, useEffect } from 'react'
// import TextField from '@mui/material/TextField';
// import { SelectOption } from './_types/conditions'
// import JSONData from '../../../public/assets/fake-data/response_v1.json'
// import { Box, FormControl, InputLabel, MenuItem, Select, Button, Divider } from '@mui/material'



// export default function DependentSelectForm() {

//   const [questionType, setQuestionType] = useState('')
//   const [operatorType, setOperatorType] = useState('')
//   const [conditionType, setConditionType] = useState('')


//   let data: any = JSONData.dataList

//   const questionTypes = data
//     // .filter(item => item.elementStr === 'QUESTION')
//     .map(item => ({
//       value: item.extMap.QUESTION_TYPE || '',
//       label: item.caption
//     }))
//   const calculationTypes = data
//     .filter(item => item.elementStr === 'CALCULATION')
//     .map(item => ({
//       value: item.extMap.QUESTION_TYPE || '',
//       label: item.caption
//     }))



//   const getInput = (type: string, operator: string, condition: string) => {
//     const combinedKey = `${type}_${operator}_${condition}`
//     switch (combinedKey) {
//       case 'MULTIPLE_CHOICE_VALUE_less':
//       case 'MULTIPLE_CHOICE_VALUE_greater':
//       case 'MULTIPLE_CHOICE_VALUE_equal':
//       case 'MULTIPLE_CHOICE_VALUE_not_equal':
//         return <FormControl sx={{ minWidth: 200 }}>
//           <TextField
//             label="Quantity"
//             type="number"
//             defaultValue="1"
//           />
//         </FormControl>
//       case 'MULTIPLE_CHOICE_QUESTION_less':
//       case 'MULTIPLE_CHOICE_QUESTION_greater':
//       case 'MULTIPLE_CHOICE_QUESTION_equal':
//       case 'MULTIPLE_CHOICE_QUESTION_not_equal':
//         return <FormControl sx={{ minWidth: 200 }}>
//           <Select
//             value={questionType}
//             label="نوع سوال"
//             sx={{
//               minWidth: { md: 200 },
//             }}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             {questionTypes.map((type) => (
//               <MenuItem key={type.value} value={type.value}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "end"
//                 }}
//               >
//                 {type.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       case 'MULTIPLE_CHOICE_OPTION_less':
//       case 'MULTIPLE_CHOICE_OPTION_greater':
//       case 'MULTIPLE_CHOICE_OPTION_equal':
//       case 'MULTIPLE_CHOICE_OPTION_not_equal':
//         return <FormControl sx={{ minWidth: 200 }}>
//           <Select
//             value={questionType}
//             label="نوع سوال2"
//             sx={{
//               minWidth: { md: 200 },
//             }}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             {questionTypes.map((type) => (
//               <MenuItem key={type.value} value={type.value}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "end"
//                 }}
//               >
//                 {type.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//       case 'MULTIPLE_CHOICE_CALCULATION_less':
//       case 'MULTIPLE_CHOICE_CALCULATION_greater':
//       case 'MULTIPLE_CHOICE_CALCULATION_equal':
//       case 'MULTIPLE_CHOICE_CALCULATION_not_equal':
//         return <FormControl sx={{ minWidth: 200 }}>
//           <Select
//             value={questionType}
//             label="calc"
//             sx={{
//               minWidth: { md: 200 },
//             }}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             {calculationTypes.map((type) => (
//               <MenuItem key={type.value} value={type.value}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "end"
//                 }}
//               >
//                 {type.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//       case 'TEXT_FIELD_TEXT_startWith':
//       case 'TEXT_FIELD_TEXT_endWith':
//         return <TextField
//           label=""
//           // type="number"
//           defaultValue=""
//         />

//       case 'TEXT_FIELD_TEXT_containAny':
//       case 'TEXT_FIELD_TEXT_not_containAny':
//         return <TextField
//           label=""
//           // type="number"
//           // need to change
//           defaultValue=""
//         />

//       case 'TEXT_FIELD_VALUE_lenEqualText':
//       case 'TEXT_FIELD_VALUE_lenGraterThan':
//       case 'TEXT_FIELD_VALUE_lenLessThanText':
//         return <TextField
//           label=""
//           type="number"
//           defaultValue=""
//         />


//       default:
//         return <TextField
//           label=""
//           defaultValue=""
//           disabled
//         />

//     }
//   }


//   const getCondition = (type: string, operator: string): SelectOption[] => {
//     const combinedKey = `${type}_${operator}`

//     switch (combinedKey) {
//       case 'MULTIPLE_CHOICE_VALUE':
//       case 'MULTIPLE_CHOICE_QUESTION':
//       case 'MULTIPLE_CHOICE_OPTION':
//       case 'MULTIPLE_CHOICE_CALCULATION':
//         return [
//           { value: 'greater', label: 'بزرگتر بود' },
//           { value: 'less', label: 'کوچکتر بود از' },
//           { value: 'equal', label: 'برابر بود با' },
//           { value: 'not_equal', label: 'نابرابر بود با' }
//         ]
//       case 'TEXT_FIELD_VALUE':
//       case 'TEXT_FIELD_TEXT':
//         return [
//           { value: 'startWith', label: 'شروع شدن با ' },
//           { value: 'endWith', label: 'پایان یافتن با' },
//           { value: 'containAny', label: 'شامل شدن' },
//           { value: 'not_containAny', label: 'شامل نشدن' },
//           { value: 'lenEqualText', label: 'طول متن برابر با ' },
//           { value: 'lenGraterThan', label: 'طول متن بیشتر از' },
//           { value: 'lenLessThanText', label: ' طول متن کمتر از' }
//         ]
//       case 'MULTIPLE_CHOICE':
//         return [
//           { value: 'selected', label: 'انتخاب شده' },
//           { value: 'not_selected', label: 'انتخاب نشده' }
//         ]
//       default:
//         return []
//     }

//   }

//   const getQuestion = (type: string): SelectOption[] => {
//     switch (type) {
//       case 'MULTIPLE_CHOICE':
//         return [
//           { value: 'VALUE', label: 'ارزش' },
//           { value: 'QUESTION', label: 'سوال ' },
//           { value: 'CALCULATION', label: 'محاسبه‌گر' },
//           { value: 'OPTION', label: 'گزینه' }
//         ]
//       case 'TEXT_FIELD':
//         return [
//           { value: 'VALUE', label: 'ارزش' },
//           { value: 'TEXT', label: 'متنی' }
//         ]
//       default:
//         return []
//     }
//   }

//   useEffect(() => {
//     setOperatorType('')
//     setConditionType('')
//   }, [questionType])

//   useEffect(() => {
//     setConditionType('')
//   }, [operatorType])



//   return (
//     <Box sx={{ minWidth: 800, p: 3, direction: "ltr" }}>

//       <Box
//         rowGap={3}
//         columnGap={2}
//         display="grid"
//         gridTemplateColumns={{
//           xs: 'repeat(1, 1fr)',
//           sm: 'repeat(3, 1fr)',
//           md: 'repeat(4, 1fr)',
//         }}
//       >
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>نوع سوال</InputLabel>
//           <Select
//             value={questionType}
//             label="نوع سوال"
//             sx={{
//               minWidth: { md: 200 },
//             }}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             <MenuItem
//               value=""
//               onClick={() => setQuestionType("")}
//               sx={{
//                 fontStyle: 'italic', color: 'text.secondary',
//                 display: "flex",
//                 justifyContent: "end"
//               }}
//             >
//               None
//             </MenuItem>
//             <Divider />
//             {questionTypes.map((type) => (
//               <MenuItem key={type.value} value={type.value}
//                 sx={{
//                   display: "flex",
//                   justifyContent: "end"
//                 }}
//               >
//                 {type.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>حالت</InputLabel>
//           <Select
//             value={operatorType}
//             label="حالت"
//             onChange={(e) => setOperatorType(e.target.value)}
//             disabled={!questionType}
//           >
//             {getQuestion(questionType).map((op) => (
//               <MenuItem key={op.value} value={op.value}>
//                 {op.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>شرط</InputLabel>
//           <Select
//             value={conditionType}
//             label="شرط"
//             onChange={(e) => setConditionType(e.target.value)}
//             disabled={!operatorType}
//           >
//             {getCondition(questionType, operatorType).map((val) => (
//               <MenuItem key={val.value} value={val.value}>
//                 {val.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>


//         {getInput(questionType, operatorType, conditionType)}


//         <Button
//           variant="contained"
//           color="primary"
//           disabled={!conditionType}
//           sx={{ height: 56 }}
//         >
//           تایید
//         </Button>
//       </Box>
//     </Box>
//   )
// }





interface Condition {
  questionType: string;
  operatorType: string;
  conditionType: string;
  value: string;
}







import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { SelectOption } from './_types/conditions'
import JSONData from '../../../public/assets/fake-data/response_v1.json'
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Divider, IconButton, Typography } from '@mui/material'
import { Add, Delete } from '@mui/icons-material';


export default function DependentSelectForm() {
  const [conditions, setConditions] = useState<Condition[]>([{
    questionType: '',
    operatorType: '',
    conditionType: '',
    value: ''
  }])

  const addCondition = () => {
    setConditions([...conditions, {
      questionType: '',
      operatorType: '',
      conditionType: '',
      value: ''
    }])
  }

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index))
  }

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    const newConditions = [...conditions]
    newConditions[index][field] = value
    setConditions(newConditions)
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
              ))}
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
    setConditions(conditions.map(condition => ({...condition, operatorType: '', conditionType: '', value: ''})))
  }, [conditions.map(c => c.questionType).join(',')])

  const handleSubmit = () => {
    console.log('Submitted conditions:', conditions);
    // Here you can send the data to an API or perform any other action
  }

  return (
    <Box sx={{ minWidth: 800, p: 3, direction: "ltr" }}>
      {conditions.map((condition, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="h6">Condition {index + 1}</Typography>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(5, 1fr)',
            }}
          >
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>نوع سوال</InputLabel>
              <Select
                value={condition.questionType}
                label="نوع سوال"
                sx={{
                  minWidth: { md: 200 },
                }}
                onChange={(e) => updateCondition(index, 'questionType', e.target.value)}
              >
                <MenuItem
                  value=""
                  onClick={() => updateCondition(index, 'questionType', "")}
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
                value={condition.operatorType}
                label="حالت"
                onChange={(e) => updateCondition(index, 'operatorType', e.target.value)}
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
                onChange={(e) => updateCondition(index, 'conditionType', e.target.value)}
                disabled={!condition.operatorType}
              >
                {getCondition(condition.questionType, condition.operatorType).map((val) => (
                  <MenuItem key={val.value} value={val.value}>
                    {val.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {getInput(
              condition.questionType,
              condition.operatorType,
              condition.conditionType,
              condition.value,
              (value) => updateCondition(index, 'value', value)
            )}

            <IconButton onClick={() => removeCondition(index)} sx={{ height: 56 }}>
              <Delete />
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button
        variant="contained"
        color="secondary"
        onClick={addCondition}
        startIcon={<Add />}
        sx={{ mt: 2 }}
      >
        Add Condition
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={conditions.some(c => !c.conditionType)}
        sx={{ mt: 2, ml: 2 }}
      >
        تایید
      </Button>
    </Box>
  )
}

