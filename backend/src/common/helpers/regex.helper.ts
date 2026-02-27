
export function getALlMatches(regex: RegExp, text: string): string[] {
   return [...regex[Symbol.matchAll](text)
       .map(item => item[0])]; // For each RegexMatch, get the first element - its the string match
}
