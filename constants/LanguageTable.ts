const langs: { [key: string]: { "code": string | null, "name": string, "svg"?: string } } = {
    "ar": { "code": "1F1F8-1F1E6", "name": "Arabic" },
    "be": { "code": "1F1E7-1F1FE", "name": "Belarusian" },
    "bg": { "code": "1F1E7-1F1EC", "name": "Bulgarian" },
    "ca": { "code": "1F3F4-E0065-E0073-E0063-E0074-E007F", "name": "Catalan" },
    "ck": { "code": null, "name": "Cherokee" },
    "cs": { "code": "1F1E8-1F1FF", "name": "Czech" },
    "da": { "code": "1F1E9-1F1F0", "name": "Danish" },
    "de": { "code": "1F1E9-1F1EA", "name": "German" },
    "el": { "code": "1F1EC-1F1F7", "name": "Greek" },
    "en": { "code": "1F1EC-1F1E7", "name": "English" },
    "eo": { "code": "1F3F3-FE0F-200D-1F7E9-200D-2B50-200D-1F7E9", "name": "Esperanto" },
    "es": { "code": "1F1EA-1F1F8", "name": "Spanish" },
    "eu": { "code": "1F3F4-E0065-E0073-E0070-E0076-E007F", "name": "Basque" },
    "fa": { "code": "1F1EE-1F1F7", "name": "Persian" },
    "fi": { "code": "1F1EB-1F1EE", "name": "Finnish" },
    "fr": { "code": "1F1EB-1F1F7", "name": "French" },
    "ga": { "code": "1F1EE-1F1EA", "name": "" },
    "gd": { "code": "1F3F4-E0067-E0062-E0073-E0063-E0074-E007F", "name": "Scottish Gaelic" },
    "he": { "code": "1F1EE-1F1F1", "name": "Hebrew" },
    "hi": { "code": "1F1EE-1F1F3", "name": "Hindi" },
    "hr": { "code": "1F1ED-1F1F7", "name": "Croatian" },
    "hu": { "code": "1F1ED-1F1FA", "name": "Hungarian" },
    "id": { "code": "1F1EE-1F1E9", "name": "Indonesian" },
    "it": { "code": "1F1EE-1F1F9", "name": "Italian" },
    "iu": { "code": null, "name": "Inuktitut" },
    "ja": { "code": "1F1EF-1F1F5", "name": "Japanese" },
    "ko": { "code": "1F1F0-1F1F7", "name": "Korean" },
    "la": { "code": "1F1F2-1F1EA", "name": "Latin" },
    "lt": { "code": "1F1F1-1F1F9", "name": "Lithuanian" },
    "lv": { "code": "1F1F1-1F1FB", "name": "Latvian" },
    "mk": { "code": "1F1F2-1F1F0", "name": "Macedonian" },
    "ms": { "code": "1F1F2-1F1FE", "name": "Malay" },
    "nl": { "code": "1F1F3-1F1F1", "name": "Dutch" },
    "no": { "code": "1F1F3-1F1F4", "name": "Norwegian" },
    "pl": { "code": "1F1F5-1F1F1", "name": "Polish" },
    "pt-br": { "code": "1F1E7-1F1F7", "name": "Portuguese (Brazil)" },
    "pt-pt": { "code": "1F1F5-1F1F9", "name": "Portuguese (Portugal)" },
    "ro": { "code": "1F1F7-1F1F4", "name": "Romanian" },
    "ru": { "code": "1F1F7-1F1FA", "name": "Russian" },
    "sk": { "code": "1F1F8-1F1EE", "name": "Slovene" },
    "sl": { "code": "1F1F8-1F1F0", "name": "Slovak" },
    "sr": { "code": "1F1F7-1F1F8", "name": "Serbian" },
    "sv": { "code": "1F1F8-1F1EA", "name": "Swedish" },
    "ta": { "code": "1F1F5-1F1ED", "name": "Tagalog" },
    "th": { "code": "1F1F9-1F1ED", "name": "Thai" },
    "tr": { "code": "1F1F9-1F1F7", "name": "Turkish" },
    "uk": { "code": "1F1FA-1F1E6", "name": "Ukrainian" },
    "ur": { "code": "1F1F5-1F1F0", "name": "Urdu" },
    "vi": { "code": "1F1FB-1F1F3", "name": "Vietnamese" },
    "zh-hans": { "code": null, "name": "Chinese (Simplified)", "svg": "https://raw.githubusercontent.com/Cleover/OpenMoji/main/Simplified%20Chinese.svg" },
    "zh-hant": { "code": null, "name": "Chinese (Traditional)", "svg": "https://raw.githubusercontent.com/Cleover/OpenMoji/main/Traditional%20Chinese.svg" },
    "zh": { "code": "1F1E8-1F1F3", "name": "Chinese" }
}

export default function getLanguageSVG(code: string) {
    if (langs.hasOwnProperty(code.toLowerCase())) {
        let lang = langs[code.toLowerCase()];
        if (lang) {
            if (lang.hasOwnProperty("svg")) {
                return lang
            }
            else if (lang.code) {
                return {
                    ...lang,
                    "svg": `https://openmoji.org/data/color/svg/${lang.code}.svg`
                }
            }
            else return null
        }
        else return null
    } else return null
}