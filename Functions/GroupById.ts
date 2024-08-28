import type { VNScreenshotType } from "@/Definitions/VNType";

export default function groupScreenshotsByTitle(data: VNScreenshotType[]): { [title: string]: VNScreenshotType[] } {
    const groupedData: { [title: string]: VNScreenshotType[] } = {};

    data.forEach(item => {
        const title = item.release?.title ?? "";
        if (groupedData[title]) {
            groupedData[title]!.push(item);
        } else {
            groupedData[title] = [item];
        }
    });

    return groupedData;
}
