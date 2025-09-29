import React from 'react';

interface AppContainerProps {
  children: React.ReactNode;
}

export const AppContainer = React.memo<AppContainerProps>(({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <div className="text-center">
          {children}
        </div>
      </div>
    </div>
  );
});

AppContainer.displayName = 'AppContainer';
