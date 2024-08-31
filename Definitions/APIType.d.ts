export interface APIType {
    filters?: any[],
    fields: string
    sort?: string
    reverse?: boolean
    results?: number | string
    page?: number
}