import { IQuery } from './query.interface'

export interface IFormData {
  id: string
  question: string
  answer: string
  query?: IQuery
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
