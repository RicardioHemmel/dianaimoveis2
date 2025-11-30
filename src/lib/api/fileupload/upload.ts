import { POST } from "@/app/api/(private)/fileupload/route";

export async function uploadImage(file: File, folder: string) {
  const form = new FormData();
  form.append("file", file);
  form.append("folderName", folder);

  const res = await fetch("/api/(private)/fileupload", {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Erro aofazer upload");

  return await res.json();
}
