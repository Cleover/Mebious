import axios from 'axios';
import type { SchemaType } from '@/Definitions/SchemaType';

export async function getSchemaData(): Promise<SchemaType> {
    try {
        const response = await axios.get(`https://api.vndb.org/kana/schema`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch Schema data", error);
        throw new Error("Failed to fetch Schema data");
    }
}
