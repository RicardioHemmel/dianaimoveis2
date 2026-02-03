const STORAGE_KEY = "favorite_properties";
const CONSENT_KEY = "diana_privacy_consent";

type ConsentValue = "accepted" | "declined";

export function getPrivacyConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

export function setPrivacyConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, value);
}

export function getPropertiesFromLocalStorage(): string[] {
  if (typeof window === "undefined") return [];

  if (getPrivacyConsent() === "declined") return [];

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
  if (getPrivacyConsent() === "declined") return;

  const properties = getPropertiesFromLocalStorage();

  // AVOID DUPLICATES
  if (!properties.includes(id)) {
    properties.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  }
}

export function removePropertyFromLocalStorage(id: string): void {
  if (typeof window === "undefined") return;
  if (getPrivacyConsent() === "declined") return;

  const properties = getPropertiesFromLocalStorage();
  const filtered = properties.filter((propertyId) => propertyId !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
