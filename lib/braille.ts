/**
 * Braille conversion utility
 * Converts text to Unicode Braille Patterns (U+2800-U+28FF)
 */

// Basic braille mapping for letters (a-z)
const brailleLetters: { [key: string]: string } = {
  a: "⠁", b: "⠃", c: "⠉", d: "⠙", e: "⠑", f: "⠋",
  g: "⠛", h: "⠓", i: "⠊", j: "⠚", k: "⠅", l: "⠇",
  m: "⠍", n: "⠝", o: "⠕", p: "⠏", q: "⠟", r: "⠗",
  s: "⠎", t: "⠞", u: "⠥", v: "⠧", w: "⠺", x: "⠭",
  y: "⠽", z: "⠵",
};

// Braille mapping for numbers (0-9)
const brailleNumbers: { [key: string]: string } = {
  "0": "⠴", "1": "⠂", "2": "⠆", "3": "⠒", "4": "⠲",
  "5": "⠢", "6": "⠖", "7": "⠶", "8": "⠦", "9": "⠔",
};

// Braille mapping for common punctuation
const braillePunctuation: { [key: string]: string } = {
  " ": " ", ".": "⠲", ",": "⠂", "?": "⠦", "!": "⠖",
  ":": "⠒", ";": "⠆", "-": "⠤", "'": "⠄", '"': "⠘",
  "(": "⠐", ")": "⠨", "/": "⠌", "&": "⠯", "*": "⠔",
};

/**
 * Check if a character is a Devanagari (Hindi) character
 */
function isDevanagari(char: string): boolean {
  const code = char.charCodeAt(0);
  // Devanagari Unicode range: U+0900 to U+097F
  return code >= 0x0900 && code <= 0x097f;
}

/**
 * Converts a single character to braille
 */
function charToBraille(char: string): string {
  const lowerChar = char.toLowerCase();
  
  // Check if it's a letter
  if (brailleLetters[lowerChar]) {
    return brailleLetters[lowerChar];
  }
  
  // Check if it's a number
  if (brailleNumbers[lowerChar]) {
    return brailleNumbers[lowerChar];
  }
  
  // Check if it's punctuation
  if (braillePunctuation[char]) {
    return braillePunctuation[char];
  }
  
  // For Hindi/Devanagari characters, preserve them as-is
  // (Hindi has its own braille system, but for now we preserve the text)
  if (isDevanagari(char)) {
    return char;
  }
  
  // For unknown characters, return a space
  return " ";
}

/**
 * Converts text to braille
 * @param text - The text to convert
 * @returns The braille representation
 */
export function textToBraille(text: string): string {
  if (!text) return "";
  
  return text
    .split("")
    .map(char => charToBraille(char))
    .join("");
}

/**
 * Converts text to braille while preserving original text for tooltips
 * @param text - The text to convert
 * @returns Object with braille and original text
 */
export function convertToBrailleWithOriginal(text: string): {
  braille: string;
  original: string;
} {
  return {
    braille: textToBraille(text),
    original: text,
  };
}

