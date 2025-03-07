export interface PdfPage {
    pageNumber: number;
    content: string;
}

export interface Pdf {
    metadata: any;
    pages: PdfPage[];
}
