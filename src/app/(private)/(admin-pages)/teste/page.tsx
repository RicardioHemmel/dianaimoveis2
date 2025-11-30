"use client";

import { useState } from "react";
import DragEvent, { DndContext, DragEndEvent } from "@dnd-kit/core";
import FileUploader from "@/components/ui-custom/private/ImageUploader";
import ImageUploader from "@/components/ui-custom/private/ImageUploader";


export default function TestePage() {
  return (
    <>
      <div className="flex w-full rounded-full bg-blue-400 p-5 ">
        <h1 className="text-5xl ">
          Learning Drag n Drop and file manipulation
        </h1>
      </div>

      <div className="bg-amber-100 rounded-2xl h-full">

      
      </div>
    </>
  );
}
