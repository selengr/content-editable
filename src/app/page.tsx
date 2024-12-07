// "use client"

import AdvancedFormulaEditor from "@/components/AdvancedFormulaEditor";

// import Image from 'next/image';
// import React, { useCallback, useEffect, useRef, useState } from "react";


// // mui
// import Grid from '@mui/material/Grid2';
// import { LoadingButton } from "@mui/lab";
// import { Box, Button, Container, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

// // sections
// import CalculatorClear from "@/sections/calculator/calculator-clear";
// import styles from '@/sections/calculator/advancedFormulaEditor.module.css'
// import CalculatorParenthesis from "@/sections/calculator/calculator-parenthesis";


// import JSONData from '../../public/assets/fake-data/response_v1.json'


// interface Element {
//   type: "OPERATOR" | "NUMBER" | "NEW_FIELD" | "PARENTHESIS" | "AVG_PARENTHESIS" | "NEW_FnFx";
//   content: string;
//   id?: string;
// }


// const Page = () => {
//   const [formula, setFormula] = useState<string>("")
//   const [cursorIndex, setCursorIndex] = useState(0);
//   const [elements, setElements] = useState<Element[]>([]);
//   const [isClient, setIsClient] = useState(false)

//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   const contentEditable = useRef<HTMLDivElement>(null);
//   const selectAvgRef = useRef<{ [key: string]: string }>({})
//   const selectFieldRef = useRef<{ [key: string]: string }>({})

//   const handleUndo = useCallback(() => {
//     if (elements.length === 0 || cursorIndex === 0) return;

//     const newElements = [...elements];
//     newElements.splice(cursorIndex - 1, 1);
//     const newCursorIndex = Math.max(0, cursorIndex - 1);

//     updateElements(newElements, newCursorIndex);
//   }, [elements, cursorIndex]);


//   const updateElements = (newElements: Element[], newCursorIndex?: number) => {
//     setElements(newElements);
//     setCursorIndex(newCursorIndex);
//     setTimeout(() => {
//       const editableDiv = contentEditable.current;
//       if (editableDiv) {
//         const range = document.createRange();
//         const sel = window.getSelection();

//         if (newCursorIndex >= editableDiv.childNodes.length) {
//           range.setStartAfter(editableDiv.lastChild || editableDiv);
//         } else {
//           range.setStartAfter(editableDiv.childNodes[newCursorIndex - 1] || editableDiv);
//         }

//         range.collapse(true);
//         sel?.removeAllRanges();
//         sel?.addRange(range);
//         editableDiv.focus();
//       }
//     }, 0);
//   };


//   const handleOperator = (content: string) => {
//     const newElements = [...elements];
//     const operatorTypes = ['-', '+', '*', '/'];
//     let newCursorIndex = cursorIndex;

//     if (cursorIndex > 0 && newElements[cursorIndex - 1].type === 'OPERATOR' && operatorTypes.includes(newElements[cursorIndex - 1].content)) {
//       newElements[cursorIndex - 1] = { type: 'OPERATOR', content };
//     } else {
//       newElements.splice(cursorIndex, 0, { type: 'OPERATOR', content });
//       newCursorIndex++;
//     }

//     updateElements(newElements, newCursorIndex);
//   };


//   const handleNumber = (content: string) => {
//     const newElements: Element[] = [...elements];
//     let newCursorIndex = cursorIndex;

//     if (cursorIndex > 0 && newElements[cursorIndex - 1].type === 'NUMBER') {
//       newElements[cursorIndex - 1].content += content;
//     } else {
//       newElements.splice(cursorIndex, 0, { type: 'NUMBER', content });
//       newCursorIndex++;
//     }

//     updateElements(newElements, newCursorIndex);
//   };



//   const handleParenthesis = (content: string) => {
//     const newElements = [...elements];
//     let newCursorIndex = cursorIndex;
//     if (content === '(') {
//       newElements.splice(cursorIndex, 0,
//         { type: 'PARENTHESIS', content: '(' });
//       newElements.splice(cursorIndex + 1, 0,
//         { type: 'PARENTHESIS', content: ')' }
//       );
//       newCursorIndex++;
//     } else if (content === ')') {
//       newElements.splice(cursorIndex, 0,
//         { type: 'PARENTHESIS', content: ')' }
//       );
//       newCursorIndex++;
//     }
//     updateElements(newElements, newCursorIndex);
//   };

