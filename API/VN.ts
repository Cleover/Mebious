import axios from 'axios';
import type { VNResponseType } from '@/Definitions/VNType';
import type { APIType } from '@/Definitions/APIType';

export async function getVisualNovelData(
    { filters, fields, sort, reverse, results, page = 1 }: APIType,
    fetchAll: boolean = false
): Promise<VNResponseType> {
    try {
        const requestData = Object.fromEntries(
            Object.entries({ filters, fields, sort, reverse, results, page }).filter(([_, v]) => v !== undefined)
        );

        console.log(`Fetching VN data for query (Page: ${page}):\n${JSON.stringify(requestData["filters"] ?? requestData["sort"])}`)

        const response = await axios.post(`https://api.vndb.org/kana/vn`, requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (fetchAll && response.data.more) {
            const nextData = await getVisualNovelData(
                { filters, fields, sort, reverse, results, page: page + 1 } as APIType,
                fetchAll
            );
            return {
                results: [...response.data.results, ...nextData.results],
                more: nextData.more
            };
        } else {
            return response.data;
        }
    } catch (error) {
        console.error("Failed to fetch VN data", error);
        throw new Error("Failed to fetch VN data");
    }
}
