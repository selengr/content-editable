"use client";

import * as z from "zod";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
// hook-form
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// mui
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Typography, Button, TextField } from "@mui/material";
// others
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
// public
import TrashIcon from "@/../public/images/home-page/trash.svg";
import PlusIcon from "@/../public/images/home-page/Add-fill.svg";
import JSONData_First from "../../../public/assets/fake-data/first.json";
// _components
import {
  CustomSelectController,
  MultiSelectController,
} from "./_components/form/select-controller";
import { CircleDivider } from "./_components/circle-divider";
import CustomTextField from "./_components/form/custom-text-field";
// hooks
import { useGetQacWithOutFilter } from "./hooks/useGetQacWithOutFilter";
import { useGetOnlyAllQuestions } from "./hooks/useGetOnlyAllQuestions";
import { useGetOnlyAllCalculation } from "./hooks/useGetOnlyAllCalculation";
import { formatContainText } from "./utils/formatContainText";

import { DatePicker as DatePickerCustome } from "./_components/DatePicker/DatePicker";

const SubConditionSchema = z.object({
  logicalOperator: z.string().optional(),
  questionType: z.string().min(1, { message: "اين فيلد الزامي است" }),
  operatorType: z.string().min(1, { message: "اين فيلد الزامي است" }),
  conditionType: z.string().min(1, { message: "اين فيلد الزامي است" }),
  // value: z.string().min(1, { message: "اين فيلد الزامي است" }),
  value: z.union([
    z.string().min(1, { message: "اين فيلد الزامي است" }),
    z.array(z.string().min(1, { message: "اين فيلد الزامي است" })),
  ]),
  id: z.string().optional(),
});

const ConditionSchema = z.object({
  subConditions: z.array(SubConditionSchema),
  returnQuestionId: z.string().min(1, { message: "اين فيلد الزامي است" }),
  elseQuestionId: z.string(),
});

const FormSchema = z.object({
  conditions: z.array(ConditionSchema),
});

type FormData = z.infer<typeof FormSchema>;

const calculationTypes = JSONData_First.dataList
  .filter((item) => item.elementStr === "CALCULATION")
  .map((item) => ({
    value: item.extMap.QUESTION_TYPE || "",
    label: item.caption,
  }));

