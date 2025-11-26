export function toTitleCase(str: string) {
  return str
    .toLocaleLowerCase("pt-BR")
    .replace(
      /(^|\s|-|\/|\.)(\p{L})/gu,
      (match, boundary, letter) => boundary + letter.toLocaleUpperCase("pt-BR")
    );
}
