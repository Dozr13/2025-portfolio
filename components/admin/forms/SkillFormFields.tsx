'use client'

import { Icon, IconName } from '@/components/ui/Icon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'

import { AdminFormSection } from './AdminFormSection'
import { FormCheckbox, FormField, FormInput, FormTextarea } from './FormField'

interface SkillFormData {
  name: string
  category: string
  level: string
  years: string
  description: string
  icon: string
  featured: boolean
  order: string
}

interface SkillFormFieldsProps {
  formData: SkillFormData
  onChange: (field: keyof SkillFormData, value: string | boolean) => void
  showPreview?: boolean
}

export const skillCategories = [
  { value: 'FRONTEND', label: 'Frontend' },
  { value: 'BACKEND', label: 'Backend' },
  { value: 'DATABASE', label: 'Database' },
  { value: 'DEVOPS', label: 'DevOps' },
  { value: 'TOOLS', label: 'Tools' },
  { value: 'DESIGN', label: 'Design' },
  { value: 'SOFT_SKILLS', label: 'Soft Skills' }
]

export const skillLevels = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
  { value: 'EXPERT', label: 'Expert' }
]

export const availableIcons = [
  { value: 'code', label: 'Code (Generic)' },
  { value: 'atom', label: 'React' },
  { value: 'triangle', label: 'Next.js' },
  { value: 'code-2', label: 'JavaScript' },
  { value: 'server', label: 'Server/Backend' },
  { value: 'database', label: 'Database' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'container', label: 'Docker' },
  { value: 'git-branch', label: 'Git' },
  { value: 'smartphone', label: 'Mobile' },
  { value: 'layers', label: 'Layers/Vue' },
  { value: 'layers-3', label: 'Prisma' },
  { value: 'zap', label: 'Fast/Svelte' },
  { value: 'share-2', label: 'GraphQL' },
  { value: 'workflow', label: 'CI/CD' },
  { value: 'figma', label: 'Figma' },
  { value: 'paintbrush', label: 'Design' },
  { value: 'palette', label: 'Colors/CSS' }
]

export const SkillFormFields = ({
  formData,
  onChange,
  showPreview = false
}: SkillFormFieldsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    onChange(
      name as keyof SkillFormData,
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    )
  }

  return (
    <>
      <AdminFormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Skill Name" required>
            <FormInput
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., React, Python, Docker"
              required
            />
          </FormField>

          <FormField label="Category" required>
            <Select
              value={formData.category}
              onValueChange={(value) => onChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {skillCategories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Skill Level" required>
            <Select value={formData.level} onValueChange={(value) => onChange('level', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                {skillLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Years of Experience">
            <FormInput
              type="number"
              name="years"
              value={formData.years}
              onChange={handleChange}
              min="0"
              max="50"
              placeholder="e.g., 3"
            />
          </FormField>

          <FormField label="Icon">
            <Select value={formData.icon} onValueChange={(value) => onChange('icon', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-icon">No icon</SelectItem>
                {availableIcons.map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    <div className="flex items-center gap-2">
                      <Icon name={icon.value as IconName} size="sm" />
                      {icon.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField label="Display Order">
            <FormInput
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              min="0"
              placeholder="e.g., 1 (lower = shows first)"
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField label="Description">
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of your experience with this skill"
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormCheckbox
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            label="Featured skill (show prominently)"
          />
        </div>
      </AdminFormSection>

      {/* Preview */}
      {showPreview && (formData.name || formData.icon) && (
        <AdminFormSection title="Preview">
          <div className="bg-background border border-border rounded-lg p-4 max-w-sm">
            <div className="flex items-start gap-3">
              {formData.icon && formData.icon !== 'no-icon' && (
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={formData.icon as IconName} size="sm" className="text-primary" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{formData.name || 'Skill Name'}</h4>
                  {formData.featured && (
                    <div className="w-2 h-2 bg-primary rounded-full" title="Featured skill" />
                  )}
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {formData.category.replace('_', ' ')}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    {formData.level}
                  </span>
                </div>
                {formData.years && (
                  <p className="text-sm text-muted-foreground">{formData.years} years experience</p>
                )}
                {formData.description && (
                  <p className="text-sm text-muted-foreground mt-2">{formData.description}</p>
                )}
              </div>
            </div>
          </div>
        </AdminFormSection>
      )}
    </>
  )
}

export type { SkillFormData }
