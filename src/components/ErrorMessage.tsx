import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage = React.memo<ErrorMessageProps>(({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center justify-center text-red-600 text-sm mb-4">
      <AlertCircle className="w-4 h-4 mr-2" />
      {error}
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';
