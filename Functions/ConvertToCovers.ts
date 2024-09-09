import type { CoverType } from "@/Definitions/CoverType";
import type { ReleaseDataType } from "@/Definitions/ReleaseType";
import type { VNDataType } from "@/Definitions/VNType";

export const releasesToCovers = (data: ReleaseDataType[]) => {
    const coverMap: { [key: string]: CoverType } = {};

    data.forEach((release) => {
        release.images?.forEach((image) => {
            if (image.id) {
                if (image.type === 'pkgfront' || image.type === 'dig') {
                    if (!coverMap[image.id]) {
                        coverMap[image.id] = {
                            id: image.id,
                            ...(image.url && { url: image.url }),
                            ...(image.violence && { violence: image.violence }),
                            ...(image.sexual && { sexual: image.sexual }),
                            ...(image.thumbnail && { thumbnail: image.thumbnail }),
                            ...(image.thumbnail_dims && { thumbnail_dims: image.thumbnail_dims }),
                            info: [{
                                id: release.id,
                                ...(release.title && { title: release.title }),
                            }],
                        };
                    } else {
                        coverMap[image.id]!.info.push({
                            id: release.id,
                            ...(release.title && { title: release.title }),
                        });
                    }
                }
            }
        });
    });

    return Object.values(coverMap);
}

export const vnsToCovers = (data: VNDataType[]) => {
    return data.map((vnData) => {
        return {
            id: vnData.image?.id,
            ...(vnData.image?.url && { url: vnData.image?.url }),
            ...(vnData.image?.violence && { violence: vnData.image?.violence }),
            ...(vnData.image?.sexual && { sexual: vnData.image?.sexual }),
            ...(vnData.image?.thumbnail && { thumbnail: vnData.image?.thumbnail }),
            ...(vnData.image?.thumbnail_dims && { thumbnail_dims: vnData.image?.thumbnail_dims }),
            info: [{
                id: vnData.id,
                ...(vnData.title && { title: vnData.title }),
            }],
        }
    })
}
