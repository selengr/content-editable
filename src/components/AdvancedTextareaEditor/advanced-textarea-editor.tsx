"use client";

import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";

import { createPortal } from "react-dom";
import JSONData from '../../../public/assets/fake-data/response_v1.json'
import styles from '@/sections/calculator/advancedFormulaEditor.module.css'

interface DropdownItem {
  id: string;
  value: string;
//   options: string[];
  placeholder: string;
}

export default function AdvancedTextareaEditor() {
  const [dropdowns, setDropdowns] = useState<DropdownItem[]>([]);
  const [dropdownCounter, setDropdownCounter] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState("");
  const [textContent, setTextContent] = useState("")

  // Add dropdown at current cursor position
  const addDropdown = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;

    const newDropdown: DropdownItem = {
      id: `dropdown-${dropdownCounter}`,
      value: "",
      placeholder: "انتخاب كنيد",
    };

    setDropdowns((prev) => [...prev, newDropdown]);

    const dropdownContainer = document.createElement("span");
    dropdownContainer.className = "dropdown-container";
    dropdownContainer.setAttribute("data-dropdown-id", newDropdown.id);
    dropdownContainer.contentEditable = "false";
    dropdownContainer.style.cssText = `
      display: inline-block;
      margin: 0 2px;
      vertical-align: middle;
    `;

    // Insert at cursor position
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(dropdownContainer);

    // Move cursor after dropdown
    range.setStartAfter(dropdownContainer);
    range.setEndAfter(dropdownContainer);
    selection.removeAllRanges();
    selection.addRange(range);

    setDropdownCounter((prev) => prev + 1);
    editorRef.current.focus();
  }, [dropdownCounter]);

  // Update dropdown value
  const updateDropdownValue = useCallback(
    (dropdownId: string, value: string) => {
      setDropdowns((prev) =>
        prev.map((dropdown) =>
          dropdown.id === dropdownId ? { ...dropdown, value } : dropdown
        )
      );
      
      const optionsContainer = document.querySelector(`[data-id="${dropdownId}"] .${styles.optionsContainer}`) as HTMLElement;
    if (optionsContainer) {
      optionsContainer.style.display = 'none';
    }

    const dropdownButton = document.querySelector(`[data-id="${dropdownId}"] .${styles.customDropdown}`) as HTMLElement;
    if (dropdownButton) {
      dropdownButton.setAttribute('data-type', 'down');
    }
    },
    []
  );


  // Remove dropdown
  const removeDropdown = useCallback((dropdownId: string) => {
    setDropdowns((prev) => prev.filter((d) => d.id !== dropdownId));

    // Remove from DOM
    if (editorRef.current) {
      const dropdownElement = editorRef.current.querySelector(
        `[data-dropdown-id="${dropdownId}"]`
      );
      if (dropdownElement) {
        dropdownElement.remove();
      }
    }
  }, []);

  // Handle keydown for deletion
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        const selection = window.getSelection();
        if (!selection || !editorRef.current) return;

        const range = selection.getRangeAt(0);
        const { startContainer, startOffset } = range;

        // Check if we're about to delete a dropdown
        if (e.key === "Backspace") {
          const prevSibling =
            startContainer.nodeType === Node.TEXT_NODE
              ? startOffset === 0
                ? startContainer.previousSibling
                : null
              : startContainer.previousSibling;

          if (
            prevSibling &&
            (prevSibling as Element).classList?.contains("dropdown-container")
          ) {
            e.preventDefault();
            const dropdownId = (prevSibling as Element).getAttribute(
              "data-dropdown-id"
            );
            if (dropdownId) {
              removeDropdown(dropdownId);
            }
            return;
          }
        }

        if (e.key === "Delete") {
          const nextSibling =
            startContainer.nodeType === Node.TEXT_NODE
              ? startOffset === startContainer.textContent?.length
                ? startContainer.nextSibling
                : null
              : startContainer.nextSibling;

          if (
            nextSibling &&
            (nextSibling as Element).classList?.contains("dropdown-container")
          ) {
            e.preventDefault();
            const dropdownId = (nextSibling as Element).getAttribute(
              "data-dropdown-id"
            );
            if (dropdownId) {
              removeDropdown(dropdownId);
            }
            return;
          }
        }
      }
    },
    [removeDropdown]
  );

  // Handle input changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.textContent || "")
    }
  }, [])

  const handleDropdownClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const optionsContainer = (e.target as HTMLElement).nextElementSibling as HTMLElement;
    const isHidden = optionsContainer.style.display === 'none';
    optionsContainer.style.display = isHidden ? 'block' : 'none';
    (e.target as HTMLElement).setAttribute('data-type', isHidden ? 'up' : 'down');
  };

  

  //new
  const renderDropdowns = useCallback(() => {
    if (!editorRef.current) return null;

    return dropdowns.map((dropdown) => {
      const container = editorRef.current?.querySelector(
        `[data-dropdown-id="${dropdown.id}"]`
      );
      if (!container) return null;


      return createPortal(
        <div className="flex justify-center items-center gap-1 bg-white rounded-md p-1 shadow-sm">
        <div
        key={dropdown.id}
        data-id={dropdown.id}
        contentEditable={false}
        className={`${styles.dynamicbtn} ${styles.NEW_FIELD}`}
        data-type="NEW_FIELD"
      >
        <div
          className={styles.customDropdown}
          data-type="down"
          onClick={(e) => handleDropdownClick(e, dropdown.id!)}
        >
          {dropdown.value.length > 0 ?dropdown.value: dropdown.placeholder}
        </div>
        <div className={styles.optionsContainer} style={{ display: 'none' }}>
          {JSONData.dataList.map((item: any) => (
            <div
              key={item.extMap.UNIC_NAME}
              className={styles.option}
            //   onClick={() => handleOptionClick(item, dropdown.id!)}
              onClick={(e) => updateDropdownValue(dropdown.id, item.caption)}
            >
              {item.caption}
            </div>
          ))}
        </div>
      </div>
      </div>,
        container
      );

      
    });
  }, [dropdowns, updateDropdownValue, removeDropdown]);

  // Generate final form data
  const generateFormData = useCallback(() => {
    if (!editorRef.current) return { content: "", dropdowns: [] }

    let finalText = ""
    const dropdownData: Array<{ id: string; value: string; position: number }> = []

    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Skip text inside dropdown containers
          let parent = node.parentNode
          while (parent && parent !== editorRef.current) {
            if ((parent as Element).classList?.contains("dropdown-container")) {
              return NodeFilter.FILTER_REJECT
            }
            parent = parent.parentNode
          }
          return NodeFilter.FILTER_ACCEPT
        }
        if (node.nodeType === Node.ELEMENT_NODE && (node as Element).classList.contains("dropdown-container")) {
          return NodeFilter.FILTER_ACCEPT
        }
        return NodeFilter.FILTER_SKIP
      },
    })

    let node
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
        finalText += node.textContent
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element
        const dropdownId = element.getAttribute("data-dropdown-id")
        if (dropdownId) {
          const dropdown = dropdowns.find((d) => d.id === dropdownId)
          const selectedValue = dropdown?.value || `[${dropdown?.placeholder || "Unselected"}]`
          dropdownData.push({
            id: dropdownId,
            value: dropdown?.value || "",
            position: finalText.length,
          })
          finalText += selectedValue
        }
      }
    }

    return {
      content: finalText,
      dropdowns: dropdownData,
    }
  }, [dropdowns])

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const formData = generateFormData()
      console.log("Form Data:", formData)
    //   alert(
    //     `Form submitted!\n\nFinal Content: ${formData.content}\n\nDropdowns: ${JSON.stringify(formData.dropdowns, null, 2)}`,
    //   )
    },
    [generateFormData],
  )



  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-row-reverse pt-32">
          <div className="flex flex-col justify-center items-center">
            <span className="text-[#393939] text-sm">:نمایش بده</span>
            <button type="button" onClick={addDropdown} className="w-20 h-8 text-[#1758BA] bg-[#E8EEF8] rounded-md font-medium text-xs m-2">
              افزودن متغییر
            </button>
          </div>

          <div
            dir="rtl"
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            className="min-h-[110px] focus:outline-none w-full leading-relaxed text-gray-900 relative rounded-lg px-4 py-2 border-[1px] border-[#DDE1E6]"
            style={{
              lineHeight: "2.5",
              fontSize: "14px",
            }}
          />
          {renderDropdowns()}
        </div>
        <div className="text-sm leading-relaxed">
                  {generateFormData().content}
                </div>
        </form>



    </div>
  );
}
