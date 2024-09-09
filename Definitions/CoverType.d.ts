import { VNImageType } from "@/Definitions/VNType"

export interface CoverType extends VNImageType {
    info: CoverInfo[],
}

export interface CoverInfo {
    id: string,
    title?: string,
}