import axios from 'axios';
import type { ReleaseResponseType } from '@/Definitions/ReleaseType';
import type { APIType } from '@/Definitions/APIType';

export async function getReleasesData(
    { filters, fields, sort, reverse, results, page = 1 }: APIType,
    fetchAll: boolean = false
): Promise<ReleaseResponseType> {
    try {
        const requestData = Object.fromEntries(
            Object.entries({ filters, fields, sort, reverse, results, page }).filter(([_, v]) => v !== undefined)
        );

        console.log(`Fetching Releases data for query (Page: ${page}):\n${JSON.stringify(requestData["filters"] ?? requestData["sort"])}`)

        const response = await axios.post(`https://api.vndb.org/kana/release`, requestData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (fetchAll && response.data.more) {
            const nextData = await getReleasesData(
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
        console.error("Failed to fetch Releases data", error);
        throw new Error("Failed to fetch Releases data");
    }
}
