export function round(value: number): number {
  return parseFloat(value.toFixed(2))
}

export function debugJson(value: unknown): string {
  return JSON.stringify(value, replacer, 2);
}

function replacer(key: string, value: unknown) {
  if (value instanceof Map) {
    return Array.from(value.entries());
  } else {
    return value;
  }
}
