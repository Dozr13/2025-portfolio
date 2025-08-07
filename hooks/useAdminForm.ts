"use client"

import { useCallback, useState } from "react"

interface UseAdminFormOptions<T> {
  initialData: T
  onSubmit: (data: T) => Promise<void>
  validateData?: (data: T) => string | null
}

export function useAdminForm<T>({
  initialData,
  onSubmit,
  validateData
}: UseAdminFormOptions<T>) {
  const [formData, setFormData] = useState<T>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateField = useCallback((field: keyof T, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    updateField(name as keyof T, type === "checkbox" ? (e.target as HTMLInputElement).checked : value)
  }, [updateField])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate if validation function provided
    if (validateData) {
      const validationError = validateData(formData)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    setLoading(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Form submission error:", error)
      setError(error instanceof Error ? error.message : "Failed to submit form")
    } finally {
      setLoading(false)
    }
  }, [formData, onSubmit, validateData])

  const resetForm = useCallback(() => {
    setFormData(initialData)
    setError(null)
    setLoading(false)
  }, [initialData])

  return {
    formData,
    setFormData,
    updateField,
    handleChange,
    handleSubmit,
    resetForm,
    loading,
    error,
    setError
  }
}
