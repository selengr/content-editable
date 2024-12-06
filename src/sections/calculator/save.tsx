"use client"

import React, { useCallback, useRef, useState } from "react";
import Image from 'next/image';

import ContentEditable from 'react-contenteditable'

//mui
import Grid from '@mui/material/Grid2';
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";


import CalculatorClear from "@/sections/calculator/calculator-clear";
import CalculatorNumber from "@/sections/calculator/calculator-number";
import CalculatorOperator from "@/sections/calculator/calculator-operator";


import styles from '@/sections/calculator/advancedFormulaEditor.module.css'
import JSONData from '../../../public/assets/fake-data/response_v1.json'
import CalculatorParenthesis from "@/sections/calculator/calculator-parenthesis";




type OPERATOR_TYPE = "OPERATOR" | "NUMBER" | "AVG" | string



const Page = () => {
  const contentEditable = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState<any>([])
  const [lastOperator, setLastOperator] = useState<OPERATOR_TYPE>("")
  const [formula, setFormula] = useState<string>("")
  const selectFieldRef = useRef<{ [key: string]: string }>({})
  const selectAvgRef = useRef<{ [key: string]: string }>({})

  const [elements, setElements] = useState<Element[]>([]);
  const [cursorIndex, setCursorIndex] = useState(0);


  const handleUndo = useCallback(() => {
    const selection: any = window.getSelection();
    const editableDiv = contentEditable.current;

    if (!editableDiv) return;

    const range = selection?.getRangeAt(0);
    const startContainer = range?.startContainer;
    if (startContainer?.childNodes?.length > 0) {
      if (range.endOffset > 0) {
        startContainer.childNodes[range.endOffset - 1].remove();
      } else editableDiv.focus()

    } else {
      editableDiv.focus();
    }

    setHtml(editableDiv.innerHTML);
    editableDiv.focus();
  }, []);

  // const handleOperator = (content: string, type: OPERATOR_TYPE) => {
  //   const selection = window.getSelection();
  //   const range = selection?.getRangeAt(0);
  //   const editableDiv = contentEditable.current;

  //   if (!editableDiv) return;

  //   if (range?.endContainer.nodeName !== "#text") {
  //     const lastChild = editableDiv.lastElementChild;
  //     const isLastItemOperator = lastChild && lastChild.getAttribute('data-type') === 'OPERATOR';
  //     const isLastItemNumber = lastChild && lastChild.getAttribute('data-type') === 'NUMBER';
  //     const operatorTypes = ['-', '+', '*', '='];

  //     if (isLastItemOperator && operatorTypes.includes(lastChild.textContent)) {
  //       // Replace the last operator
  //       lastChild.textContent = content;
  //       lastChild.className = `${styles.dynamicbtn} ${styles[type]}`;
  //       lastChild.setAttribute('data-type', type);
  //     } else if (isLastItemNumber && type === 'NUMBER') {
  //       // Combine with the last number
  //       lastChild.textContent += content;
  //     } else if (content === ')') {
  //       // Add matching parentheses
  //       const openingParenthesis = document.createElement('div');
  //       openingParenthesis.className = `${styles.dynamicbtn} ${styles[type]}`;
  //       openingParenthesis.textContent = '(';
  //       openingParenthesis.contentEditable = 'false';
  //       openingParenthesis.setAttribute('data-type', type);

  //       const closingParenthesis = document.createElement('div');
  //       closingParenthesis.className = `${styles.dynamicbtn} ${styles[type]}`;
  //       closingParenthesis.textContent = ')';
  //       closingParenthesis.contentEditable = 'false';
  //       closingParenthesis.setAttribute('data-type', type);

  //       if (range && editableDiv.contains(range.startContainer)) {
  //         range.insertNode(closingParenthesis);
  //         range.insertNode(openingParenthesis);
  //         range.setStartAfter(closingParenthesis);
  //       } else {
  //         editableDiv.appendChild(openingParenthesis);
  //         editableDiv.appendChild(closingParenthesis);
  //       }
  //     } else {
  //       // Add a new element
  //       const newElement = document.createElement('div');
  //       newElement.className = `${styles.dynamicbtn} ${styles[type]}`;
  //       newElement.textContent = content;
  //       newElement.contentEditable = 'false';
  //       newElement.setAttribute('data-type', type);

  //       if (range && editableDiv.contains(range.startContainer)) {
  //         range.insertNode(newElement);
  //         range.setStartAfter(newElement);
  //       } else {
  //         editableDiv.appendChild(newElement);
  //       }
  //     }

  //     setHtml(editableDiv.innerHTML);
  //     setLastOperator(type);
  //     editableDiv.focus();
  //   } else {
  //     editableDiv.focus();
  //   }
  // };

  const createElement = (content: string, type: OPERATOR_TYPE) => {
    const element = document.createElement('div');
    element.className = `${styles.dynamicbtn} ${styles[type]}`;
    element.textContent = content;
    element.contentEditable = 'false';
    element.setAttribute('data-type', type);
    return element;
  };

  const insertElement = (element: HTMLElement) => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const editableDiv = contentEditable.current;

    if (!editableDiv) return;

    if (range && editableDiv.contains(range.startContainer)) {
      range.insertNode(element);
      range.setStartAfter(element);
    } else {
      editableDiv.appendChild(element);
    }

    setHtml(editableDiv.innerHTML);
    editableDiv.focus();
  };

  // const handleOperator = (content: string) => {
  //   const editableDiv = contentEditable.current;
  //   if (!editableDiv) return;

  //   const lastChild = editableDiv.lastElementChild;
  //   const isLastItemOperator = lastChild && lastChild.getAttribute('data-type') === 'OPERATOR';
  //   const operatorTypes = ['-', '+', '*', '/'];

  //   if (isLastItemOperator && operatorTypes.includes(lastChild.textContent || '')) {
  //     lastChild.textContent = content;
  //   } else {
  //     const newElement = createElement(content, 'OPERATOR');
  //     insertElement(newElement);
  //   }
  // };



  const renderElements = useCallback(() => {
    return elements.map((elem: any, index) => (
      <div
        key={index}
        contentEditable={false}
        className={`${styles.dynamicbtn} ${styles[elem?.type]}`}
        data-type={elem?.type}
      >
        {elem?.content}
      </div>
    ));
  }, [elements]);

  const updateElements = (newElements: Element[]) => {
    setElements(newElements);
    setTimeout(() => {
      const editableDiv = contentEditable.current;
      if (editableDiv) {
        const range = document.createRange();
        const sel = window.getSelection();


        range.setStart(editableDiv, cursorIndex);


        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
        editableDiv.focus();
      }
    }, 0);
  };

  const handleOperator = (content: string) => {
    const newElements :any = [...elements];
    const operatorTypes = ['-', '+', '*', '/'];

    if (cursorIndex > 0 && newElements[cursorIndex - 1].type === 'OPERATOR' && operatorTypes.includes(newElements[cursorIndex - 1].content)) {
      newElements[cursorIndex - 1] = { type: 'OPERATOR', content };
    } else {
      newElements.splice(cursorIndex, 0, { type: 'OPERATOR', content });
      setCursorIndex(cursorIndex + 1);
    }

    updateElements(newElements);
  };


  const handleNumber = (content: string) => {
    const newElements: any = [...elements];

    if (cursorIndex > 0 && newElements[cursorIndex - 1].type === 'NUMBER') {
      newElements[cursorIndex - 1].content += content;
    } else {
      newElements.splice(cursorIndex, 0, { type: 'NUMBER', content });
      setCursorIndex(cursorIndex + 1);
    }

    updateElements(newElements);
  };

  const handleParenthesis = () => {
    const newElements: any = [...elements];
    newElements.splice(cursorIndex, 0,
      { type: 'PARENTHESIS', content: '(' },
      { type: 'PARENTHESIS', content: ')' }
    );
    setCursorIndex(cursorIndex + 1);
    updateElements(newElements);
  };


  // const handleOperator = (content: string, type: OPERATOR_TYPE) => {
  //   const selection = window.getSelection();
  //   const range = selection?.getRangeAt(0);
  //   const editableDiv = contentEditable.current;

  //   if (!editableDiv) return;

  //   if (range?.endContainer.nodeName !== "#text") {
  //     const lastChild = editableDiv.lastElementChild;
  //     const isLastItemOperator = lastChild && lastChild.getAttribute('data-type') === 'OPERATOR';
  //     const isLastItemNumber = lastChild && lastChild.getAttribute('data-type') === 'NUMBER';
  //     const operatorTypes = ['-', '+', '*', '=', "/"];

  //     if (isLastItemOperator && lastOperator === type && operatorTypes.includes(lastChild.textContent)) {
  //       // Replace the last operator
  //       lastChild.textContent = content;
  //       lastChild.className = `${styles.dynamicbtn} ${styles[type]}`;
  //       lastChild.setAttribute('data-type', type);
  //     } else if (isLastItemNumber && type === 'NUMBER') {
  //       // Combine with the last number
  //       lastChild.textContent += content;
  //     } else {
  //       // Add a new operator
  //       const newElement = document.createElement('div');
  //       newElement.className = `${styles.dynamicbtn} ${styles[type]}`;
  //       newElement.textContent = content;
  //       newElement.contentEditable = 'false';
  //       newElement.setAttribute('data-type', type);

  //       if (range && editableDiv.contains(range.startContainer)) {
  //         range.insertNode(newElement);
  //         range.setStartAfter(newElement);
  //       } else {
  //         editableDiv.appendChild(newElement);
  //       }
  //     }

  //     setHtml(editableDiv.innerHTML);
  //     setLastOperator(type);
  //     editableDiv.focus();
  //   } else {
  //     editableDiv.focus();
  //   }
  // };




  const handleChange = (evt: any) => {
    // const newFormula = htmlToFormula(html)
    // setFormula(newFormula)
  };

  function htmlToFormula(html: string): string {

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const elements: HTMLCollection = doc.body.children

    let formula = ''

    for (const element of Array.from(elements)) {
      if (element instanceof HTMLDivElement) {
        const classList = element.classList;

        if (element.getAttribute("data-type") === "NUMBER") {
          formula += element.textContent || '';
          // } else if (element.getAttribute("data-type") === "OPERATOR") {


        } else if (classList.value.includes('OPERATOR')) {


          if (element.textContent == "+") {
            formula += "+";
          } else if (element.textContent == "-") {

            formula += "-";
          } else if (element.textContent == "*") {

            formula += "*";
          } else if (element.textContent == "/") {
            formula += "/";
          } else if (element.textContent == "(") {

            console.log(element.getAttribute("data-type"))
            if (element.getAttribute("data-type") === "avg") {
              formula += "({";
            } else {
              formula += "(";
            }
          } else if (element.textContent == ")") {
            // debugger
            if (element.getAttribute("data-type") === "avg") {
              formula += "})";
            } else {
              formula += ")";
            }
          }
          // else {
          //   formula += element.textContent + "" || '';
          // }

          // } else if (classList.contains('advancedFormulaEditor-module__uTdVNG__NEW_FIELD')) {
        } else if (element.getAttribute("data-type") === "NEW_FIELD") {
          const select = element.querySelector('div');
          if (select) {
            // formula += '#q_' + (selectValues[select.id] || '')
            if (selectFieldRef.current[select.id]?.startsWith("calc")) {
              formula += '{' + (selectFieldRef.current[select.id] + '}' || '')
            } else {
              formula += '#' + (selectFieldRef.current[select.id] || '')
            }
          }
        } else if (element.getAttribute("data-type") === "NEW_FnFx") {
          // } else if (classList.contains('advancedFormulaEditor-module__uTdVNG__NEW_FnFx')) {
          const select = element.querySelector('div');
          if (select) {
            formula += '#avg' + (selectAvgRef.current[select.id] || '')
          }
        }
      }
    }


    console.clear()
    console.log("html", html)
    // console.log("element.textContent ===>", element.textContent)
    console.log("html-to-formula ===>", formula)
    return formula
  }



  const handleNewField = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const editableDiv = contentEditable.current;

    if (!editableDiv) return;

    if (range?.endContainer.nodeName !== "#text") {


      const newElement = document.createElement('div');
      newElement.className = `${styles.dynamicbtn} ${styles["NEW_FIELD"]}`;
      newElement.setAttribute('data-type', "NEW_FIELD");
      newElement.contentEditable = 'false';


      // Create custom dropdown
      const customDropdown = document.createElement('div');
      customDropdown.className = styles.customDropdown;
      customDropdown.setAttribute('data-type', "down");
      customDropdown.textContent = "انتخاب سوال";

      const optionsContainer = document.createElement('div');
      optionsContainer.className = styles.optionsContainer;
      optionsContainer.style.display = 'none';

      JSONData.dataList.forEach((item: any) => {
        const optionElement = document.createElement('div');
        optionElement.className = styles.option;
        optionElement.textContent = item.caption;
        optionElement.onclick = () => {
          customDropdown.textContent = item.caption;
          selectFieldRef.current[customDropdown.id] = item.extMap.UNIQUE_NAME
          optionsContainer.style.display = 'none';

          // customDropdown.setAttribute('data-unique-name', item.extMap.UNIQUE_NAME)
        };
        optionsContainer.appendChild(optionElement);
      });


      customDropdown.onclick = () => {
        // editableDiv.focus();
        optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'block' : 'none'; // Toggle options
        customDropdown.setAttribute('data-type', `${optionsContainer.style.display === 'none' ? "down" : "up"}`);
      };

      const selectId = `select_${Date.now()}`;
      customDropdown.id = selectId;

      const closeOptions = (event: any) => {
        editableDiv.focus();
        if (!newElement.contains(event.target)) {
          optionsContainer.style.display = 'none';
          customDropdown.setAttribute('data-type', "down");
        }
      };

      document.addEventListener('click', closeOptions);

      if (optionsContainer.style.display = 'none') {
        if (range && editableDiv.contains(range.startContainer)) {


          newElement.appendChild(customDropdown);
          newElement.appendChild(optionsContainer);

          range.insertNode(newElement);
          range.setStartAfter(newElement);
        } else {
          newElement.appendChild(customDropdown);
          newElement.appendChild(optionsContainer);
          editableDiv.appendChild(newElement);
        }
      }

      setHtml(editableDiv.innerHTML);
      setLastOperator("AVG")

      editableDiv.focus();
    } else {
      editableDiv.focus();

    }
  };




  const handleFnFX = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const editableDiv = contentEditable.current;

    if (!editableDiv) return;

    if (range?.endContainer.nodeName !== "#text") {

      const newElement = document.createElement('div');
      const newElement2 = document.createElement('div');
      const newElement3 = document.createElement('div');

      newElement.className = `${styles.dynamicbtn} ${styles["NEW_FnFx"]}`;
      newElement.setAttribute('data-type', "NEW_FnFx");
      newElement.contentEditable = 'false';
      newElement2.contentEditable = 'false';
      newElement3.contentEditable = 'false';
      newElement2.textContent = "(";
      newElement3.textContent = ")";
      newElement2.setAttribute('data-type', "avg");
      newElement3.setAttribute('data-type', "avg");
      newElement2.className = `${styles.dynamicbtn}  ${styles["OPERATOR"]}`;
      newElement3.className = `${styles.dynamicbtn}  ${styles["OPERATOR"]}`;

      // Create custom dropdown
      const customDropdown = document.createElement('div');
      customDropdown.className = `${styles.customDropdown}`;
      customDropdown.setAttribute('data-type', "down");
      customDropdown.textContent = "میانگین()";

      const optionsContainer = document.createElement('div');
      optionsContainer.className = styles.optionsContainer;
      optionsContainer.style.display = 'none';

      // Define your function options
      [{ fnValue: "avg", fnCaption: "میانگین()" }].forEach((item) => {
        const optionElement = document.createElement('div');
        optionElement.className = styles.option;
        optionElement.textContent = item.fnCaption;
        optionElement.onclick = () => {
          customDropdown.textContent = item.fnCaption;
          selectAvgRef.current[customDropdown.id] = item.fnValue;
          optionsContainer.style.display = 'none';
        };
        optionsContainer.appendChild(optionElement);
      });

      customDropdown.onclick = (event) => {
        event.stopPropagation();
        optionsContainer.style.display = optionsContainer.style.display === 'none' ? 'block' : 'none'; // Toggle options
        customDropdown.setAttribute('data-type', `${optionsContainer.style.display === 'none' ? "down" : "up"}`);
      };

      const closeOptions = (event: any) => {
        editableDiv.focus();
        if (!newElement.contains(event.target)) {
          optionsContainer.style.display = 'none';
          customDropdown.setAttribute('data-type', "down");
        }
      };

      document.addEventListener('click', closeOptions);

      const selectId = `select_${Date.now()}`;
      customDropdown.id = selectId;

      if (optionsContainer.style.display = 'none') {
        if (range && editableDiv.contains(range.startContainer)) {
          range.insertNode(newElement3);
          range.insertNode(newElement2);
          range.insertNode(newElement);
          newElement.appendChild(customDropdown);
          newElement.appendChild(optionsContainer);
          range.setStartAfter(newElement3);
        } else {
          newElement.appendChild(customDropdown);
          newElement.appendChild(optionsContainer);
          editableDiv.appendChild(newElement);
        }

        setHtml(editableDiv.innerHTML);
        setLastOperator("AVG")

      }
    } else {
      editableDiv.focus();
    }
  };




  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!/^[0-9+\-*/().()]$/.test(event.key) &&
      !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };


  const handleClick = (e: React.MouseEvent) => {
    const editableDiv = contentEditable.current;
    if (editableDiv) {
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range) {
        const index = Array.from(editableDiv.childNodes).findIndex(node => node.contains(range.startContainer));
        setCursorIndex(index === -1 ? elements.length : index);
      }
    }
  };


  const renderKeypad = () => {
    const operators = ['+', '-', '*', '/'];
    const numbers = ['0', '.', '7', '8', '9', '4', '5', '6', '1', '2', '3'];

    return (
      <>
        <Box sx={{ width: { xs: "100%", sm: "30%" }, display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", mt: 3 }} gap={"3px"}>


          <Select
            sx={{
              '& .MuiSelect-select': {
                padding: 1,
              },
              width: 145,
              height: 33,
              fontWeight: 500,
              marginBottom: "2px",
              backgroundColor: "#9D2CDF1A",
              borderRadius: '8px',
              color: "#9D2CDF",
              borderColor: "none",
              '&:before, &:after': {
                border: 'none',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '& .MuiSvgIcon-root': {
                color: "#9D2CDF",
              },
            }}
            displayEmpty
            defaultValue=""
            renderValue={(value: any) => {

              return (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Image
                    alt="file preview"
                    src={"/assets/icons/svg/ic_fx.svg"}
                    height={30}
                    width={30}
                  />
                  {value}
                </Box>
              );
            }}
            MenuProps={{
              PaperProps: {
                sx: { px: 1, maxHeight: 280, minHeight: 180, mt: "3px" },
              },
            }}
            onClick={(e: any) => {
              if (e.target.tagName === "LI") {
                handleFnFX()
              } else {
                e.preventDefault()
              }
            }}
            onOpen={() => {
              const editableDiv = contentEditable.current;
              editableDiv.focus();
            }}
          >

            {["میانگین  ()"].map((option: any) => {

              return (
                <MenuItem
                  key={option}
                  value={option}
                  sx={{
                    py: 1,
                    px: 2,
                    height: 33,
                    borderRadius: 1.75,
                    typography: 'body2',
                    backgroundColor: "#9D2CDF !important",
                    color: "white",
                    margin: "5px",
                    // ...(selected && {
                    //     fontWeight: 'fontWeightMedium',
                    // }),
                    // ...(checkbox && {
                    //     p: 0.25,
                    // }),
                  }}
                >

                  {option}
                </MenuItem>
              );
            })}
          </Select>



          <Button sx={{
            border: '1px solid white',
            width: 145,
            height: 33,
            fontWeight: 500,
            // borderRadius: "6px",
            color: "#1758BA", backgroundColor: "#1758BA1A"
          }}
            onClick={() => handleNewField()}
          >
            فیلد جدید
          </Button>
          <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

            <Grid gridColumn={3} sx={{ width: "90%", display: "flex", flexDirection: "column", marginRight: "4px" }} >

              <CalculatorParenthesis operator={'('} handleParenthesis={handleParenthesis} />
              {operators.map((op, idx) => {
                return (
                  <Button sx={{ border: '1px solid white', width: 33, height: 33, minWidth: 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px", fontWeight: 500 }}
                    onClick={() => handleOperator(op)} key={idx}>
                    {op}

                  </Button>
                )
                //  <CalculatorOperator operator={op} handleOperator={handleOperator} idx={idx} />
              })
              }
            </Grid>
            <Grid gridColumn={3} sx={{}} spacing={5} gap={5} rowGap={5} columnGap={6}>
              <CalculatorParenthesis operator={')'} handleParenthesis={handleParenthesis} />
              <CalculatorClear handleClear={handleUndo} />
              {numbers.reverse().map((num, idx) => {
                return (
                  <Button sx={{
                    border: '1px solid white', width: num === "0" ? 70 : 33, height: 33, minWidth: num === "0" ? 70 : 33, color: "#1758BA", backgroundColor: "#1758BA1A", margin: "2px",
                    fontWeight: 500
                  }}
                    onClick={() => handleNumber(num)}
                    key={idx}
                  >
                    {num}
                  </Button>
                )
                // return <CalculatorNumber number={num} handleOperator={handleOperator} idx={idx} />
              })
              }
            </Grid>


          </Stack>



        </Box>
      </>
    );
  };



  return (
    <Container maxWidth="sm" sx={{ mt: "35px" }}>

      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <IconButton
          aria-label="close"
          // onClick={handleClose}
          sx={{ marginX: 0.5, marginTop: 0.5, marginBottom: 0 }}
        >
          <Iconify icon="mingcute:close-line" sx={{ width: 25, height: 25 }} />
        </IconButton>
      </Box> */}



      <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040" }}>محاسبه گر</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          paddingX: 1.5,
          direction: 'ltr',
          width: '100%',
        }}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="#161616">نام:</Typography>
          <Typography variant="subtitle2" color="#161616" sx={{
            // display:"flex",
            // justifyContent : "end",
            // direction:"ltr"
          }}>{formula}</Typography>

          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#DDE1E6',
                  borderRadius: '8px',
                },
                '&:hover fieldset': {
                  borderColor: '#DDE1E6',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#DDE1E6',
                },
              },
              '& input': {
                padding: 1,
                height: "50px",
              },
            }}
            name="name"
          />

        </Stack>


        <Grid sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", sm: "row" }, my: 3 }}>

          {renderKeypad()}


          <Box sx={{ width: { xs: "100%", sm: "70%" }, display: "flex", flexDirection: "column", alignItems: "start" }}>
            <Typography variant="subtitle1" sx={{ display: "flex", justifyContent: "center", color: "#404040", fontWeight: 500 }}>اسکریپت:</Typography>
            <Stack spacing={4} sx={{ border: '1px solid #DDE1E6', borderRadius: 2, padding: 1, width: "100%", height: "100%", minHeight: 200, display: "flex", flexWrap: "wrap", flexDirection: "row" }}>

              {/* 
              <ContentEditable
                html={html}
                tagName="div"
                autoFocus={true}
                disabled={false}
                onChange={handleChange}
                contentEditable={"true"}
                onKeyDown={handleKeyDown}
                innerRef={contentEditable}
                className={styles.ContentEditable}
              /> */}
              <div
                ref={contentEditable}
                // className={styles.editable}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onClick={handleClick}
                className={styles.ContentEditable}
              >
                {renderElements()}
              </div>
              {/* <div
                ref={contentEditable}
                className={styles.editable}
                contentEditable="true"
                suppressContentEditableWarning={true}
              /> */}


            </Stack>


          </Box>

        </Grid>


        <Box display="flex" gap={3} width="100%" marginTop={5} marginBottom={2} sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            type="button"
            onClick={() => {
              const newFormula = htmlToFormula(html)
              // setFormula(newFormula)
            }}
            // fullWidth
            variant="contained"
            // variant="outlined"
            // loading={isSubmitting || isLoadingData}
            sx={{
              backgroundColor: "#1758BA",
              fontWeight: '500',
              fontSize: '15px',
              height: '50px',

              '&.MuiButtonBase-root:hover': {
                backgroundColor: "#1758BA",
                // bgcolor: "#F7F7FF",
                // opacity : .9
              },
              minWidth: "132px",
            }}
          >
            <Typography variant="body2" component={'p'} py={0.5} sx={{ color: "#fff", fontWeight: 500 }}>
              تایید
            </Typography>
          </LoadingButton>

          <Button
            type="button"
            variant="outlined"
            // fullWidth
            sx={{ height: '50px', minWidth: "132px", fontWeight: '500', fontSize: '15px', borderColor: "#1758BA", background: "#F7F7FF" }}
          // onClick={handleClose}
          >
            <Typography variant="body2" component={'p'} py={0.5} color={"#1758BA"} sx={{ fontWeight: 500 }}>
              انصراف
            </Typography>
          </Button>
        </Box>
      </Box>




    </Container>
  );


}

export default Page;