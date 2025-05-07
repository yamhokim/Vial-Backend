import { IQuery } from './query.interface'

/** Defines the structure of form data entries
 *  Included optional one-to-one relationship with query
 */
export interface IFormData {
  id: string
  question: string
  answer: string
  query: null | IQuery
}

// Represents paginated form data responses
export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
