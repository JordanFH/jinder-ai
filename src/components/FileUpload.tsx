"use client";

import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface Props {
  className?: string;
  file: File | null;
  setFile: (file: File | null) => void;
  setCvData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setDisabled: (disabled: boolean) => void;
}

const FileUpload: FC<Props> = ({
  className = "",
  file,
  setFile,
  setCvData,
  setLoading,
  setDisabled,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      if (droppedFile.size <= 5 * 1024 * 1024) {
        setFile(droppedFile);
        setError(null);
      } else {
        setError("File size exceeds 5MB limit.");
      }
    } else {
      setError("Only PDF files are allowed.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size <= 5 * 1024 * 1024) {
        toast.loading("Uploading CV...");
        setFile(selectedFile);
        setError(null);

        setLoading(true);
        setDisabled(true);

        // parse selectedFile to base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = async () => {
          let base64 = reader.result as string;
          base64 = base64.split(",")[1];

          try {
            const response = await fetch("/api/uploadCV", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_id: uuidv4(), file: base64 }),
            });

            if (!response.ok) {
              throw new Error("Failed to fetch CV data");
            }
            toast.dismiss();

            let { success, result } = await response.json();

            if (!success) {
              throw new Error("Failed to fetch CV data");
            }

            setCvData(result);

            setLoading(false);
            setDisabled(false);

            toast.success("CV uploaded successfully!");
          } catch (error) {
            console.error(error);
          }
        };
      } else {
        setError("File size exceeds 5MB limit.");
      }
    } else {
      setError("Only PDF files are allowed.");
    }
  };

  return (
    <div className={`${className}`}>
      <div
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-600 border-dashed rounded-md"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-neutral-600 dark:text-neutral-300">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <span>Upload your CV</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          {file && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Selected file: {file.name}
            </p>
          )}
          {error && (
            <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
          )}
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            PDF up to 5MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
