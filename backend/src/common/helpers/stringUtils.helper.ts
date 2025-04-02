
// Replaces new line characters with spaces, thus inlining the text
export function inline(text: string): string {
    return text.replace(/\n/g, ' ');
}
