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
}




import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import TextField from '@mui/material/TextField';
import { SelectOption } from './_types/conditions'
// import JSONData from '../../../public/assets/fake-data/response_v2.json'
import JSONData_First from '../../../public/assets/fake-data/first.json'
import JSONData_goTo from '../../../public/assets/fake-data/goTo.json'
import { Box, FormControl, MenuItem, Select, Button, Divider, IconButton, Typography, styled } from '@mui/material'
import TrashIcon from "@/../public/images/home-page/trash.svg";
import PlusIcon from "@/../public/images/home-page/Add-fill.svg";
import { LoadingButton } from '@mui/lab'
import CustomSelect from './_components/custom-select'
import { CircleDivider } from './_components/circle-divider'


export default function DependentSelectForm() {
  const [conditions, setConditions] = useState<Condition[]>([
    {
      subConditions: [{
        logicalOperator: null,
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
        subConditions: [{
          logicalOperator: "",
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
          logicalOperator: "",
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
  const questionGoTo = JSONData_goTo.dataList
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


  console.log("555", conditions[0]?.subConditions.length)

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
            {/* <InputLabel>نوع سوال</InputLabel> */}

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
        // onClick={handleClose}
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

