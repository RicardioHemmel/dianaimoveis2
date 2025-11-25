import { IMask } from "react-imask";

export function propertyPriceFormatter(price?: number | null) {
  if (!price) return "";

  const maskOptions = {
    mask: Number, // Numeric Mask
    scale: 2, // decimal places
    signed: false, // No negative values
    thousandsSeparator: ".",
    radix: ",", // decimal separator
    padFractionalZeros: true, // Aways show 2 decimal places
  };

  const masked = IMask.createMask(maskOptions);

  // Resolve transforma o valor em string na máscara
  masked.resolve(price.toString());

  return masked.value;
}
