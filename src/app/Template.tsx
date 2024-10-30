"use client"

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDownIcon } from 'lucide-react'

const templates = [
  { id: 'linkedin2', name: 'LinkedIn: 직무를 강조하는 템플릿', path: '/form/linkedin2' },
  { id: 'linkedin1', name: 'LinkedIn: 재직기간이 있는 템플릿', path: '/form/linkedin1' },
  { id: 'insta_special', name: 'Instagram: 컬러풀한 템플릿', path: '/form/insta_special' },
  { id: 'insta1', name: 'Instagram: 깔끔한 템플릿', path: '/form/insta1' },
]

export default function ChooseTemplate() {
  const router = useRouter()
  const pathname = usePathname()

  const defaultTemplate = templates.find(template => template.path === pathname)?.id || ""

  const navigateToPage = (path: string) => {
    router.replace(path)
  }

  return (
    <div className="relative gap-4 flex m-8 justify-center border bg-gray-800 border-gray-400 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline">
      <select 
        defaultValue={defaultTemplate}
        onChange={(e) => {
          const selectedTemplate = templates.find(template => template.id === e.target.value)
          if (selectedTemplate) navigateToPage(selectedTemplate.path)
        }}
        className="flex appearance-none bg-gray-800"
      >
        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="flex items-end" />
    </div>
  )
}