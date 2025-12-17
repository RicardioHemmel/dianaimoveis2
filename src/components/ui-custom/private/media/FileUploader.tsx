import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";

export default function FileUploader() {
  const [specificationsFile, setspecificationsFile] = useState<File | null>(
    null
  );

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;

    const invalidType = ""
    
    if (!file) return;


  }

  return (
    <>
      <input type="file" className="hidden" id="propertySpecificationFile" />
      <Button
        onClick={() =>
          document.getElementById("propertySpecificationFile")?.click()
        }
        className="w-full"
        variant={"outline"}
      >
        Enviar ficha técnica
      </Button>
    </>
  );
}