//   useEffect(() => {
//     let a = "#q_1+#q_21+{calc_2}+#q_1+#q_21+{calc_2}-#avg({#q_1,#q_21,5,8})"
//   }, [])

//   function htmlToFormula(): string {
//     let formula = ''

//     const elementHandlers = {
//       NUMBER: (content: string) => {
//         return "{#v_" + content + "}"
//       },
//       OPERATOR: (content: string) => content,
//       PARENTHESIS: (content: string) => content,
//       AVG_PARENTHESIS: (content: string) => {
//         return content === "(" ? `${content}{` : `}${content}`;
//       },
//       NEW_FIELD: (content: string, id: string) => {
//         const isCalc = selectFieldRef.current[id]?.startsWith("calc")
//         // const prefix = isCalc ? '{' : '#';
//         // const suffix = isCalc ? '}' : '';
//         return `${selectFieldRef.current[id]}`;
//       },
//       NEW_FnFx: (content: string, id: string) => {
//         return selectAvgRef.current[id] || '';
//       }
//     };



//     for (const element of elements) {
//       if (!element) continue;

//       const { type, content, id } = element;
//       const handler = elementHandlers[type];

//       if (handler) {
//         formula += handler(content, id);
//       }
//     }


//     console.clear()
//     console.log("html-to-formula ===>", formula)
//     return formula
//   }


//   const handleDropdownClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     const optionsContainer = (e.target as HTMLElement).nextElementSibling as HTMLElement;
//     const isHidden = optionsContainer.style.display === 'none';
//     optionsContainer.style.display = isHidden ? 'block' : 'none';
//     (e.target as HTMLElement).setAttribute('data-type', isHidden ? 'up' : 'down');
//   };

//   const handleOptionClick = (item: any, id: string) => {
//     const newElements = elements.map(elem =>
//       elem.id === id ? { ...elem, content: item.caption } : elem
//     );
//     setElements(newElements);
//     selectFieldRef.current[id] = item.extMap.UNIC_NAME;

//     const optionsContainer = document.querySelector(`[data-id="${id}"] .${styles.optionsContainer}`) as HTMLElement;
//     if (optionsContainer) {
//       optionsContainer.style.display = 'none';
//     }

//     const dropdownButton = document.querySelector(`[data-id="${id}"] .${styles.customDropdown}`) as HTMLElement;
//     if (dropdownButton) {
//       dropdownButton.setAttribute('data-type', 'down');
//     }
//   };


//   const handleNewField = () => {
//     const editableDiv = contentEditable.current;
//     if (!editableDiv) return;

//     const selectId = `select_${Date.now()}`;
//     const newElement: Element = {
//       type: 'NEW_FIELD',
//       content: 'انتخاب سوال',
//       id: selectId
//     };

//     const newElements = [...elements];
//     newElements.splice(cursorIndex, 0, newElement);

//     setElements(newElements);

//     setTimeout(() => {
//       const range = document.createRange();
//       const sel = window.getSelection();

//       if (editableDiv.childNodes[cursorIndex]) {
//         range.setStartAfter(editableDiv.childNodes[cursorIndex]);
//       } else {
//         range.setStartAfter(editableDiv.lastChild || editableDiv);
//       }

//       range.collapse(true);
//       sel?.removeAllRanges();
//       sel?.addRange(range);

//       setCursorIndex(cursorIndex + 1);
//       editableDiv.focus();
//     }, 0);
//   };

