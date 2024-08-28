export interface ReleaseResponseType {
    results: ReleaseDataType[],
    more: boolean
}

export interface ReleaseDataType {
    id: string,
    title?: string,
    alttitle?: string,
    platforms?: string[],
    released?: string,
    minage?: number,
    languages?: LanguageType[],
    voiced?: number,
    resolution?: string | number[],
    patch?: boolean,
    freeware?: boolean,
    uncensored?: boolean,
    official?: boolean,
    has_ero?: boolean,
    notes?: string,
    media?: MediaType[],
    vns?: VNDataType[],
    producers?: ProducerType[],
    gtin?: string,
    catalog?: string,
    extlinks?: ExtlinksType[]
}

export interface LanguageType {
    lang: string,
    title?: string,
    lain?: string
}

export interface MediaType {
    medium?: string,
    qty?: number
}

export interface ExtlinksType {
    label?: string,
    url?: string
}