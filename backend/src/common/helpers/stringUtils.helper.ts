
// Replaces new line characters with spaces, thus inlining the text
export function inline(value?: string | null): string | undefined {
    if (!value) {
        return undefined;
    }

    return value.replace(/\n/g, ' ');
}

export function nullIfEmpty(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  return value;
}

