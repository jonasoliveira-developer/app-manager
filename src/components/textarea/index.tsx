"use client"
import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  register: any;
  error?: string;
}

export function Textarea({ name, register, error, ...rest }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <textarea
        {...register(name)}
        {...rest}
        className={`border rounded px-3 py-2 resize-none min-h-[120px] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}