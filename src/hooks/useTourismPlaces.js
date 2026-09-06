import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

// Shared loader for the tourism directory.
// Returns { places, error } — places is null while loading.
export default function useTourismPlaces() {
  const [places, setPlaces] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    base44.entities.TourismPlace.list('-updated_date', 500)
      .then((list) => { if (!cancelled) setPlaces(list); })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, []);

  return { places, error };
}