export type DeliveryStatus = "Lançamento" | "Pronto" | "Sem data";

const statusColors: Record<DeliveryStatus, string> = {
  Lançamento: "bg-emerald-500 text-white",
  Pronto: "bg-blue-500 text-white",
  "Sem data": "bg-white text-black",
};

export function deliveryDateToDeliveryStatus(deliveryDate?: string) {
  if (!deliveryDate)
    return { label: "Sem data", badgeColor: statusColors["Sem data"] };
  const today = new Date();
  const delivery = new Date(deliveryDate + "T00:00:00");

  const status = delivery > today ? "Lançamento" : "Pronto";

  return { label: status, badgeColor: statusColors[status] };
}

// RETURN A FORMAT LIKE THIS (Dez/2027)
export function deliveryDateToShotDate(deliveryDate: string) {
  // "T00:00:00" AVOIDS TIME ZONE PROBLEMS THAT COULD CHANGE THE DAY/MONTH
  const date = new Date(deliveryDate + "T00:00:00");

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(date);

  //formatted returns something like "Oct. 2027" or "Oct/2027" depending on the environment
  //Let's clean the point and guarantee the "Month/Year" format
  const [monthPart, yearPart] = formatted.replace(".", "").split(" de ");

  //If the split by ' de ' doesn't find anything (depends on the browser),
  //we try to get what comes before the space or slash.
  const month = monthPart || formatted.split(" ")[0];
  const year = yearPart || date.getFullYear();

  // CAPITALIZES ONLY THE FIRST LETTER
  const capitalizedMonth =
    month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();

  return `${capitalizedMonth}/${year}`;
}
