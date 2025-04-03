
// Replaces new line characters with spaces, thus inlining the text
export function inline(text: string): string | undefined {
    if (!text) {
        return undefined;
    }

    return text.replace(/\n/g, ' ');
}
