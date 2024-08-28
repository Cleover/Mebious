export interface SchemaType {
    extlinks: Extlinks;
    enums: Enums;
}

export interface Extlinks {
    "/release": Extlink[];
    "/staff": Extlink[];
}

export interface Extlink {
    name: string;
    label: string;
    url_format: string;
}

export interface Enums {
    medium: Medium[];
    language: Language[];
    staff_role: StaffRole[];
    platform: Platform[];
}

export interface Medium {
    label: string;
    plural: string | null;
    id: string;
}

export interface Language {
    label: string;
    id: string;
}

export interface StaffRole {
    label: string;
    id: string;
}

export interface Platform {
    label: string;
    id: string;
}


