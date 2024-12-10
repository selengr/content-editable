import React, { useRef, useState, useEffect, useCallback } from 'react';
import JSONData from '../../../public/assets/fake-data/response_v1.json';

interface Element {
  type: string;
  content: string;
  id?: string;
  children?: Element[];
}

const AdvancedFormulaEditor: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const contentEditable = useRef<HTMLDivElement>(null);
  const [cursorIndex, setCursorIndex] = useState(0);
  const selectFieldRef = useRef<{ [key: string]: string }>({});
  const selectAvgRef = useRef<{ [key: string]: string }>({});
  const styles = {
    dynamicbtn: 'dynamic-btn',
    NEW_FIELD: 'new-field',
    NEW_FnFx: 'new-fnfx',
    customDropdown: 'custom-dropdown',
    optionsContainer: 'options-container',
    PARENTHESIS: 'parenthesis',
    NUMBER: 'number',
    OPERATOR: 'operator',
    option: 'option'
  };

  const handleClick = (e: React.MouseEvent) => {
    const editableDiv = contentEditable.current;
    if (editableDiv) {
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (range) {
        const clickedNode = range.startContainer;
        let index = 0;
        let found = false;

        for (const child of editableDiv.childNodes) {
          if (child === clickedNode || child.contains(clickedNode) ||
              (clickedNode.nodeType === Node.TEXT_NODE && child.contains(clickedNode.parentNode))) {
            found = true;
            break;
          }
          index++;
        }

        if (!found) {
          // If not found, it might be between elements
          const rect = editableDiv.getBoundingClientRect();
          const relativeY = e.clientY - rect.top;
          index = Math.floor((relativeY / rect.height) * editableDiv.childNodes.length);
        }

        const newIndex = Math.min(index, editableDiv.childNodes.length);
        setCursorIndex(newIndex);
        console.log('Cursor index set to:', newIndex);
      }
    }
  };

  useEffect(() => {
    console.log('Current elements:', elements);
    console.log('Current cursor index:', cursorIndex);
  }, [elements, cursorIndex]);

  const updateElements = (newElements: Element[], newCursorIndex: number) => {
    setElements(newElements);
    setCursorIndex(newCursorIndex);
    setTimeout(() => {
      const editableDiv = contentEditable.current;
      if (editableDiv) {
        const range = document.createRange();
        const sel = window.getSelection();

        if (newCursorIndex >= editableDiv.childNodes.length) {
          range.setStartAfter(editableDiv.lastChild || editableDiv);
        } else {
          range.setStartAfter(editableDiv.childNodes[newCursorIndex - 1] || editableDiv);
        }

        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
        editableDiv.focus();
      }
    }, 0);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newElements = [...elements];
      newElements.splice(cursorIndex, 0, { type: 'paragraph', content: '' });
      updateElements(newElements, cursorIndex + 1);
    }
  };

  const handleNewField = () => {
    const editableDiv = contentEditable.current;
    if (!editableDiv) return;

    const selectId = `select_${Date.now()}`;
    const newElement: Element = { 
      type: 'NEW_FIELD', 
      content: 'انتخاب سوال',
      id: selectId
    };

    const newElements = [...elements];
    newElements.splice(cursorIndex, 0, newElement);

    setElements(newElements);

    // Use setTimeout to ensure the DOM has updated before setting the cursor
    setTimeout(() => {
      const range = document.createRange();
      const sel = window.getSelection();

      if (editableDiv.childNodes[cursorIndex]) {
        range.setStartAfter(editableDiv.childNodes[cursorIndex]);
      } else {
        range.setStartAfter(editableDiv.lastChild || editableDiv);
      }

      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);

      setCursorIndex(cursorIndex + 1);
      editableDiv.focus();
    }, 0);
  };

  const handleParenthesis = (content: string) => {
    const newElements = [...elements];
    let newCursorIndex = cursorIndex;
    if (content === '(') {
      newElements.splice(cursorIndex, 0,
        { type: 'PARENTHESIS', content: '(' },
        { type: 'PARENTHESIS', content: ')' }
      );
      newCursorIndex++;
    } else if (content === ')') {
      newElements.splice(cursorIndex, 0,
        { type: 'PARENTHESIS', content: ')' }
      );
      newCursorIndex++;
    }
    updateElements(newElements, newCursorIndex);
  };

  const handleNumber = (content: string) => {
    const newElements: Element[] = [...elements];
    let newCursorIndex = cursorIndex;

    if (cursorIndex > 0 && newElements[cursorIndex - 1].type === 'NUMBER') {
      newElements[cursorIndex - 1].content += content;
    } else {
      newElements.splice(cursorIndex, 0, { type: 'NUMBER', content });
      newCursorIndex++;
    }

    updateElements(newElements, newCursorIndex);
  };

  const handleFnFX = () => {
    const editableDiv = contentEditable.current;
    if (!editableDiv) return;

    const selectId = `select_${Date.now()}`;
    const newElement: Element = {
      type: 'NEW_FnFx',
      content: 'میانگین()',
      id: selectId,
    };

    const newElements = [...elements];
    newElements.splice(cursorIndex, 0, newElement);
    newElements.splice(cursorIndex + 1, 0, { type: 'PARENTHESIS', content: '(' });
    newElements.splice(cursorIndex + 2, 0, { type: 'PARENTHESIS', content: ')' }); 

    setElements(newElements);
    selectAvgRef.current[selectId] = 'avg';

    setTimeout(() => {
      const range = document.createRange();
      const sel = window.getSelection();

      if (editableDiv.childNodes[cursorIndex + 1]) {
        range.setStartAfter(editableDiv.childNodes[cursorIndex + 1]);
      } else {
        range.setStartAfter(editableDiv.lastChild || editableDiv);
      }

      range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);

      setCursorIndex(cursorIndex + 2);
      editableDiv.focus();
    }, 0);
  };

  const handleFnFXDropdownClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const optionsContainer = (e.target as HTMLElement).nextElementSibling as HTMLElement;
    const isHidden = optionsContainer.style.display === 'none';
    optionsContainer.style.display = isHidden ? 'block' : 'none';
    (e.target as HTMLElement).setAttribute('data-type', isHidden ? 'up' : 'down');
  };

  const handleFnFXOptionClick = (item: { fnValue: string, fnCaption: string }, id: string) => {
    const newElements = elements.map(elem => 
      elem.id === id ? { ...elem, content: item.fnCaption } : elem
    );
    setElements(newElements);
    selectAvgRef.current[id] = item.fnValue;

    // Close the options container
    const optionsContainer = document.querySelector(`[data-id="${id}"] .${styles.optionsContainer}`) as HTMLElement;
    if (optionsContainer) {
      optionsContainer.style.display = 'none';
    }

    // Update the dropdown button state
    const dropdownButton = document.querySelector(`[data-id="${id}"] .${styles.customDropdown}`) as HTMLElement;
    if (dropdownButton) {
      dropdownButton.setAttribute('data-type', 'down');
    }
  };

  const renderElements = useCallback(() => {
    return elements.map((elem, index) => {
      if (elem.type === 'NEW_FIELD') {
        return (
          <div
            key={elem.id}
            data-id={elem.id}
            contentEditable={false}
            className={`${styles.dynamicbtn} ${styles.NEW_FIELD}`}
            data-type="NEW_FIELD"
          >
            <div 
              className={styles.customDropdown}
              data-type="down"
              onClick={(e) => handleDropdownClick(e, elem.id!)}
            >
              {elem.content}
            </div>
            <div className={styles.optionsContainer} style={{ display: 'none' }}>
              {JSONData.dataList.map((item: any) => (
                <div
                  key={item.extMap.UNIQUE_NAME}
                  className={styles.option}
                  onClick={() => handleOptionClick(item, elem.id!)}
                >
                  {item.caption}
                </div>
              ))}
            </div>
          </div>
        );
      } else if (elem.type === 'NEW_FnFx') {
        return (
          <div
            key={elem.id}
            data-id={elem.id}
            contentEditable={false}
            className={`${styles.dynamicbtn} ${styles.NEW_FnFx}`}
            data-type="NEW_FnFx"
          >
            <div 
              className={styles.customDropdown}
              data-type="down"
              onClick={(e) => handleFnFXDropdownClick(e, elem.id!)}
            >
              {elem.content}
            </div>
            <div className={styles.optionsContainer} style={{ display: 'none' }}>
              {[{ fnValue: "avg", fnCaption: "میانگین()" }].map((item) => (
                <div
                  key={item.fnValue}
                  className={styles.option}
                  onClick={() => handleFnFXOptionClick(item, elem.id!)}
                >
                  {item.fnCaption}
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            contentEditable={false}
            className={`${styles.dynamicbtn} ${styles[elem.type]}`}
            data-type={elem.type}
          >
            {elem.content}
          </div>
        );
      }
    });
  }, [elements, styles]);

  const handleDropdownClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const optionsContainer = (e.target as HTMLElement).nextElementSibling as HTMLElement;
    const isHidden = optionsContainer.style.display === 'none';
    optionsContainer.style.display = isHidden ? 'block' : 'none';
    (e.target as HTMLElement).setAttribute('data-type', isHidden ? 'up' : 'down');
  };

  const handleOptionClick = (item: any, id: string) => {
    const newElements = elements.map(elem => 
      elem.id === id ? { ...elem, content: item.caption } : elem
    );
    setElements(newElements);
    selectFieldRef.current[id] = item.extMap.UNIQUE_NAME;

    // Close the options container
    const optionsContainer = document.querySelector(`[data-id="${id}"] .${styles.optionsContainer}`) as HTMLElement;
    if (optionsContainer) {
      optionsContainer.style.display = 'none';
    }

    // Update the dropdown button state
    const dropdownButton = document.querySelector(`[data-id="${id}"] .${styles.customDropdown}`) as HTMLElement;
    if (dropdownButton) {
      dropdownButton.setAttribute('data-type', 'down');
    }
  };

  const handleUndo = useCallback(() => {
    if (elements.length === 0 || cursorIndex === 0) return;

    const newElements = [...elements];
    newElements.splice(cursorIndex - 1, 1); // Remove the element at the current cursor position
    const newCursorIndex = Math.max(0, cursorIndex - 1);

    updateElements(newElements, newCursorIndex);
  }, [elements, cursorIndex, updateElements]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.NEW_FIELD}`) && !target.closest(`.${styles.NEW_FnFx}`)) {
        const allOptionContainers = document.querySelectorAll(`.${styles.optionsContainer}`);
        allOptionContainers.forEach((container: any) => {
          (container as any).style.display = 'none';
        });
        const allDropdowns = document.querySelectorAll(`.${styles.customDropdown}`);
        allDropdowns.forEach((dropdown: any) => {
          dropdown.setAttribute('data-type', 'down');
        });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [styles]);


  return (
    <div>
      <div
        ref={contentEditable}
        contentEditable
        suppressContentEditableWarning
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={{ border: '1px solid black', minHeight: '100px', padding: '10px' }}
      >
        {renderElements()}
      </div>
      <button onClick={handleNewField}>Add New Field</button>
      <button onClick={handleFnFX}>Add Function</button>
      <button onClick={handleUndo}>Undo</button>
      <div>Cursor Index: {cursorIndex}</div>
    </div>
  );
};

export default AdvancedFormulaEditor;

