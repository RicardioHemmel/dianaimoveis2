const STORAGE_KEY = "favorite_properties";

export function getPropertiesFromLocalStorage(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Erro ao ler properties do localStorage:", err);
    return [];
  }
}

export function setPropertyOnLocalStorage(id: string): void {
  if (typeof window === "undefined") return;

  const properties = getPropertiesFromLocalStorage();

  // AVOID DUPLICATES
  if (!properties.includes(id)) {
    properties.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }
}

export function removePropertyFromLocalStorage(id: string): void {
  if (typeof window === "undefined") return;

  const properties = getPropertiesFromLocalStorage();
  const filtered = properties.filter((propertyId) => propertyId !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
