// Defines the structure of query entries
export interface IQuery {
  id: string
  title: string
  description: string | null
  createdAt: Date
  updatedAt: Date
  status: 'OPEN' | 'RESOLVED'
  formDataId: string
}
