import React from 'react';
import { API_CONFIG } from '../lib/counterApi';

export const StatusInfo = React.memo(() => {
  return (
    <div className="mt-6 text-xs text-gray-500">
      <p>Автообновление каждые {API_CONFIG.REFRESH_INTERVAL / 1000} сек</p>
      <p>API: {API_CONFIG.BASE_URL}</p>
    </div>
  );
});

StatusInfo.displayName = 'StatusInfo';
