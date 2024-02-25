export interface APIType {
    filters?: string[],
    fields: string
    sort?: string
    reverse?: boolean
    results?: number
    page?: number
}