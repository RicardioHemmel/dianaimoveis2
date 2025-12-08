import { IMask } from "react-imask";

export function priceMask(elementId: string) {
  const maskOptions = {
    mask: Number, // Numeric Mask
    scale: 2, // decimal places
    signed: false, // No negative values
    thousandsSeparator: ".",
    radix: ",", // decimal separator
    padFractionalZeros: true, // Aways show 2 decimal places
  };

  const element = document.getElementById(elementId);

  if (!element) return;

  IMask(element, maskOptions);
}
