export interface ProjectMetric {
  label: string
  value: string
  percent: number
}

export interface Project {
  id: string
  num: string
  year: string
  title: string
  description: string
  terminalText: string
  tags: string[]
  href: string
  featured?: boolean
  previewGradient: string
  metrics?: ProjectMetric[]
}

export interface Service {
  num: string
  name: string
  tags: string[]
  href: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'