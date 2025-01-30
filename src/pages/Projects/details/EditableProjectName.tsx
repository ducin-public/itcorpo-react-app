import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useNotifications } from '../../../contexts/NotificationContext';
import { updateProject } from '../../../api/ProjectApi.axios';

interface EditableProjectNameProps {
  id: string;
  name: string;
}

export function EditableProjectName({ id, name }: EditableProjectNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = async () => {
    try {
      await updateProject({ projectId: id }, { name: value }); // FIXME: PATCH vs PUT
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      addNotification('notice', 'Project name updated successfully');
      setIsEditing(false);
    } catch (error) {
      addNotification('error', 'Failed to update project name');
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
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