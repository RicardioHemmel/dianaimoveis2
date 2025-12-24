export async function http<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    let message = "Erro ao carregar dados";

    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {}

    throw new Error(message);
  }

  return res.json();
}
