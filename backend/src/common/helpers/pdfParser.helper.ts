import {resolvePDFJS} from 'pdfjs-serverless'
import {Pdf, PdfPage} from "../dto/pdf";

export async function parsePdf(pdfBuffer: ArrayBuffer): Promise<Pdf> {
    const {getDocument} = await resolvePDFJS();
    const doc = await getDocument(pdfBuffer).promise;

    // Get metadata and initialize output object
    const metadata = await doc.getMetadata();
    const output = {
        metadata,
        pages: [] as PdfPage[]
    };

    // Iterate through each page and get the text content
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const contents = textContent.items.map(item => item).join(' ');

        output.pages.push({
            pageNumber: i,
            content: contents
        });
    }

    return output;
}
