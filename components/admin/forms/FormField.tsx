"use client"

import { ReactNode } from "react"

interface FormFieldProps {
  label: string
  required?: boolean
  children: ReactNode
  className?: string
  help?: string
}

export function FormField({ label, required = false, children, className = "", help }: FormFieldProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium mb-2">
        {label} {required && "*"}
      </label>
      {children}
      {help && (
        <p className="text-xs text-muted-foreground mt-1">{help}</p>
      )}
    </div>
  )
}

interface FormInputProps {
  type?: string
  name?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  min?: string | number
  max?: string | number
  className?: string
}

export function FormInput({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  min,
  max,
  className = ""
}: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      min={min}
      max={max}
      className={`w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
    />
  )
}

interface FormTextareaProps {
  name?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  required?: boolean
  className?: string
}

export function FormTextarea({
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  className = ""
}: FormTextareaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
    />
  )
}

interface FormSelectProps {
  name?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  required?: boolean
  className?: string
}

export function FormSelect({
  name,
  value,
  onChange,
  options,
  required = false,
  className = ""
}: FormSelectProps) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

interface FormCheckboxProps {
  id: string
  name?: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  help?: string
}

export function FormCheckbox({ id, name, checked, onChange, label, help }: FormCheckboxProps) {
  return (
    <div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="rounded border-border focus:ring-primary/50"
        />
        <span className="text-sm font-medium">{label}</span>
      </label>
      {help && (
        <p className="text-xs text-muted-foreground mt-1 ml-6">{help}</p>
      )}
    </div>
  )
}
