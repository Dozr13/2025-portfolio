'use client'

import { AdminFormSection } from './AdminFormSection'
import { FormCheckbox, FormField, FormInput, FormSelect, FormTextarea } from './FormField'

interface ProjectFormData {
  title: string
  slug: string
  description: string
  longDescription: string
  category: string
  status: string
  featured: boolean
  demoUrl: string
  githubUrl: string
  client: string
  teamSize: string
  role: string
  order: string
}

interface ProjectFormFieldsProps {
  formData: ProjectFormData
  onChange: (field: keyof ProjectFormData, value: string | boolean) => void
}

export const projectCategories = [
  { value: 'WEB_APP', label: 'Web Application' },
  { value: 'MOBILE_APP', label: 'Mobile Application' },
  { value: 'DESKTOP_APP', label: 'Desktop Application' },
  { value: 'API', label: 'API/Backend' },
  { value: 'LIBRARY', label: 'Library/Package' },
  { value: 'TOOL', label: 'Tool/Utility' },
  { value: 'OTHER', label: 'Other' }
]

export const projectStatuses = [
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'PLANNED', label: 'Planned' },
  { value: 'ON_HOLD', label: 'On Hold' }
]

export const ProjectFormFields = ({ formData, onChange }: ProjectFormFieldsProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    onChange(
      name as keyof ProjectFormData,
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    )
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    onChange('title', title)
    onChange('slug', slug)
  }

  return (
    <>
      <AdminFormSection title="Basic Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Project Title" required>
            <FormInput
              name="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Enter project title"
              required
            />
          </FormField>

          <FormField label="Slug" required>
            <FormInput
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="project-url-slug"
              required
            />
          </FormField>

          <FormField label="Category" required>
            <FormSelect
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={projectCategories}
              required
            />
          </FormField>

          <FormField label="Status" required>
            <FormSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={projectStatuses}
              required
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField label="Short Description" required>
            <FormTextarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description of the project"
              required
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField label="Detailed Description">
            <FormTextarea
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows={6}
              placeholder="Detailed project description, features, technologies used, etc."
            />
          </FormField>
        </div>
      </AdminFormSection>

      <AdminFormSection title="Links & URLs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Demo URL">
            <FormInput
              type="url"
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              placeholder="https://project-demo.com"
            />
          </FormField>

          <FormField label="GitHub URL">
            <FormInput
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
            />
          </FormField>
        </div>
      </AdminFormSection>

      <AdminFormSection title="Project Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField label="Client">
            <FormInput
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Client name"
            />
          </FormField>

          <FormField label="Team Size">
            <FormInput
              type="number"
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              placeholder="1"
              min="1"
            />
          </FormField>

          <FormField label="Display Order">
            <FormInput
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              placeholder="1"
              min="1"
            />
          </FormField>
        </div>

        <div className="mt-6">
          <FormField label="Your Role">
            <FormInput
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Full Stack Developer, Frontend Developer, etc."
            />
          </FormField>
        </div>
      </AdminFormSection>

      <AdminFormSection title="Settings">
        <FormCheckbox
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          label="Featured Project"
          help="Will be displayed prominently on homepage"
        />
      </AdminFormSection>
    </>
  )
}

export type { ProjectFormData }
