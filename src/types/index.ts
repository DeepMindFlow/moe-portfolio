export interface Project {
  id: string
  num: string
  year: string
  title: string
  description: string
  tags: string[]
  href: string
  featured?: boolean
  // CSS gradient string used as the hover preview "image"
  previewGradient: string
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
