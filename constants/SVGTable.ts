const SVGTable: { [key: string]: { x: number, y: number } } = {
    "and": { x: 16, y: 16 },
    "bdp": { x: 36, y: 16 },
    "dos": { x: 25, y: 16 },
    "drc": { x: 18, y: 16 },
    "dvd": { x: 35, y: 16 },
    "fm7": { x: 26, y: 16 },
    "fm8": { x: 26, y: 16 },
    "fmt": { x: 26, y: 16 },
    "gba": { x: 32, y: 16 },
    "gbc": { x: 36, y: 16 },
    "ios": { x: 35, y: 16 },
    "lin": { x: 15, y: 16 },
    "mac": { x: 13, y: 16 },
    "mob": { x: 16, y: 16 },
    "msx": { x: 30, y: 16 },
    "n3d": { x: 36, y: 16 },
    "nds": { x: 36, y: 16 },
    "nes": { x: 21, y: 16 },
    "oth": { x: 16, y: 16 },
    "p88": { x: 14, y: 16 },
    "p98": { x: 14, y: 16 },
    "pce": { x: 17, y: 16 },
    "pcf": { x: 13, y: 16 },
    "ps1": { x: 21, y: 16 },
    "ps2": { x: 36, y: 16 },
    "ps3": { x: 36, y: 16 },
    "ps4": { x: 36, y: 16 },
    "ps5": { x: 21, y: 16 },
    "psp": { x: 36, y: 16 },
    "psv": { x: 36, y: 16 },
    "sat": { x: 25, y: 16 },
    "scd": { x: 18, y: 16 },
    "sfc": { x: 22, y: 16 },
    "smd": { x: 29, y: 16 },
    "swi": { x: 16, y: 16 },
    "tdo": { x: 8, y: 16 },
    "vnd": { x: 16, y: 16 },
    "web": { x: 16, y: 16 },
    "wii": { x: 33, y: 16 },
    "win": { x: 17, y: 16 },
    "wiu": { x: 21, y: 16 },
    "x1s": { x: 14, y: 16 },
    "x68": { x: 29, y: 16 },
    
    // Needs to be cropped a bit
    "xb1": { x: 18, y: 16 },
    
    "xb3": { x: 16, y: 16 },
    "xbo": { x: 15, y: 16 },
    "xxs": { x: 32, y: 16 }
}

export default function getSVGSize(code: string) {
    if (SVGTable.hasOwnProperty(code.toLowerCase())) {
        return SVGTable[code.toLowerCase()];
    } else return undefined
}