import LZString from 'lz-string';
import type { AppState } from '../types';

export function compressState(state: Partial<AppState>): string {
  const json = JSON.stringify(state);
  return LZString.compressToEncodedURIComponent(json);
}

export function decompressState(encoded: string): Partial<AppState> | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to parse URL state", e);
    return null;
  }
}
