const WORDS: Record<number, string> = {
  1: "een", 2: "twee", 3: "drie", 4: "vier", 5: "vijf", 6: "zes", 7: "zeven",
  8: "acht", 9: "negen", 10: "tien", 11: "elf", 12: "twaalf",
};

/** Dutch number word for small counts; falls back to the digit. */
export const countWord = (n: number): string => WORDS[n] ?? String(n);