//   const renderElements = useCallback(() => {
//     return elements.map((elem, index) => {
//       if (elem.type === 'NEW_FIELD') {
//         return (
//           <div
//             key={elem.id}
//             data-id={elem.id}
//             contentEditable={false}
//             className={`${styles.dynamicbtn} ${styles.NEW_FIELD}`}
//             data-type="NEW_FIELD"
//           >
//             <div
//               className={styles.customDropdown}
//               data-type="down"
//               onClick={(e) => handleDropdownClick(e, elem.id!)}
//             >
//               {elem.content}
//             </div>
//             <div className={styles.optionsContainer} style={{ display: 'none' }}>
//               {JSONData.dataList.map((item: any) => (
//                 <div
//                   key={item.extMap.UNIC_NAME}
//                   className={styles.option}
//                   onClick={() => handleOptionClick(item, elem.id!)}
//                 >
//                   {item.caption}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       } else if (elem.type === 'NEW_FnFx') {
//         return (
//           <div
//             key={elem.id}
//             data-id={elem.id}
//             contentEditable={false}
//             className={`${styles.dynamicbtn} ${styles.NEW_FnFx}`}
//             data-type="NEW_FnFx"
//           >
//             <div
//               className={styles.customDropdown}
//               data-type="down"
//               onClick={(e) => handleFnFXDropdownClick(e, elem.id!)}
//             >
//               {elem.content}
//             </div>
//             <div className={styles.optionsContainer} style={{ display: 'none' }}>
//               {[{ fnValue: "avg", fnCaption: "میانگین()" }].map((item) => (
//                 <div
//                   key={item.fnValue}
//                   className={styles.option}
//                   onClick={() => handleFnFXOptionClick(item, elem.id!)}
//                 >
//                   {item.fnCaption}
//                 </div>
//               ))}
//             </div>
//           </div>
//         );
//       } else {
//         return (
//           <div
//             key={index}
//             contentEditable={false}
//             className={`${styles.dynamicbtn} ${styles[elem.type]}`}
//             data-type={elem.type}
//           >
//             {elem.content}
//           </div>
//         );
//       }
//     });
//   }, [elements, styles]);


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (!target.closest(`.${styles.NEW_FIELD}`) && !target.closest(`.${styles.NEW_FnFx}`)) {
//         const allOptionContainers = document.querySelectorAll(`.${styles.optionsContainer}`);
//         allOptionContainers.forEach((container: any) => {
//           (container as HTMLElement).style.display = 'none';
//         });
//         const allDropdowns = document.querySelectorAll(`.${styles.customDropdown}`);
//         allDropdowns.forEach((dropdown: any) => {
//           dropdown.setAttribute('data-type', 'down');
//         });
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [styles]);


//   const handleFnFXDropdownClick = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     const optionsContainer = (e.target as HTMLElement).nextElementSibling as HTMLElement;
//     const isHidden = optionsContainer.style.display === 'none';
//     optionsContainer.style.display = isHidden ? 'block' : 'none';
//     (e.target as HTMLElement).setAttribute('data-type', isHidden ? 'up' : 'down');
//   };



//   const handleFnFXOptionClick = (item: { fnValue: string, fnCaption: string }, id: string) => {
//     const newElements = elements.map(elem =>
//       elem.id === id ? { ...elem, content: item.fnCaption } : elem
//     );
//     setElements(newElements);
//     selectAvgRef.current[id] = item.fnValue;

//     const optionsContainer = document.querySelector(`[data-id="${id}"] .${styles.optionsContainer}`) as HTMLElement;
//     if (optionsContainer) {
//       optionsContainer.style.display = 'none';
//     }

//     const dropdownButton = document.querySelector(`[data-id="${id}"] .${styles.customDropdown}`) as HTMLElement;
//     if (dropdownButton) {
//       dropdownButton.setAttribute('data-type', 'down');
//     }
//   };



//   const handleFnFX = () => {
//     const editableDiv = contentEditable.current;
//     if (!editableDiv) return;

//     const selectId = `select_${Date.now()}`;
//     const newElement: Element = {
//       type: 'NEW_FnFx',
//       content: 'میانگین()',
//       id: selectId,
//     };

//     const newElements = [...elements];
//     newElements.splice(cursorIndex, 0, newElement);
//     newElements.splice(cursorIndex + 1, 0, { type: 'AVG_PARENTHESIS', content: '(' });
//     newElements.splice(cursorIndex + 2, 0, { type: 'AVG_PARENTHESIS', content: ')' });

//     setElements(newElements);
//     selectAvgRef.current[selectId] = '#avgNumber';

//     setTimeout(() => {
//       const range = document.createRange();
//       const sel = window.getSelection();

//       if (editableDiv.childNodes[cursorIndex + 1]) {
//         range.setStartAfter(editableDiv.childNodes[cursorIndex + 1]);
//       } else {
//         range.setStartAfter(editableDiv.lastChild || editableDiv);
//       }

//       range.collapse(true);
//       sel?.removeAllRanges();
//       sel?.addRange(range);

//       setCursorIndex(cursorIndex + 2);
//       editableDiv.focus();
//     }, 0);
//   };



