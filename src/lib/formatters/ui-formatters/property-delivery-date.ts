function compareDates(deliveryDate?: string): string {
  if (!deliveryDate) return "";

  const today = new Date();
  const delivery = new Date(deliveryDate + "T00:00:00");

  if (delivery > today) {
    return "Lançamento";
  } else {
    return "Pronto";
  }
}
