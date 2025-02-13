export interface ImaggaResponse {
    result: {
        tags: ImaggaTag[];
    };
}

export interface ImaggaTag {
    confidence: number;
    tag: {
        en: string;
    };
}
