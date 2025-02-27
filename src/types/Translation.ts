export interface Translation {
    amh: string,
    eng: string,
}

export interface Tranlsations {
    [key_word: string] : Translation
}

export enum Languages {
    AMH = "amh",
    ENG = "eng"
}

export interface Language {
    language: Language
}