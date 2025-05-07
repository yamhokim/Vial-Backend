export interface IQuery {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  status: 'OPEN' | 'RESOLVED'
  formDataId: string
}
