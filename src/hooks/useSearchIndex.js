import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { buildStaticIndex, tourismRecords } from '@/lib/searchIndex';

// Site-wide search index: static records built once (module-cached), plus
// live TourismPlace entity records fetched once and cached — no per-keystroke
// database calls, no full database re-scans.
let staticCache = null;
let placesPromise = null;
let fullCache = null;

export default function useSearchIndex() {
  const [index, setIndex] = useState(() => {
    if (!staticCache) staticCache = buildStaticIndex();
    return fullCache || staticCache;
  });

  useEffect(() => {
    if (fullCache) return undefined;
    let cancelled = false;
    if (!placesPromise) {
      placesPromise = base44.entities.TourismPlace.list('-updated_date', 500)
        .catch(() => []);
    }
    placesPromise.then((places) => {
      if (cancelled) return;
      fullCache = staticCache.concat(tourismRecords(places));
      setIndex(fullCache);
    });
    return () => { cancelled = true; };
  }, []);

  return index;
}