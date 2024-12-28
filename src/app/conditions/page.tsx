"use client"

// import { Select } from "@/components/select/Select";
// import { Box, Divider, MenuItem } from "@mui/material";
import JSONData from '../../../public/assets/fake-data/response_v1.json'


// const page = () => {
//   return (
//     <div dir="rtl" className="flex items-center justify-end h-full w-full p-24">

//       <Box
//         rowGap={3}
//         columnGap={2}
//         display="grid"
//         gridTemplateColumns={{
//           xs: 'repeat(1, 1fr)',
//           sm: 'repeat(2, 1fr)'
//         }}
//       // sx={{ direction: 'rtl' }}
//       >
//         <Select name="appType" label="نوع اپ"
//           sx={{
//             // textAlign: 'right',
//             minWidth: { md: 220 },
//           }}
//         >
//           <MenuItem
//             value=""
//             // onClick={() => handleClearService(index)}
//             sx={{
//               fontStyle: 'italic', color: 'text.secondary',
//               display: "flex",
//               justifyContent: "end"
//             }}
//           >
//             None
//           </MenuItem>
//           <Divider />

//           {JSONData.dataList?.map((service) => (
//             <MenuItem
//               key={service.value}
//               value={service.value}
//               sx={{
//                 display: "flex",
//                 justifyContent: "end"
//               }}
//             // onClick={() => handleSelectService(index, service.name)}
//             >
//               {service.caption}
//             </MenuItem>
//           ))}

//           {/* {JSONData.dataList?.map((app: any) => (
//             <option key={app.value} value={app.value}>
//               {app.caption}
//             </option>
//           ))} */}

//         </Select>
//       </Box>
//     </div>
//   );
// }

// export default page;

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






import { useState, useEffect } from 'react'
import { Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material'
// import { DataItem, SelectOption } from '../types/select-types'

interface DependentSelectFormProps {
  data: DataItem[]
}

export default function DependentSelectForm() {
  const [questionType, setQuestionType] = useState('')
  const [operator, setOperator] = useState('')
  const [value, setValue] = useState('')
  const [condition, setCondition] = useState('')

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

  // Get values based on question type and operator
  const getValues = (type: string): SelectOption[] => {
    const question = data.find(
      item => item.elementStr === 'QUESTION' && item.extMap.QUESTION_TYPE === type
    )

    if (!question) return []

    if (type === 'MULTIPLE_CHOICE' && question.extMap.OPTIONS) {
      return Object.entries(question.extMap.OPTIONS).map(([key, [_, label]]) => ({
        value: key,
        label: label.toString()
      }))
    }

    return []
  }

  // Get conditions based on previous selections
  const getConditions = (): SelectOption[] => {
    if (!questionType || !operator || !value) return []

    return [
      { value: 'and', label: 'و' },
      { value: 'or', label: 'یا' }
    ]
  }

  // Reset dependent fields when parent selection changes
  useEffect(() => {
    setOperator('')
    setValue('')
    setCondition('')
  }, [questionType])

  useEffect(() => {
    setValue('')
    setCondition('')
  }, [operator])

  useEffect(() => {
    setCondition('')
  }, [value])

  return (
    <Box sx={{ minWidth: 800, p: 3, direction: "ltr" }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>نوع سوال</InputLabel>
          <Select
            value={questionType}
            label="نوع سوال"
            onChange={(e) => setQuestionType(e.target.value)}
          >
            {questionTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>عملگر</InputLabel>
          <Select
            value={operator}
            label="عملگر"
            onChange={(e) => setOperator(e.target.value)}
            disabled={!questionType}
          >
            {getOperators(questionType).map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>مقدار</InputLabel>
          <Select
            value={value}
            label="مقدار"
            onChange={(e) => setValue(e.target.value)}
            disabled={!operator}
          >
            {getValues(questionType).map((val) => (
              <MenuItem key={val.value} value={val.value}>
                {val.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>شرط</InputLabel>
          <Select
            value={condition}
            label="شرط"
            onChange={(e) => setCondition(e.target.value)}
            disabled={!value}
          >
            {getConditions().map((cond) => (
              <MenuItem key={cond.value} value={cond.value}>
                {cond.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          disabled={!condition}
          sx={{ height: 56 }}
        >
          تایید
        </Button>
      </Box>
    </Box>
  )
}

