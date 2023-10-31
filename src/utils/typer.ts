export function harVerdi<T>(verdi: T | null | undefined): verdi is T {
  return verdi !== null && verdi !== undefined;
}
