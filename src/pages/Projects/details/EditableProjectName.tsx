import { useState, useRef } from 'react';

interface EditableProjectNameProps {
  id: string;
  name: string;
}

export function EditableProjectName({ id, name }: EditableProjectNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={console.log}
        onKeyDown={(e) => {
          if (e.key === 'Enter') console.log();
          if (e.key === 'Escape') setIsEditing(false);
        }}
        className="text-2xl font-bold text-gray-900 border-b-2 border-indigo-500 focus:outline-none"
      />
    );
  }

  return (
    <h1
      onDoubleClick={() => setIsEditing(true)}
      className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-indigo-600"
    >
      {name}
    </h1>
  );
}