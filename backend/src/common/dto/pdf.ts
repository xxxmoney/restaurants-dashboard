export interface PdfPage {
    pageNumber: number;
    contents: string[];
}

export interface Pdf {
    metadata: any;
    pages: PdfPage[];
}
