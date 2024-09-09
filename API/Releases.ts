import axios from 'axios';
const hash = require('object-hash');

import { getCache, hasCache, setCache } from '@/Functions/Cache';

import type { ReleaseResponseType } from '@/Definitions/ReleaseType';
import type { APIType } from '@/Definitions/APIType';

export async function getReleasesData(
    { filters, fields, sort, reverse, results, page = 1 }: APIType,
    fetchAll: boolean
): Promise<ReleaseResponseType> {
    try {
        const requestData = Object.fromEntries(
            Object.entries({ filters, fields, sort, reverse, results, page }).filter(([_, v]) => v !== undefined)
        );

        const apiHash = hash(requestData)

        if (hasCache(apiHash)) {
            console.log(`Fetching Releases data for query (Page: ${page}):\n${JSON.stringify(requestData["filters"] ?? requestData["sort"])}`)
            return getCache(apiHash);
        } else {
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
                setCache(apiHash, response.data);
                return response.data;
            }
        }



    } catch (error) {
        console.error("Failed to fetch Releases data", error);
        throw new Error("Failed to fetch Releases data");
    }
}