//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (!/^[0-9+\-*/().()]$/.test(event.key) &&
//       !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
//       event.preventDefault();
//     }
//     if (event.key === "Enter") {
//       event.preventDefault();
//     }
//   };


//   const handleClick = (e: React.MouseEvent) => {
//     const editableDiv = contentEditable.current;
//     if (editableDiv) {
//       const range = document.caretRangeFromPoint(e.clientX, e.clientY);
//       if (range) {
//         const index = Array.from(editableDiv.childNodes).findIndex((node, index) => index === range.endOffset);
//         // const index = Array.from(editableDiv.childNodes).findIndex((node) => node.contains(range.startContainer) || node === range.startContainer);
//         setCursorIndex(index === -1 ? elements.length : index);
//       }
//     }
//   };


//   const renderKeypad = () => {
//     const operators = ['+', '-', '*', '/'];
//     const numbers = ['0', '.', '7', '8', '9', '4', '5', '6', '1', '2', '3'];

//     return (
//       <>
//         <Box sx={{ width: { xs: "100%", sm: "30%" }, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", mt: 3 }} gap={"3px"}>


//           <Select
//             sx={{
//               '& .MuiSelect-select': {
//                 padding: 1,
//               },
//               width: 145,
//               height: 33,
//               fontWeight: 500,
//               marginBottom: "2px",
//               backgroundColor: "#9D2CDF1A",
//               borderRadius: '8px',
//               color: "#9D2CDF",
//               borderColor: "none",
//               '&:before, &:after': {
//                 border: 'none',
//               },
//               '& .MuiOutlinedInput-notchedOutline': {
//                 border: 'none',
//               },
//               '& .MuiSvgIcon-root': {
//                 color: "#9D2CDF",
//               },
//             }}
//             displayEmpty
//             defaultValue=""
//             renderValue={(value: any) => {

//               return (
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Image
//                     alt="file preview"
//                     src={"/assets/icons/svg/ic_fx.svg"}
//                     height={30}
//                     width={30}
//                   />
//                   {value}
//                 </Box>
//               );
//             }}
//             MenuProps={{
//               PaperProps: {
//                 sx: { px: 1, maxHeight: 280, minHeight: 180, mt: "3px" },
//               },
//             }}
//             onClick={(e: any) => {
//               if (e.target.tagName === "LI") {
//                 handleFnFX()
//               } else {
//                 e.preventDefault()
//               }
//             }}
//             onOpen={() => {
//               const editableDiv = contentEditable.current;
//               editableDiv.focus();
//             }}
//           >

//             {["میانگین  ()"].map((option: any) => {

//               return (
//                 <MenuItem
//                   key={option}
//                   value={option}
//                   sx={{
//                     py: 1,
//                     px: 2,
//                     height: 33,
//                     borderRadius: 1.75,
//                     typography: 'body2',
//                     backgroundColor: "#9D2CDF !important",
//                     color: "white",
//                     margin: "5px",
//                     // ...(selected && {
//                     //     fontWeight: 'fontWeightMedium',
//                     // }),
//                     // ...(checkbox && {
//                     //     p: 0.25,
//                     // }),
//                   }}
//                 >

//                   {option}
//                 </MenuItem>
//               );
//             })}
//           </Select>



//           <Button sx={{
//             border: '1px solid white',
//             width: 145,
//             height: 33,
//             fontWeight: 500,
//             // borderRadius: "6px",
//             color: "#1758BA", backgroundColor: "#1758BA1A"
//           }}
//             onClick={() => handleNewField()}
//           >
//             فیلد جدید
//           </Button>
//           <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

//             <Grid gridColumn={3} sx={{ width: "90%", display: "flex", flexDirection: "column", marginRight: "4px" }} >

//               <CalculatorParenthesis operator={'('} handleParenthesis={handleParenthesis} />
//               {operators.map((op, idx) => {
//                 return (
//                   <Button sx={{ border: '1px solid white', width: 33, height: 33, minWidth: 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px", fontWeight: 500 }}
//                     onClick={() => handleOperator(op)} key={idx}>
//                     {op}

