export interface VNResponseType {
  results: VNDataType[],
  more: boolean
}

export interface VNDataType {
  id: string,
  rtype?: string,
  title?: string,
  description?: string,
  votecount?: number,
  rating?: number,
  length_minutes?: number,
  length_votes?: number,
  aliases?: string[],
  developers?: VNDevelopersType[],
  image?: VNImageType,
  tags?: VNTagType[],
  screenshots?: VNScreenshotType[],
  relations?: VNRelationType[]
}

export interface VNDevelopersType {
  id: string,
  name?: string
}

export interface VNImageType {
  url?: string,
  violence?: number,
  sexual?: number
}

export interface VNTagType {
  id: string,
  name?: string,
  category?: string,
  spoiler?: number,
  rating?: number
}

export interface VNScreenshotType {
  thumbnail?: string,
  thumbnail_dims?: any,
  violence?: number,
  sexual?: number,
  release?: ReleaseDataType
}

export interface ReleaseDataType {
  id: string,
  title?: string,
  release?: string
}