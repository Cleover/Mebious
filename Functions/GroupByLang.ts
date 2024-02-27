import type { ReleaseDataType } from "@/Definitions/ReleaseType";

export default function groupByLang(data: ReleaseDataType[]): { [key: string]: ReleaseDataType[] } {
    const groupedData: { [key: string]: ReleaseDataType[] } = {};
    
    data.forEach(item => {
      item.languages!.forEach(langObj => {
        const lang = langObj.lang;
        if (!groupedData[lang]) {
          groupedData[lang] = [];
        }
        groupedData[lang]!.push(item);
      });
    });
    
    return groupedData;
  }