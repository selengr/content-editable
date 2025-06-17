"use client"

import { useState } from "react"
import AdvancedTextareaEditor from "@/components/AdvancedTextareaEditor/advanced-textarea-editor"


const sampleInitialData = {
content : "hiعددیrezaچند گزینه تک انتخاب",
contentWithIds : "hi{#q_102}reza{#q_105}",
  dropdowns: [
    {
      id: "dropdown-0",
      value: "عددی",
      unique_name: "{#q_102}",
      position: 2,
    },
    {
      id: "dropdown-1",
      value: "چند گزینه تک انتخاب",
      unique_name: "{#q_105}",
      position: 10
    },
  ],
}

export default function Page() {
  const [editMode, setEditMode] = useState(false)


  return (
    <div className="p-6">
      <div className="mb-4 space-x-4">
        <button
          onClick={() => setEditMode(false)}
          className={`px-4 py-2 rounded ${!editMode ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          New Mode
        </button>
        <button
          onClick={() => setEditMode(true)}
          className={`px-4 py-2 rounded ${editMode ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Edit Mode
        </button>
      </div>

      <AdvancedTextareaEditor initialData={editMode ? sampleInitialData : undefined}  />

    </div>
  )
}
