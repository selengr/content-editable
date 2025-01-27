"use client"


interface Condition {
  subConditions: SubCondition[]
  goTo: {
    type: string
    value: string
  }
}

interface SubCondition {
  logicalOperator: "AND" | "OR" | string
  questionType: string
  operatorType: string
  conditionType: string
  value: string
  id: string
}


import Image from 'next/image'
import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { SelectOption } from './_types/conditions'
import JSONData_First from '../../../public/assets/fake-data/first.json'
import JSONData_goTo from '../../../public/assets/fake-data/goTo.json'
import { Box, FormControl, MenuItem, Select, Button, IconButton, Typography } from '@mui/material'
import TrashIcon from "@/../public/images/home-page/trash.svg";
import PlusIcon from "@/../public/images/home-page/Add-fill.svg";
import { LoadingButton } from '@mui/lab'
import CustomSelect from './_components/custom-select'
import { CircleDivider } from './_components/circle-divider'

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";


export default function DependentSelectForm() {
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [conditions, setConditions] = useState<Condition[]>([
    {
      subConditions: [{
        logicalOperator: null,
        questionType: "",
        operatorType: "",
        conditionType: "",
        value: "",
        id: ""
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
        subConditions: [{
          logicalOperator: "",
          questionType: "",
          operatorType: "",
          conditionType: "",
          value: "",
          id: ""
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
          logicalOperator: "",
          questionType: "",
          operatorType: "",
          conditionType: "",
          value: "",
          id: ""
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

      // if (field === 'questionType') {
      //   newConditions[index].subConditions.operatorType = '';
      //   newConditions[index].subConditions.conditionType = '';
      //   newConditions[index].subConditions.value = '';
      // } else if (field === 'operatorType') {
      //   newConditions[index].subConditions.conditionType = '';
      //   newConditions[index].subConditions.value = '';
      // }
      return newConditions;
    });
  }


  const updateSubCondition = (conditionIndex: number, subIndex: number, field: keyof SubCondition, value: string) => {
    console.log("value", value)
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


  let data: any = JSONData_First.dataList

  const questionTypes = data.map(item => {
    const isCalculation = item.elementStr === 'CALCULATION';
    const isTextFieldDate = item.extMap.TEXT_FIELD_PATTERN === 'DATE';
    const isMultiSelect = Boolean(item.extMap.MULTI_SELECT);
    const questionType = isCalculation
      ? `${item.elementStr}*${item.extMap.UNIC_NAME}` : isTextFieldDate
        ? `${item.extMap.QUESTION_TYPE}_${item.extMap.TEXT_FIELD_PATTERN}*${item.extMap.UNIC_NAME}` : isMultiSelect
        ? `${item.extMap.QUESTION_TYPE}_MULTI_SELECT*${item.extMap.UNIC_NAME}`
        : `${item.extMap.QUESTION_TYPE}*${item.extMap.UNIC_NAME || ''}`;

    return {
      value: questionType,
      label: item.caption
    };
  });

  const calculationTypes = data
    .filter(item => item.elementStr === 'CALCULATION')
    .map(item => ({
      value: item.extMap.QUESTION_TYPE || '',
      label: item.caption
    }))
  const questionGoTo = JSONData_goTo.dataList
    .map(item => ({
      value: item.extMap.QUESTION_TYPE || '',
      label: item.caption
    }))

  const getInput = (type: string, operator: string, condition: string, value: string, setValue: (value: string) => void) => {
    const combinedKey = `${type.split('*')[0]}_${operator}_${condition}`
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


      case 'MULTIPLE_CHOICE_MULTI_SELECT_OPTION_containAny':
      case 'MULTIPLE_CHOICE_MULTI_SELECT_OPTION_not_containAny':
      case 'MULTIPLE_CHOICE_MULTI_SELECT_OPTION_equal':
      case 'MULTIPLE_CHOICE_MULTI_SELECT_OPTION_not_equal':
       return data?.map((item) => {debugger
          if(item?.extMap?.UNIC_NAME === type.split('*')[1]){
             const options = item?.extMap?.OPTIONS;

             const optionsList = []
              Object.keys(options).forEach(key => {
                optionsList.push({
                     value: key, 
                     label: options[key][1] 
                 })
             });    
             return <CustomSelect
             value={value || ''}
             onChange={(e) => setValue(e.target.value as string)}
             options={optionsList}
             sx={{ minWidth: 200 }}
             />
           }
         }) 
        
        
        
        
        // <FormControl>
        //   <Select
        //     value={value}
        //     label="calculation"
        //     sx={{
        //       minWidth: { md: 200 },
        //     }}
        //     onChange={(e) => setValue(e.target.value)}
        //   >
        //     {calculationTypes.map((type) => (
        //       <MenuItem key={type.value} value={type.value}
        //       >
        //         {type.label}
        //       </MenuItem>
        //     ))}
        //   </Select>
        // </FormControl>



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


      case 'TEXT_FIELD_DATE_DATE_beforeDate':
      case 'TEXT_FIELD_DATE_QUESTION_afterDate':
        return <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              "& .rmdp-wrapper.rmdp-border": {
                borderRadius: "20px",
              },
            }}
          >
            <DatePicker
              shadow={false}
              calendar={persian}
              locale={persian_fa}
              value={calendarValue}
              // onChange={(e: any) => setCalendarValue(e)}
              onChange={(e : any) => setValue(e as string)}
              className={"rmdp-mobile"}
              zIndex={9999}
              inputClass="h-[50px] px-4 border-[1px] w-full border-neutral-300 rounded-xl text-left p-1"
              highlightToday
              portal
            />
          </Box>
        </>


      case 'SPECTRAL_VALUE_greater':
      case 'SPECTRAL_VALUE_less':
      case 'SPECTRAL_VALUE_greaterEqual':
      case 'SPECTRAL_VALUE_lessEqual':
      case 'SPECTRAL_VALUE_equal':
        return <TextField
          label=""
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

      case 'SPECTRAL_QUESTION_greater':
      case 'SPECTRAL_QUESTION_less':
      case 'SPECTRAL_QUESTION_greaterEqual':
      case 'SPECTRAL_QUESTION_lessEqual':
      case 'SPECTRAL_QUESTION_equal':
        // case 'SPECTRAL_CALCULATION':
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={value}
            label=""
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

      case 'SPECTRAL_CALCULATION_greater':
      case 'SPECTRAL_CALCULATION_less':
      case 'SPECTRAL_CALCULATION_greaterEqual':
      case 'SPECTRAL_CALCULATION_lessEqual':
      case 'SPECTRAL_CALCULATION_equal':
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



      case 'CALCULATION_VALUE_greater':
      case 'CALCULATION_VALUE_less':
      case 'CALCULATION_VALUE_greaterEqual':
      case 'CALCULATION_VALUE_lessEqual':
      case 'CALCULATION_VALUE_equal':
        return <TextField
          label=""
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

      case 'CALCULATION_QUESTION_greater':
      case 'CALCULATION_QUESTION_less':
      case 'CALCULATION_QUESTION_greaterEqual':
      case 'CALCULATION_QUESTION_lessEqual':
      case 'CALCULATION_QUESTION_equal':
        return <FormControl sx={{ minWidth: 200 }}>
          <Select
            value={value}
            label=""
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

      case 'CALCULATION_CALCULATION_greater':
      case 'CALCULATION_CALCULATION_less':
      case 'CALCULATION_CALCULATION_greaterEqual':
      case 'CALCULATION_CALCULATION_lessEqual':
      case 'CALCULATION_CALCULATION_equal':
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
    const combinedKey = `${type.split('*')[0]}_${operator}`

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
      case 'MULTIPLE_CHOICE_MULTI_SELECT_OPTION':
        return [
          { value: 'containAny', label: 'شامل شدن' },
          { value: 'not_containAny', label: 'شامل نشدن' },
          { value: 'equal', label: 'برابر  با' },
          { value: 'not_equal', label: 'نابرابر با' }
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

      case 'TEXT_FIELD_DATE_DATE':
      case 'TEXT_FIELD_DATE_QUESTION':
        return [
          { value: 'beforeDate', label: 'قبل از' },
          { value: 'afterDate', label: 'بعد از' }
        ]

      case 'SPECTRAL_VALUE':
      case 'SPECTRAL_QUESTION':
      case 'SPECTRAL_CALCULATION':
        return [
          { value: 'greater', label: 'بزرگتر از' },
          { value: 'less', label: 'کوچکتر  از' },
          { value: 'greaterEqual', label: 'بزرگتر مساوی' },
          { value: 'lessEqual', label: ' کوچکتر مساوی' },
          { value: 'equal', label: 'برابر  با' }
        ]

      case 'CALCULATION_VALUE':
      case 'CALCULATION_QUESTION':
      case 'CALCULATION_CALCULATION':
        return [
          { value: 'greater', label: 'بزرگتر از' },
          { value: 'less', label: 'کوچکتر از' },
          { value: 'greaterEqual', label: 'بزرگتر مساوی' },
          { value: 'lessEqual', label: ' کوچکتر مساوی' },
          { value: 'equal', label: 'برابر  با' },
          { value: 'not_equal', label: 'نابرابر با' }
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
    switch (type.split('*')[0]) {
      case 'MULTIPLE_CHOICE':
        return [
          { value: 'VALUE', label: 'ارزش' },
          { value: 'QUESTION', label: 'سوال ' },
          { value: 'CALCULATION', label: 'محاسبه‌گر' },
          { value: 'OPTION', label: 'گزینه' }
        ]
      case 'MULTIPLE_CHOICE_MULTI_SELECT':
        return [
          { value: 'OPTION', label: 'گزینه' }
        ]
      case 'TEXT_FIELD':
        return [
          { value: 'VALUE', label: 'ارزش' },
          { value: 'TEXT', label: 'متن' }
        ]
      case 'TEXT_FIELD_DATE':
        return [
          { value: 'QUESTION', label: 'سوال' },
          { value: 'DATE', label: 'تاریخ' },
        ]
      case 'SPECTRAL':
        return [
          { value: 'VALUE', label: 'ارزش' },
          { value: 'QUESTION', label: 'سوال ' },
          { value: 'CALCULATION', label: 'محاسبه‌گر' }
        ]
      case 'CALCULATION':
        return [
          { value: 'VALUE', label: 'ارزش' },
          { value: 'QUESTION', label: 'سوال ' },
          { value: 'CALCULATION', label: 'محاسبه‌گر' }
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

    const updateFn =
      // isSubCondition && subIndex !== undefined
      (field: keyof SubCondition, value: string) => updateSubCondition(index, subIndex, field, value)
    // : (field: keyof Condition, value: string) => updateCondition(index, field, value)

    return (
      <Box sx={{ mb: 2, display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {subIndex === 0 && <Typography sx={{ color: "#393939", fontSize: "14px", width: 90 }}>اگر</Typography>}

          {subIndex > 0 && (


            <CustomSelect
              value={condition.logicalOperator || ''}
              onChange={(e) => updateFn('logicalOperator', e.target.value as string)}
              options={[{ value: "AND", label: "و" }, { value: "OR", label: "یا" }]}
              sx={{ minWidth: 78 }}
            />


          )}
        </Box>
        <Box
          rowGap={3}
          columnGap={2}
          display="flex"
          gridTemplateColumns={{
            // xs: "repeat(2, 1fr)",
            // sm: "repeat(4, 1fr)",
            // md: "repeat(6, 1fr)",
          }}
        >

          <FormControl sx={{ minWidth: 200 }}>

            <CustomSelect
              value={condition.questionType}
              label="نوع سوال"
              onChange={(e) => updateFn("questionType", e.target.value as string)}
              options={questionTypes}
              sx={{ minWidth: 200 }}
            />


          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <CustomSelect
              value={condition.operatorType}
              label="حالت"
              onChange={(e) => updateFn("operatorType", e.target.value as string)}
              disabled={!condition.questionType}
              options={getQuestion(condition.questionType)}
              sx={{ minWidth: 200 }}
            />

          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <CustomSelect
              value={condition.conditionType}
              label="شرط"
              onChange={(e) => updateFn("conditionType", e.target.value as string)}
              disabled={!condition.operatorType}
              options={getCondition(condition.questionType, condition.operatorType)}
              sx={{ minWidth: 200 }}
            />

          </FormControl>

          {getInput(condition.questionType, condition.operatorType, condition.conditionType, condition.value, (value) =>
            updateFn("value", value),
          )}

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <IconButton
              onClick={() => addSubCondition(index, subIndex)}
              sx={{
                width: "52px",
                height: "52px",
                bgcolor: "#1758BA0D",
                borderRadius: "10px",
                border: "1px solid #1758BA",
              }}
            >
              <Image src={PlusIcon} alt="" width={22} height={22} />
            </IconButton>


            {(subIndex !== 0) && (
              <IconButton
                onClick={() => removeSubCondition(index, subIndex)}
                sx={{
                  width: "52px",
                  height: "52px",
                  bgcolor: "#FA4D560D",
                  borderRadius: "10px",
                  border: "1px solid #FA4D56",
                  '&: hover': {
                    bgcolor: "#FA4D560D",
                  }
                }}
              >
                <Image src={TrashIcon} alt="" width={24} height={24} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    )
  }

  const handleSubmit = () => {
    console.log('Submitted conditions:', conditions[0]);
    console.log('Submitted conditions:', conditions);
  }

  return (
    <Box sx={{ width: "100%", p: 3, display: "flex", flexDirection: "column", justifyContent: "center", direction: "ltr" }}>

      <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 700 }}>شرط</Typography>

      {conditions.map((condition, index) => (
        <Box key={index} sx={{ mb: 2, width: "100%" }}>


          {condition.subConditions.map((subCondition, subIndex) => (
            <Box key={`${index}-${subIndex}`} sx={{ ml: 4, mt: 2 }}>
              {renderConditionInputs(subCondition, index, subIndex)}
            </Box>
          ))}

          {/* Go To Section */}
          <Box sx={{ mt: 2, ml: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: "#393939", fontSize: "14px" }}>:برو به</Typography>
            <FormControl sx={{ minWidth: 200, ml: 5 }}>
              <CustomSelect
                value={condition.goTo.type}
                onChange={(e) => updateCondition(index, "goTo", e.target.value as string)}
                options={questionGoTo}
                sx={{ minWidth: 200 }}
              />

            </FormControl>

            <Typography sx={{ color: "#393939", fontSize: "14px", mr: 9.5 }}>در غیر اینصورت برو به:</Typography>
            <FormControl sx={{ minWidth: 410 }}>

              <FormControl sx={{ minWidth: 200 }}>
                <CustomSelect
                  value={condition.goTo.type}
                  onChange={(e) => updateCondition(index, "goTo", e.target.value as string)}
                  options={questionGoTo}
                  sx={{ minWidth: 200 }}
                />

              </FormControl>
            </FormControl>


            <IconButton
              onClick={() => removeCondition(index)}
              sx={{
                width: 113,
                height: "52px",
                bgcolor: "#FA4D560D",
                borderRadius: "8px",
                border: "1px solid #FA4D56",
                '&: hover': {
                  bgcolor: "#FA4D560D",
                }
              }}
            >
              <Typography sx={{ color: "#FA4D56", fontSize: "14px" }}>حذف این شرط</Typography>

            </IconButton>

          </Box>


          <CircleDivider />
        </Box>
      ))}




      <Button variant="outlined" onClick={addCondition}
        sx={{
          maxWidth: 155, ml: 10, bgcolor: "#1758BA", borderRadius: "8px",
          height: 52, color: "white"
        }}
      >
        افزودن شرط جدید
      </Button>


      <Box
        display="flex"
        gap={3}
        width="100%"
        marginBottom={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <LoadingButton
          type="button"
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: "#1758BA",
            borderRadius: "8px",
            height: "52px",
            "&.MuiButtonBase-root:hover": {
              backgroundColor: "#1758BA",
            },
            minWidth: 113,
          }}
        >
          <Typography
            variant="body2"
            component={"p"}
            py={0.5}
            sx={{ color: "#fff", fontWeight: 500 }}
          >
            تایید
          </Typography>
        </LoadingButton>

        <Button
          type="button"
          variant="outlined"
          sx={{
            height: "52px",
            minWidth: 113,
            borderRadius: "8px",
            borderColor: "#1758BA",
            background: "#FFF",
          }}
        >
          <Typography
            variant="body2"
            component={"p"}
            py={0.5}
            color={"#1758BA"}
            sx={{ fontWeight: 500 }}
          >
            انصراف
          </Typography>
        </Button>
      </Box>


    </Box>
  )
}

