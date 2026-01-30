export const toUTCDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

export const toDateInputValue = (value?: string | Date | null) => {
  if (!value) return "";

  // já está no formato certo
  if (typeof value === "string" && value.length === 10) {
    return value;
  }

  // string ISO
  const date = new Date(value);
  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
};
