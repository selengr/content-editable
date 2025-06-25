"use client"

import { useCallback } from "react"

interface DropdownItem {
  id: string
  value: string
  unique_name: string
  placeholder: string
}

interface UseFormValidationProps {
  setValidationErrors: (errors: string[]) => void
}

export function useFormValidation({ setValidationErrors }: UseFormValidationProps) {
  const validateAndHandleErrors = useCallback(
    (unselectedDropdowns: DropdownItem[]): boolean => {
      if (unselectedDropdowns.length > 0) {
        // Set validation errors
        setValidationErrors(unselectedDropdowns.map((d) => d.id))

    
        // Scroll to first unselected dropdown
        const firstUnselected = document.querySelector(`[data-dropdown-id="${unselectedDropdowns[0].id}"]`)
        if (firstUnselected) {
          firstUnselected.scrollIntoView({ behavior: "smooth", block: "center" })
        }

        return false // Validation failed
      }

      // Clear validation errors if all are selected
      setValidationErrors([])
      return true // Validation passed
    },
    [setValidationErrors],
  )

  const showSuccessMessage = useCallback(() => {
    alert("فرم با موفقیت ارسال شد!")
  }, [])

  return {
    validateAndHandleErrors,
    showSuccessMessage,
  }
}
