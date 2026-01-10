export type DeliveryStatus = "Lançamento" | "Pronto" | "Sem data";

export function deliveryDateToDeliveryStatus(
  deliveryDate?: string
): DeliveryStatus {
  if (!deliveryDate) return "Sem data";
  const today = new Date();
  const delivery = new Date(deliveryDate + "T00:00:00");

  if (delivery > today) {
    return "Lançamento";
  } else {
    return "Pronto";
  }
}
