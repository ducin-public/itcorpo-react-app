export function shortenString(str: string, maxLength: number = 25): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}
