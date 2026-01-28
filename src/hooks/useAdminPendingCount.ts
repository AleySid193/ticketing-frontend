import { useState, useEffect } from 'react';
import { getPendingResources, PendingResources } from '@/services/admin';

export const useAdminPendingCount = () => {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data: PendingResources[] = await getPendingResources();
        setPendingCount(data.length);
      } catch (err) {
        console.error(err);
        setPendingCount(0);
      }
    };

    fetchCount();
  }, []);

  return pendingCount;
};