//                   </Button>
//                 )
//                 //  <CalculatorOperator operator={op} handleOperator={handleOperator} idx={idx} />
//               })
//               }
//             </Grid>
//             <Grid gridColumn={3} sx={{}} spacing={5} gap={5} rowGap={5} columnGap={6}>
//               <CalculatorParenthesis operator={')'} handleParenthesis={handleParenthesis} />
//               <CalculatorClear handleClear={handleUndo} />
//               {numbers.reverse().map((num, idx) => {
//                 return (
//                   <Button sx={{
//                     border: '1px solid white', width: num === "0" ? 70 : 33, height: 33, minWidth: num === "0" ? 70 : 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px",
//                     fontWeight: 500
//                   }}
//                     onClick={() => handleNumber(num)}
//                     key={idx}
//                   >
//                     {num}
//                   </Button>
//                 )
//                 // return <CalculatorNumber number={num} handleOperator={handleOperator} idx={idx} />
//               })
//               }
//             </Grid>


//           </Stack>



//         </Box>
//       </>
//     );
//   };


//   if (!isClient) return

//   return (
//     <Container maxWidth="sm" sx={{ mt: "35px" }}>

//       {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//         <IconButton
//           aria-label="close"
//           // onClick={handleClose}
//           sx={{ marginX: 0.5, marginTop: 0.5, marginBottom: 0 }}
//         >
//           <Iconify icon="mingcute:close-line" sx={{ width: 25, height: 25 }} />
//         </IconButton>
//       </Box> */}



//       <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040" }}>محاسبه گر</Typography>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100%',
//           paddingX: 1.5,
//           direction: 'ltr',
//           width: '100%',
//         }}
//       >
//         <Stack spacing={1}>
//           <Typography variant="subtitle2" color="#161616">نام:</Typography>


//           <TextField
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': {
//                   borderColor: '#DDE1E6',
//                   borderRadius: '8px',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#DDE1E6',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#DDE1E6',
//                 },
//               },
//               '& input': {
//                 padding: 1,
//                 height: "50px",
//               },
//             }}
//             name="name"
//           />

//         </Stack>


//         <Grid sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", sm: "row" }, my: 3 }}>

//           {renderKeypad()}


//           <Box sx={{ width: { xs: "100%", sm: "70%" }, display: "flex", flexDirection: "column", alignItems: "start" }}>
//             <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>اسکریپت:</Typography>
//             <Stack spacing={4} sx={{ border: '1px solid #DDE1E6', borderRadius: 2, padding: 1, width: "100%", height: "100%", minHeight: 200, display: "flex", flexWrap: "wrap", flexDirection: "row" }}>


//               <div
//                 contentEditable
//                 onClick={handleClick}
//                 ref={contentEditable}
//                 onKeyDown={handleKeyDown}
//                 suppressContentEditableWarning
//                 className={styles.ContentEditable}
//               >
//                 {renderElements()}
//               </div>


//             </Stack>


//           </Box>

//         </Grid>


//         <Box display="flex" gap={3} width="100%" marginTop={5} marginBottom={2} sx={{ display: "flex", justifyContent: "center" }}>
//           <LoadingButton
//             type="button"
//             onClick={() => {
//               const newFormula = htmlToFormula()
//               // setFormula(newFormula)
//             }}
//             // fullWidth
//             variant="contained"
//             // variant="outlined"
//             // loading={isSubmitting || isLoadingData}
//             sx={{
//               backgroundColor: "#1758BA",
//               fontWeight: '500',
//               fontSize: '15px',
//               height: '50px',

//               '&.MuiButtonBase-root:hover': {
//                 backgroundColor: "#1758BA",
//                 // bgcolor: "#F7F7FF",
//                 // opacity : .9
//               },
//               minWidth: "132px",
//             }}
//           >
//             <Typography variant="body2" component={'p'} py={0.5} sx={{ color: "#fff", fontWeight: 500 }}>
//               تایید
//             </Typography>
//           </LoadingButton>

//           <Button
//             type="button"
//             variant="outlined"
//             // fullWidth
//             sx={{ height: '50px', minWidth: "132px", fontWeight: '500', fontSize: '15px', borderColor: "#1758BA", background: "#F7F7FF" }}
//           // onClick={handleClose}
//           >
//             <Typography variant="body2" component={'p'} py={0.5} color={"#1758BA"} sx={{ fontWeight: 500 }}>
//               انصراف
//             </Typography>
//           </Button>
//         </Box>
//       </Box>




//     </Container>
//   );


// }

// export default Page;


const page = () => {
  return (
    <div>
      <AdvancedFormulaEditor />
    </div>
  );
}

export default page;