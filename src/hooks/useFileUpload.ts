import { useRef, useState } from "react";

export default function useFileUpload(
  handleLocalUpload: (files: File[]) => void
) {
  // For onDragEnter and onDragLeave control
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const countRef = useRef(0); // To prevent flickering when dragging over child elements

  function handleDragEnter(): void {
    countRef.current++;
    setIsDragging(true);
  }

  function handleDragLeave(): void {
    countRef.current--;
    if (countRef.current === 0) {
      setIsDragging(false);
    }
  }

  // Allows the drop to work (without this the browser opens the file).
  function handleDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  // Calls the upload handler when files are dropped into the drop area
  function handleDrop(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    e.stopPropagation();

    // Reset drag counter
    countRef.current = 0;
    setIsDragging(false);

    // Verifies if files were dropped
    const files = Array.from(e.dataTransfer.files);
    if (files.length) handleLocalUpload(files);
  }

  // Calls the upload handler when files are selected from the input
  function handleFilesFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
    const files = Array.from(e.target.files || []);
    if (files.length) handleLocalUpload(files);
  }

  function validateFileType(file: File, acceptedTypes: string[]): boolean {
    return acceptedTypes.some((type) => {
      type.startsWith(file.type);
    });
  }

  function validateDuplicateFile(file: File) {}

  return {
    isDragging,
    countRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFilesFromInput,
  };
}
