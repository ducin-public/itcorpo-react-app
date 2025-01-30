import { useState } from 'react';
import { Upload } from 'lucide-react';
import type { ReactNode } from 'react';

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export type FileType = 'IMAGE' | 'OTHER';

interface FileInputProps {
  label?: string;
  fileType: FileType;
  renderThumbnail?: (filename: string) => ReactNode;
  onChange: (file: File) => void;
  error?: boolean;
  accept?: string;
}

export const FileInput = ({
  label,
  fileType,
  renderThumbnail,
  onChange,
  error,
  accept
}: FileInputProps) => {
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileSize(file.size);
      setFilename(file.name);
      onChange(file);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="file"
          accept={accept || (fileType === 'IMAGE' ? 'image/*' : undefined)}
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className={`
            flex flex-col items-center justify-center w-full h-40
            border-2 border-dashed rounded-lg cursor-pointer
            ${error ? 'border-red-500' : 'border-gray-300'}
            hover:border-purple-500 transition-colors
          `}
        >
          {filename && renderThumbnail ? (
            renderThumbnail(filename)
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Click to upload {fileType === 'IMAGE' ? 'image' : 'file'}
              </span>
            </div>
          )}
        </label>
      </div>
      {fileSize && (
        <div className="text-sm text-gray-500">
          Size: {formatFileSize(fileSize)}
        </div>
      )}
    </div>
  );
};
