import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import clsx from 'clsx';

interface ActionButtonsProps {
  isLoading: boolean;
  onIncrement: () => void;
  onRefresh: () => void;
}

export const ActionButtons = React.memo<ActionButtonsProps>(({ 
  isLoading, 
  onIncrement, 
  onRefresh 
}) => {
  return (
    <div className="space-y-4">
      <button
        onClick={onIncrement}
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center text-lg py-3"
      >
        <Plus className="w-5 h-5 mr-2" />
        Увеличить
      </button>
      
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="w-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors py-2"
      >
        <RefreshCw className={clsx('w-4 h-4 mr-2', isLoading && 'animate-spin')} />
        Обновить
      </button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';
