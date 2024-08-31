import axios from 'axios';

import { getCache, hasCache, setCache } from '@/Functions/Cache';

import type { SchemaType } from '@/Definitions/SchemaType';

export async function getSchemaData(): Promise<SchemaType> {
    try {
        if (hasCache("schema")) {
            return getCache("schema")
        } else {
            const response = await axios.get(`https://api.vndb.org/kana/schema`);

            setCache("schema", response.data)
            return response.data;
        }
    } catch (error) {
        console.error("Failed to fetch Schema data", error);
        throw new Error("Failed to fetch Schema data");
    }
}
