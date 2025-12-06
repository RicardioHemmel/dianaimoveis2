"use client";

import { useState } from "react";
import DragEvent, { DndContext, DragEndEvent } from "@dnd-kit/core";
import FileUploader from "@/components/ui-custom/private/ImagesUploader";
import ImageUploader from "@/components/ui-custom/private/ImagesUploader";

import FullScreenImageModal from "@/components/ui-custom/private/FullScreenModal";
import { LocalImage } from "@/lib/schemas/uplodad-image";
import { fileURLToPath } from "url";
import { http } from "@/lib/api/http";
const imagesTest: LocalImage[] = [
  {
    id: 1,
    order: 1,
    preview: "https://queroficarrico.com/blog/wp-content/uploads/2017/06/como_investir_em_imoveis.jpg",
    status: "editing",
  },
   {
    id: 2,
    order: 2,
    preview: "https://resiter.com.br/storage/images/institucional/1/128-05-2025-21:39:53_img.jpg",
    status: "editing",
  },
];

export default function TestePage() {
  return (
    <>
      <div className="flex w-full rounded-full bg-blue-400 p-5 ">
        <h1 className="text-5xl ">
          Learning Drag n Drop and file manipulation
        </h1>
      </div>

      <div className="bg-amber-100 rounded-2xl h-full">
        <FullScreenImageModal images={imagesTest} />
      </div>
    </>
  );
}
