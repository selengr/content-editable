"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Send, X } from "lucide-react"
import { createPortal } from "react-dom"

interface DropdownItem {
  id: string
  value: string
  options: string[]
  placeholder: string
}

export default function AdvancedTextareaEditor() {
  const [dropdowns, setDropdowns] = useState<DropdownItem[]>([])
  const [dropdownCounter, setDropdownCounter] = useState(0)
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorContent, setEditorContent] = useState("")

  // Add dropdown at current cursor position
  const addDropdown = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || !editorRef.current) return

    const newDropdown: DropdownItem = {
      id: `dropdown-${dropdownCounter}`,
      value: "",
      options: ["Option 1", "Option 2", "Option 3", "Custom Option A", "Custom Option B"],
      placeholder: "Select option",
    }

    setDropdowns((prev) => [...prev, newDropdown])

    // Create dropdown container
    const dropdownContainer = document.createElement("span")
    dropdownContainer.className = "dropdown-container"
    dropdownContainer.setAttribute("data-dropdown-id", newDropdown.id)
    dropdownContainer.contentEditable = "false"
    dropdownContainer.style.cssText = `
      display: inline-block;
      margin: 0 2px;
      vertical-align: middle;
    `

    // Insert at cursor position
    const range = selection.getRangeAt(0)
    range.deleteContents()
    range.insertNode(dropdownContainer)

    // Move cursor after dropdown
    range.setStartAfter(dropdownContainer)
    range.setEndAfter(dropdownContainer)
    selection.removeAllRanges()
    selection.addRange(range)

    setDropdownCounter((prev) => prev + 1)
    editorRef.current.focus()
  }, [dropdownCounter])

  // Update dropdown value
  const updateDropdownValue = useCallback((dropdownId: string, value: string) => {
    setDropdowns((prev) => prev.map((dropdown) => (dropdown.id === dropdownId ? { ...dropdown, value } : dropdown)))
  }, [])

  // Remove dropdown
  const removeDropdown = useCallback((dropdownId: string) => {
    setDropdowns((prev) => prev.filter((d) => d.id !== dropdownId))

    // Remove from DOM
    if (editorRef.current) {
      const dropdownElement = editorRef.current.querySelector(`[data-dropdown-id="${dropdownId}"]`)
      if (dropdownElement) {
        dropdownElement.remove()
      }
    }
  }, [])

  // Handle keydown for deletion
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        const selection = window.getSelection()
        if (!selection || !editorRef.current) return

        const range = selection.getRangeAt(0)
        const { startContainer, startOffset } = range

        // Check if we're about to delete a dropdown
        if (e.key === "Backspace") {
          const prevSibling =
            startContainer.nodeType === Node.TEXT_NODE
              ? startOffset === 0
                ? startContainer.previousSibling
                : null
              : startContainer.previousSibling

          if (prevSibling && (prevSibling as Element).classList?.contains("dropdown-container")) {
            e.preventDefault()
            const dropdownId = (prevSibling as Element).getAttribute("data-dropdown-id")
            if (dropdownId) {
              removeDropdown(dropdownId)
            }
            return
          }
        }

        if (e.key === "Delete") {
          const nextSibling =
            startContainer.nodeType === Node.TEXT_NODE
              ? startOffset === startContainer.textContent?.length
                ? startContainer.nextSibling
                : null
              : startContainer.nextSibling

          if (nextSibling && (nextSibling as Element).classList?.contains("dropdown-container")) {
            e.preventDefault()
            const dropdownId = (nextSibling as Element).getAttribute("data-dropdown-id")
            if (dropdownId) {
              removeDropdown(dropdownId)
            }
            return
          }
        }
      }
    },
    [removeDropdown],
  )

  // Handle input changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.textContent || "")
    }
  }, [])

  // Render dropdowns inside the editor
  const renderDropdowns = useCallback(() => {
    if (!editorRef.current) return null

    return dropdowns.map((dropdown) => {
      const container = editorRef.current?.querySelector(`[data-dropdown-id="${dropdown.id}"]`)
      if (!container) return null

      return createPortal(
        <div className="inline-flex items-center gap-1 bg-white border border-gray-300 rounded-md p-1 shadow-sm">
          <Select value={dropdown.value} onValueChange={(value) => updateDropdownValue(dropdown.id, value)}>
            <SelectTrigger className="w-auto min-w-[120px] h-7 border-none bg-transparent shadow-none p-1 text-sm">
              <SelectValue placeholder={dropdown.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {dropdown.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-red-100"
            onClick={() => removeDropdown(dropdown.id)}
          >
            <X className="h-3 w-3 text-red-500" />
          </Button>
        </div>,
        container,
      )
    })
  }, [dropdowns, updateDropdownValue, removeDropdown])

  // Generate final form data
  const generateFormData = useCallback(() => {
    if (!editorRef.current) return { content: "", dropdowns: [] }

    let finalText = ""
    const dropdownData: Array<{ id: string; value: string; position: number }> = []

    const walker = document.createTreeWalker(editorRef.current, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
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
          const value = dropdown?.value || `[${dropdown?.placeholder || "Unselected"}]`
          dropdownData.push({
            id: dropdownId,
            value: dropdown?.value || "",
            position: finalText.length,
          })
          finalText += value
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
      alert(
        `Form submitted!\n\nFinal Content: ${formData.content}\n\nDropdowns: ${JSON.stringify(formData.dropdowns, null, 2)}`,
      )
    },
    [generateFormData],
  )

  // Add placeholder styling
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current
      const updatePlaceholder = () => {
        const hasText = editor.textContent?.trim() !== ""
        const hasDropdowns = editor.querySelectorAll(".dropdown-container").length > 0

        if (!hasText && !hasDropdowns) {
          editor.setAttribute("data-empty", "true")
        } else {
          editor.removeAttribute("data-empty")
        }
      }

      updatePlaceholder()
      editor.addEventListener("input", updatePlaceholder)

      return () => editor.removeEventListener("input", updatePlaceholder)
    }
  }, [dropdowns])

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Advanced Inline Content Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Inline Editor */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Content Editor</Label>
                <Button type="button" onClick={addDropdown} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Dropdown
                </Button>
              </div>

              <Card className="p-4 min-h-[300px] bg-white border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors">
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  className="min-h-[250px] focus:outline-none leading-relaxed text-gray-900 relative"
                  style={{
                    lineHeight: "2.5",
                    fontSize: "14px",
                  }}
                />
                {renderDropdowns()}

                <style jsx>{`
                  [contenteditable][data-empty="true"]:before {
                    content: "Start typing your content here...";
                    color: #9ca3af;
                    pointer-events: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                  }
                `}</style>
              </Card>

              <p className="text-sm text-muted-foreground">
                Use <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Backspace</kbd> or{" "}
                <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Delete</kbd> to remove text or dropdowns.
                Dropdowns are now fully interactive within the text!
              </p>
            </div>

            {/* Live Preview */}
            <div className="space-y-2">
              <Label>Live Preview</Label>
              <Card className="p-4 bg-gray-50">
                <div className="text-sm leading-relaxed">{generateFormData().content}</div>
              </Card>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <Card className="p-3">
                <div className="text-2xl font-bold text-blue-600">{dropdowns.length}</div>
                <div className="text-sm text-muted-foreground">Dropdowns</div>
              </Card>
              <Card className="p-3">
                <div className="text-2xl font-bold text-green-600">{generateFormData().content.length}</div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </Card>
              <Card className="p-3">
                <div className="text-2xl font-bold text-purple-600">{dropdowns.filter((d) => d.value).length}</div>
                <div className="text-sm text-muted-foreground">Selected</div>
              </Card>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg">
              <Send className="h-4 w-4 mr-2" />
              Submit Form
            </Button>
          </form>

          {/* Final Output Data */}
          <details className="text-sm">
            <summary className="cursor-pointer font-medium mb-2">Final Output Data</summary>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-60">
              {JSON.stringify(generateFormData(), null, 2)}
            </pre>
          </details>
        </CardContent>
      </Card>
    </div>
  )
}
