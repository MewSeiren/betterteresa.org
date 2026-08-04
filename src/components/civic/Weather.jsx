import React, { useEffect, useState } from 'react';
import { CloudSun, Droplets, Wind, Thermometer, MapPin, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const LAT = 14.5572, LON = 121.2153;

const codeKey = (c) => {
  if (c === 0) return 'wt.clear';
  if (c === 1) return 'wt.mainlyClear';
  if (c === 2) return 'wt.partlyCloudy';
  if (c === 3) return 'wt.overcast';
  if (c === 45 || c === 48) return 'wt.fog';
  if (c >= 51 && c <= 57) return 'wt.drizzle';
  if (c === 61 || c === 63 || c === 66 || c === 67 || c === 80 || c === 81) return 'wt.rain';
  if (c === 65 || c === 82) return 'wt.heavyRain';
  if (c >= 95) return 'wt.thunderstorm';
  return 'wt.partlyCloudy';
};

export default function Weather() {
  const { t } = useLang();
  const [w, setW] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FManila`)
      .then(r => r.json())
      .then(d => { if (d?.current) setW(d.current); else setErr(true); })
      .catch(() => setErr(true));
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-[#e8eff7] p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">{t('wt.title')}</p>
        <CloudSun className="text-[#1a73e8]" size={20} />
      </div>
      {!w && !err && <div className="mt-4 flex items-center gap-2 text-sm text-slate-500"><Loader2 className="animate-spin" size={16} /> {t('wt.loading')}</div>}
      {err && <p className="mt-4 text-sm text-slate-500">{t('wt.failed')}</p>}
      {w && (
        <div className="mt-3">
          <div className="flex items-end gap-2">
            <p className="text-4xl font-black tracking-tight text-[#0a1a35]">{Math.round(w.temperature_2m)}&deg;C</p>
            <p className="mb-1 text-sm font-semibold text-slate-600">{t(codeKey(w.weather_code))}</p>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500"><MapPin size={12} /> Teresa, Rizal</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-white/70 p-2">
              <Thermometer className="mx-auto text-[#1a73e8]" size={15} />
              <p className="mt-1 text-[11px] text-slate-400">{t('wt.feels')}</p>
              <p className="text-sm font-bold text-[#0a1a35]">{Math.round(w.apparent_temperature)}&deg;</p>
            </div>
            <div className="rounded-lg bg-white/70 p-2">
              <Droplets className="mx-auto text-[#1a73e8]" size={15} />
              <p className="mt-1 text-[11px] text-slate-400">{t('wt.humidity')}</p>
              <p className="text-sm font-bold text-[#0a1a35]">{w.relative_humidity_2m}%</p>
            </div>
            <div className="rounded-lg bg-white/70 p-2">
              <Wind className="mx-auto text-[#1a73e8]" size={15} />
              <p className="mt-1 text-[11px] text-slate-400">{t('wt.wind')}</p>
              <p className="text-sm font-bold text-[#0a1a35]">{Math.round(w.wind_speed_10m)} km/h</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-slate-400">{t('wt.updated')} &middot; Open-Meteo</p>
        </div>
      )}
    </section>
  );
}