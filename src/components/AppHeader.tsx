import React from 'react';

export const AppHeader = React.memo(() => {
  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-8">
      Sync Sum Counter
    </h1>
  );
});

AppHeader.displayName = 'AppHeader';