export default function DependentSelectForm() {
  // const [calendarValue, setCalendarValue] = useState(new Date())
  const {
    qacWithOutFilter,
    qacWithOutFilterOptions,
    isFetchingQacWithOutFilter,
  } = useGetQacWithOutFilter();
  const {
    onlyAllQuestions,
    onlyAllQuestionsOptions,
    onlySomeQuestionsOptions,
    isFetchingOnlyAllQuestions,
  } = useGetOnlyAllQuestions();
  const { onlyAllCalculationOptions, isFetchingOnlyAllCalculation } =
    useGetOnlyAllCalculation();

  // console.log("onlyAllCalculationOptions", onlyAllCalculationOptions);

  const methods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      conditions: [
        {
          subConditions: [
            {
              logicalOperator: "",
              questionType: "",
              operatorType: "",
              conditionType: "",
              value: "",
              id: "",
            },
          ],
          elseQuestionId: "",
          returnQuestionId: "",
        },
      ],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = methods;

  const {
    fields: conditions,
    append: appendCondition,
    remove: removeCondition,
    update: updateCondition,
  } = useFieldArray({
    control,
    name: "conditions",
  });

  const watchedValues = useWatch({ control });

  const getQuestion = (type: string, values: any) => {
    console.log(type);
    switch (type?.split("*")[0]) {
      //test
      case "MULTIPLE_CHOICE":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "OPTION", label: "گزینه" },
          { value: "QUESTION", label: "سوال " },
          { value: "CALCULATION", label: "محاسبه‌گر" },
        ];
      //test
      case "MULTIPLE_CHOICE_MULTI_SELECT":
        return [{ value: "OPTION", label: "گزینه" }];
      //test
      case "TEXT_FIELD":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "TEXT", label: "متن" },
        ];

      //test
      case "SPECTRAL":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "QUESTION", label: "سوال " },
          { value: "CALCULATION", label: "محاسبه‌گر" },
        ];
      //test
      case "SPECTRAL_DOMAIN":
        return [{ value: "VALUE", label: "ارزش" }];
      //test
        case "TEXT_FIELD_DATE":
          return [
            { value: "QUESTION", label: "سوال" },
            { value: "DATE", label: "تاریخ" },
          ];
        //test
        case "TEXT_FIELD_NUMBER":
          return [
            { value: "VALUE", label: "ارزش" },
            { value: "QUESTION", label: "سوال " },
            { value: "CALCULATION", label: "محاسبه‌گر" },
          ];

      case "CALCULATION":
        return [
          { value: "VALUE", label: "ارزش" },
          { value: "QUESTION", label: "سوال " },
          { value: "CALCULATION", label: "محاسبه‌گر" },
        ];


      default:
        return [];
    }
  };

  const getCondition = (type: string, operator: string, values: any) => {
    const combinedKey = `${type?.split("*")[0]}_${operator}`;
    switch (combinedKey) {
      //test
      case "MULTIPLE_CHOICE_VALUE":
      case "MULTIPLE_CHOICE_OPTION":
      case "MULTIPLE_CHOICE_QUESTION":
      case "MULTIPLE_CHOICE_CALCULATION":
        return [
          { value: "#equalMultiChoiceSingle", label: "برابر با" },
          { value: "!#equalMultiChoiceSingle", label: "نابرابر با" },
          { value: "!#lessThanMultiChoiceSingle", label: "بزرگتر از" },
          { value: "#lessThanMultiChoiceSingle", label: "کوچکتر از" },
        ];

      //test
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION":
        return [
          { value: "#containMultiChoiceMulti", label: "شامل شدن" },
          { value: "!#containMultiChoiceMulti", label: "شامل نشدن" },
          { value: "#equalThanMultiChoiceMulti", label: "برابر با" },
          { value: "!#equalThanMultiChoiceMulti", label: "نابرابر با" },
        ];
      //test
      case "TEXT_FIELD_TEXT":
      case "TEXT_FIELD_VALUE":
        return [
          { value: "#startWithText", label: "شروع شدن با " },
          { value: "#endWithText", label: "پایان یافتن با" },
          { value: "#containAnyText", label: "شامل شدن" },
          { value: "!#containAnyText", label: "شامل نشدن" },
          { value: "#lenEqualText", label: "طول متن برابر با" },
          { value: "#lenGraterThanText", label: "طول متن بیشتر از" },
          { value: "!#lenGraterThanText", label: "طول متن کمتر از" },
        ];
      //test
      case "SPECTRAL_VALUE":
      case "SPECTRAL_QUESTION":
      case "SPECTRAL_CALCULATION":
        return [
          { value: "#greaterThanSpectral", label: "بزرگتر از" },
          { value: "#greaterThanSpectral", label: "کوچکتر  از" },
          { value: "#equalThanSpectralSingle", label: "برابر  با" },
          { value: "#greaterEqualThanSpectralSingle", label: "بزرگتر مساوی" },
          { value: "!#greaterEqualThanSpectralSingle", label: " کوچکتر مساوی" },
        ];

      //test
      case "SPECTRAL_DOMAIN_VALUE":
        return [
          { value: "#lessThanSpectralDouble", label: "کوچکتر  از" },
          { value: "#greaterThanSpectralDouble", label: "بزرگتر از" },
        ];

            //test
      case "TEXT_FIELD_DATE_DATE":
      case "TEXT_FIELD_DATE_QUESTION":
        return [
          { value: "#afterDate", label: "بعد از" },
          { value: "#beforeDate", label: "قبل از" },
        ];

    // test
      case "TEXT_FIELD_NUMBER_VALUE":
      case "TEXT_FIELD_NUMBER_QUESTION":
      case "TEXT_FIELD_NUMBER_CALCULATION":
        return [
          { value: "#greaterThanNumber", label: "بزرگتر از" },
          { value: "!#greaterThanNumber", label: "کوچکتر  از" },
          // { value: "#equalThanNumber", label: "برابر  با" },
          { value: "#greaterEqualThanNumber", label: "بزرگتر مساوی" },
          { value: "!#greaterEqualThanNumber", label: " کوچکتر مساوی" },
        ];

      case "CALCULATION_VALUE":
      case "CALCULATION_QUESTION":
      case "CALCULATION_CALCULATION":
        return [
          { value: "#greaterThanNumber", label: "بزرگتر از" },
          { value: "!#greaterThanNumber", label: "کوچکتر از" },
          { value: "#greaterEqualThanNumber", label: "بزرگتر مساوی" },
          { value: "!#greaterEqualThanNumber", label: " کوچکتر مساوی" },
          { value: "#equalThanNumber", label: "برابر  با" },
          { value: "!#equalThanNumber", label: "نابرابر با" },
        ];

      case "MULTIPLE_CHOICE":
        return [
          { value: "selected", label: "انتخاب شده" },
          { value: "not_selected", label: "انتخاب نشده" },
        ];
      default:
        return [];
    }
  };

  const getInput = (
    type: string,
    operator: string,
    condition: string,
    field: any
  ) => {
    const combinedKey = `${type?.split("*")[0]}_${operator}_${condition}`;
    switch (combinedKey) {
      // test
      case "MULTIPLE_CHOICE_VALUE_#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_VALUE_!#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_VALUE_#lessThanMultiChoiceSingle":
      case "MULTIPLE_CHOICE_VALUE_!#lessThanMultiChoiceSingle":
        return <CustomTextField name={field.name} type="number" />;

      // test
      case "MULTIPLE_CHOICE_QUESTION_#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_QUESTION_!#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_QUESTION_#lessThanMultiChoiceSingle":
      case "MULTIPLE_CHOICE_QUESTION_!#lessThanMultiChoiceSingle":
        return (
          <CustomSelectController
            name={field.name}
            options={onlySomeQuestionsOptions}
            isLoading={isFetchingOnlyAllQuestions}
            sx={{ minWidth: 200 }}
          />
        );

      // test
      case "MULTIPLE_CHOICE_CALCULATION_#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_CALCULATION_!#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_CALCULATION_#lessThanMultiChoiceSingle":
      case "MULTIPLE_CHOICE_CALCULATION_!#lessThanMultiChoiceSingle":
        return (
          <CustomSelectController
            name={field.name}
            options={onlyAllCalculationOptions}
            isLoading={isFetchingOnlyAllCalculation}
            sx={{ minWidth: 200 }}
          />
        );

      // test
      case "MULTIPLE_CHOICE_OPTION_#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_OPTION_!#equalMultiChoiceSingle":
      case "MULTIPLE_CHOICE_OPTION_#lessThanMultiChoiceSingle":
      case "MULTIPLE_CHOICE_OPTION_!#lessThanMultiChoiceSingle":
        return onlyAllQuestions?.map((item) => {
          if (item?.extMap?.UNIC_NAME === type.split("*")[1]) {
            const options = item?.extMap?.OPTIONS;

            const optionsList = [];
            Object.keys(options).forEach((key) => {
              optionsList.push({
                value: key,
                label: options[key][1],
              });
            });
            return (
              <CustomSelectController
                name={field.name}
                options={optionsList}
                sx={{ minWidth: 200 }}
              />
            );
          }
        });

      // test
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_#containMultiChoiceMulti":
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_!#containMultiChoiceMulti":
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_!#equalThanMultiChoiceMulti":
      case "MULTIPLE_CHOICE_MULTI_SELECT_OPTION_#equalThanMultiChoiceMulti":
        return onlyAllQuestions?.map((item) => {
          if (item?.extMap?.UNIC_NAME === type.split("*")[1]) {
            const options = item?.extMap?.OPTIONS;

            const optionsList = [];
            Object.keys(options).forEach((key) => {
              optionsList.push({
                value: key,
                label: options[key][1],
              });
            });
            return (
              <MultiSelectController
                name={field.name}
                options={optionsList}
                // chip
                // checkbox
                sx={{ maxWidth: 200, maxHeight: 50 }}
              />
            );
          }
        });

      // test
      case "TEXT_FIELD_TEXT_#startWithText":
      case "TEXT_FIELD_TEXT_#endWithText":
        return <CustomTextField name={field.name} type="string" />;
      // test
      case "TEXT_FIELD_TEXT_#containAnyText":
      case "TEXT_FIELD_TEXT_!#containAnyText":
        return <CustomTextField name={field.name} type="string" />;
      // test
      case "TEXT_FIELD_VALUE_#lenEqualText":
      case "TEXT_FIELD_VALUE_#lenGraterThanText":
      case "TEXT_FIELD_VALUE_!#lenGraterThanText":
        return <CustomTextField name={field.name} type="number" />;

      //test
      case "SPECTRAL_VALUE_#greaterThanSpectral":
      case "SPECTRAL_VALUE_!#greaterThanSpectral":
      case "SPECTRAL_VALUE_#equalThanSpectralSingle":
      case "SPECTRAL_VALUE_#greaterEqualThanSpectralSingle":
      case "SPECTRAL_VALUE_!#greaterEqualThanSpectralSingle":
        return <CustomTextField name={field.name} type="number" />;

      //test
      case "SPECTRAL_QUESTION_#greaterThanSpectral":
      case "SPECTRAL_QUESTION_!#greaterThanSpectral":
      case "SPECTRAL_QUESTION_#equalThanSpectralSingle":
      case "SPECTRAL_QUESTION_#greaterEqualThanSpectralSingle":
      case "SPECTRAL_QUESTION_!#greaterEqualThanSpectralSingle":
        return (
          <CustomSelectController
            name={field.name}
            options={onlySomeQuestionsOptions}
            isLoading={isFetchingOnlyAllQuestions}
            sx={{ minWidth: 200 }}
          />
        );

      //test
      case "SPECTRAL_CALCULATION_#greaterThanSpectral":
      case "SPECTRAL_CALCULATION_!#greaterThanSpectral":
      case "SPECTRAL_CALCULATION_#equalThanSpectralSingle":
      case "SPECTRAL_CALCULATION_#greaterEqualThanSpectralSingle":
      case "SPECTRAL_CALCULATION_!#greaterEqualThanSpectralSingle":
        return (
          <CustomSelectController
            name={field.name}
            options={onlyAllCalculationOptions}
            isLoading={isFetchingOnlyAllCalculation}
            sx={{ minWidth: 200 }}
          />
        );

      //test
      case "SPECTRAL_DOMAIN_VALUE_#lessThanSpectralDouble":
      case "SPECTRAL_DOMAIN_VALUE_#greaterThanSpectralDouble":
        return <CustomTextField name={field.name} type="number" />;
   //test
      case "TEXT_FIELD_DATE_DATE_#beforeDate":
      case "TEXT_FIELD_DATE_DATE_#afterDate":
            return (   <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
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
                <DatePickerCustome
                  min={new Date().setDate(new Date().getDate() - 1)}
                  value={value ? value : new Date()} 
                  onChange={(date) => {
                      setValue(field.name, date);
                  }}
                />
              </Box>
            )}
          />
        );
    // test but need to change the list
      case "TEXT_FIELD_DATE_QUESTION_#beforeDate":
      case "TEXT_FIELD_DATE_QUESTION_#afterDate":
        return (
          <CustomSelectController
            name={field.name}
            options={onlySomeQuestionsOptions}
            isLoading={isFetchingOnlyAllQuestions}
            sx={{ minWidth: 200 }}
          />
        );

        // case "TEXT_FIELD_NUMBER_VALUE":
        //   case "TEXT_FIELD_NUMBER_QUESTION":
        //   case "TEXT_FIELD_NUMBER_CALCULATION":
        //     return [
        //       { value: "#greaterThanNumber", label: "بزرگتر از" },
        //       { value: "!#greaterThanNumber", label: "کوچکتر  از" },
        //       // { value: "#equalThanNumber", label: "برابر  با" },
        //       { value: "#greaterEqualThanNumber", label: "بزرگتر مساوی" },
        //       { value: "!#greaterEqualThanNumber", label: " کوچکتر مساوی" },
        //     ];

          // test
      case "TEXT_FIELD_NUMBER_VALUE_#greaterThanNumber":
      case "TEXT_FIELD_NUMBER_VALUE_!#greaterThanNumber":
      case "TEXT_FIELD_NUMBER_VALUE_#greaterEqualThanNumber":
      case "TEXT_FIELD_NUMBER_VALUE_!#greaterEqualThanNumber":
          return <CustomTextField name={field.name} type="number" />;

          // test
      case "TEXT_FIELD_NUMBER_VALUE_#greaterThanNumber":
      case "TEXT_FIELD_NUMBER_VALUE_!#greaterThanNumber":
      case "TEXT_FIELD_NUMBER_VALUE_#greaterEqualThanNumber":
      case "TEXT_FIELD_NUMBER_VALUE_!#greaterEqualThanNumber":
              return (
          <CustomSelectController
            name={field.name}
            options={onlySomeQuestionsOptions}
            isLoading={isFetchingOnlyAllQuestions}
            sx={{ minWidth: 200 }}
          />
        );

      case "CALCULATION_VALUE_#equalThanNumber":
      case "CALCULATION_VALUE_!#equalThanNumber":
      case "CALCULATION_VALUE_#greaterThanNumber":
      case "CALCULATION_VALUE_!#greaterThanNumber":
      case "CALCULATION_VALUE_#greaterEqualThanNumber":
      case "CALCULATION_VALUE_!#greaterEqualThanNumber":
        return <CustomTextField name={field.name} label="" type="number" />;

      case "CALCULATION_QUESTION_#equalThanNumber":
      case "CALCULATION_QUESTION_!#equalThanNumber":
      case "CALCULATION_QUESTION_#greaterThanNumber":
      case "CALCULATION_QUESTION_!#greaterThanNumber":
      case "CALCULATION_QUESTION_#greaterEqualThanNumber":
      case "CALCULATION_QUESTION_!#greaterEqualThanNumber":
        return (
          <CustomSelectController
            name={field.name}
            options={qacWithOutFilterOptions}
            sx={{ minWidth: 200 }}
          />
        );

      case "CALCULATION_CALCULATION_#equalThanNumber":
      case "CALCULATION_CALCULATION_!#equalThanNumber":
      case "CALCULATION_CALCULATION_#greaterThanNumber":
      case "CALCULATION_CALCULATION_!#greaterThanNumber":
      case "CALCULATION_CALCULATION_#greaterEqualThanNumber":
      case "CALCULATION_CALCULATION_!#greaterEqualThanNumber":
        return (
          <CustomSelectController
            name={field.name}
            options={calculationTypes}
            sx={{ minWidth: 200 }}
          />
        );

      default:
        return <CustomTextField name={field.name} label="" disabled />;
    }
  };

  const onSubmit = (input: FormData) => {
    console.log("Submitted data:", input);

    const transformInputToOutput = (input) => {
      return input.conditions.map((condition) => {
        const { subConditions, returnQuestionId, elseQuestionId } = condition;

        const conditionFormula = subConditions
          .map((subCondition) => {
            const {
              conditionType,
              questionType,
              operatorType,
              value,
              logicalOperator,
            } = subCondition;
            console.log(
              "val  formatContainText(value)45645",
              formatContainText(value)
            );

            let formattedValue: string;

            if (operatorType === "OPTION") {
              formattedValue = `{${value}}`;
            } else if (operatorType === "VALUE") {
              formattedValue = `{#v_${value}}`;
            } else if (operatorType === "TEXT") {
              if (
                conditionType === "#startWithText" ||
                conditionType === "#endWithText"
              ) {
                formattedValue = `{"${value}"}`;
              } else if (
                conditionType === "!#containAnyText" ||
                conditionType === "#containAnyText"
              ) {
                formattedValue = `{${formatContainText(value)}}`;
              } else if (
                conditionType === "#lenEqualText" ||
                conditionType === "#lenGraterThanText" ||
                conditionType === "!#lenGraterThanText"
              ) {
                formattedValue = `{#v_${value}}`;
              } else {
                formattedValue = value;
              }
            }  else if (operatorType === "DATE") {
              formattedValue = `{#v_"${value}"}`;
            } else {
              formattedValue = value;
            }

            const baseCondition = `${conditionType}(${
              questionType.split("*")[1]
            },${formattedValue})`;

            return logicalOperator
              ? ` ${logicalOperator} ${baseCondition}`
              : baseCondition;
          })
          .join("");

        return {
          conditionFormula: conditionFormula,
          formBuilderId: 81,
          returnQuestionId: condition.returnQuestionId,
          elseQuestionId: condition.elseQuestionId,
        };
      });
    };

    const output = transformInputToOutput(input);
    console.log(output[0].conditionFormula);
  };

  const handleAddCondition = () => {
    appendCondition({
      subConditions: [
        {
          logicalOperator: "",
          questionType: "",
          operatorType: "",
          conditionType: "",
          value: "",
          id: "",
        },
      ],
      elseQuestionId: "",
      returnQuestionId: "",
    });
  };

  const handleRemoveCondition = (index: number) => {
    removeCondition(index);
  };

  const handleAddSubCondition = (
    conditionIndex: number,
    subConditionIndex: number
  ) => {
    const updatedConditions = [...conditions];
    const newSubCondition = {
      logicalOperator: subConditionIndex === 0 ? "" : "&&",
      questionType: "",
      operatorType: "",
      conditionType: "",
      value: "",
      id: "",
    };
    updatedConditions[conditionIndex].subConditions.splice(
      subConditionIndex + 1,
      0,
      newSubCondition
    );
    updateCondition(conditionIndex, updatedConditions[conditionIndex]);
  };

  const handleRemoveSubCondition = (
    conditionIndex: number,
    subConditionIndex: number
  ) => {
    const updatedCondition = { ...conditions[conditionIndex] };
    updatedCondition.subConditions.splice(subConditionIndex, 1);
    updateCondition(conditionIndex, updatedCondition);
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        direction: "ltr",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          justifyContent: "center",
          color: "#404040",
          fontWeight: 700,
        }}
      >
        شرط
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {conditions.map((condition, index) => (
            <Box key={uuidv4()} sx={{ mb: 2, width: "100%" }}>
              {condition.subConditions.map((subCondition, subIndex) => {
                const currentValues =
                  watchedValues?.conditions?.[index]?.subConditions?.[
                    subIndex
                  ] || {};
                return (
                  <Box
                    key={uuidv4()}
                    sx={{
                      mb: 2,
                      ml: { md: 4 },
                      mt: 2,
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "start" }}>
                      {subIndex === 0 && (
                        <Typography
                          sx={{
                            color: "#393939",
                            fontSize: "14px",
                            width: 90,
                            pt: 2,
                            // justifyContent: "start",
                            // alignItems: "start"
                          }}
                        >
                          اگر
                        </Typography>
                      )}
                      {subIndex > 0 && (
                        <CustomSelectController
                          name={`conditions.${index}.subConditions.${subIndex}.logicalOperator`}
                          options={[
                            { value: "&&", label: "و" },
                            { value: "||", label: "یا" },
                          ]}
                          sx={{ minWidth: 78 }}
                        />
                      )}
                    </Box>

                    <Box
                      rowGap={3}
                      columnGap={2}
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        flexWrap: "wrap",
                        gap: 2,
                        // alignItems: 'center',
                        width: "100%",
                      }}
                    >
                      <CustomSelectController
                        name={`conditions.${index}.subConditions.${subIndex}.questionType`}
                        options={qacWithOutFilterOptions}
                        isLoading={isFetchingQacWithOutFilter}
                        sx={{
                          width: { sm: "100%", md: "100%" },
                          minWidth: 200,
                          flexShrink: 0,
                        }}
                      />
                      <CustomSelectController
                        name={`conditions.${index}.subConditions.${subIndex}.operatorType`}
                        options={getQuestion(
                          currentValues.questionType,
                          currentValues
                        )}
                        sx={{
                          width: { sm: "100%", md: "22%" },
                          minWidth: 200,
                          flexShrink: 0,
                        }}
                        disabled={!Boolean(currentValues.questionType)}
                      />
                      <CustomSelectController
                        name={`conditions.${index}.subConditions.${subIndex}.conditionType`}
                        options={getCondition(
                          currentValues.questionType,
                          currentValues.operatorType,
                          currentValues
                        )}
                        sx={{
                          width: { sm: "100%", md: "22%" },
                          minWidth: 200,
                          flexShrink: 0,
                        }}
                        disabled={!Boolean(currentValues.operatorType)}
                      />
                      {getInput(
                        currentValues.questionType,
                        currentValues.operatorType,
                        currentValues.conditionType,
                        {
                          name: `conditions.${index}.subConditions.${subIndex}.value`,
                        }
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 1,
                          ml: { md: 1 },
                          width: { sm: "100%", md: "auto" },
                          justifyContent: { xs: "flex-start", md: "center" },
                        }}
                      >
                        <IconButton
                          onClick={() => handleAddSubCondition(index, subIndex)}
                          sx={{
                            width: "52px",
                            height: "52px",
                            bgcolor: "#1758BA0D",
                            borderRadius: "10px",
                            border: "1px solid #1758BA",
                          }}
                        >
                          <Image
                            src={PlusIcon || "/placeholder.svg"}
                            alt=""
                            width={22}
                            height={22}
                          />
                        </IconButton>
                        {subIndex !== 0 && (
                          <IconButton
                            onClick={() =>
                              handleRemoveSubCondition(index, subIndex)
                            }
                            sx={{
                              width: "52px",
                              height: "52px",
                              bgcolor: "#FA4D560D",
                              borderRadius: "10px",
                              border: "1px solid #FA4D56",
                              "&: hover": {
                                bgcolor: "#FA4D560D",
                              },
                            }}
                          >
                            <Image
                              src={TrashIcon || "/placeholder.svg"}
                              alt=""
                              width={24}
                              height={24}
                            />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                  </Box>
                );
              })}
              <Box
                sx={{
                  mt: 2,
                  ml: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={{ color: "#393939", fontSize: "14px" }}>
                  :برو به
                </Typography>

                <CustomSelectController
                  name={`conditions.${index}.returnQuestionId`}
                  options={onlyAllQuestionsOptions}
                  isLoading={isFetchingOnlyAllQuestions}
                  sx={{ minWidth: 200, ml: 5 }}
                />
                <Typography
                  sx={{ color: "#393939", fontSize: "14px", mr: 9.5 }}
                >
                  در غیر اینصورت برو به:
                </Typography>

                <CustomSelectController
                  name={`conditions.${index}.elseQuestionId`}
                  options={onlyAllQuestionsOptions}
                  isLoading={isFetchingOnlyAllQuestions}
                  sx={{ minWidth: 410 }}
                />

                <IconButton
                  onClick={() => handleRemoveCondition(index)}
                  sx={{
                    width: 113,
                    height: "52px",
                    bgcolor: "#FA4D560D",
                    borderRadius: "8px",
                    border: "1px solid #FA4D56",
                    "&: hover": {
                      bgcolor: "#FA4D560D",
                    },
                  }}
                >
                  <Typography sx={{ color: "#FA4D56", fontSize: "14px" }}>
                    حذف این شرط
                  </Typography>
                </IconButton>
              </Box>
              <CircleDivider />
            </Box>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddCondition}
            sx={{
              maxWidth: 155,
              ml: 10,
              bgcolor: "#1758BA",
              borderRadius: "8px",
              height: 52,
              color: "white",
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
              type="submit"
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
        </form>
      </FormProvider>
    </Box>
  );
}
