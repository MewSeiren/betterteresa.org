import React, { useState } from 'react';
import { X, AlertTriangle, UploadCloud } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { CATEGORIES, VERIFICATION_STATUSES, statusLabel } from '@/data/tourismTaxonomy';
import { BARANGAYS, slugify, findDuplicates } from '@/lib/tourism';

const EMPTY = {
  name: '', slug: '', category: '', subcategory: '', description: '',
  barangay: '', address: '', latitude: '', longitude: '', maps_url: '',
  contact_number: '', email: '', website: '', facebook_url: '', instagram_url: '', tiktok_url: '',
  opening_hours: '', price_range: '', amenities: '', services: '',
  ownership_type: '', tourism_relevance: '', source_name: '', source_urls: '',
  verification_status: 'needs_verification', last_verified: '',
  is_active: true, is_featured: false, photos: []
};

const splitList = (s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean);

const inputCls = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20';
const labelCls = 'mb-1 block text-xs font-bold uppercase tracking-wide text-slate-400';

export default function AdminPlaceForm({ initial, places, onClose, onSaved }) {
  const isEdit = !!(initial && initial.id);
  const [form, setForm] = useState(() => {
    if (!initial) return { ...EMPTY };
    return {
      ...EMPTY,
      ...initial,
      amenities: (initial.amenities || []).join(', '),
      services: (initial.services || []).join(', '),
      source_urls: (initial.source_urls || []).join(', '),
      photos: initial.photos || [],
      latitude: initial.latitude ?? '',
      longitude: initial.longitude ?? ''
    };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [dupes, setDupes] = useState(null);
  const [uploading, setUploading] = useState(false);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onNameChange = (v) => {
    setForm((f) => ({
      ...f,
      name: v,
      slug: isEdit ? f.slug : slugify(v)
    }));
  };

  const subOptions = CATEGORIES.find((c) => c.key === form.category)?.subcategories || [];

  const buildPayload = () => {
    const p = {
      name: form.name.trim(),
      slug: (form.slug || slugify(form.name)).trim(),
      category: form.category,
      subcategory: form.subcategory || '',
      description: form.description.trim(),
      barangay: form.barangay || '',
      address: form.address.trim(),
      latitude: form.latitude === '' || form.latitude == null ? null : Number(form.latitude),
      longitude: form.longitude === '' || form.longitude == null ? null : Number(form.longitude),
      maps_url: form.maps_url.trim(),
      contact_number: form.contact_number.trim(),
      email: form.email.trim(),
      website: form.website.trim(),
      facebook_url: form.facebook_url.trim(),
      instagram_url: form.instagram_url.trim(),
      tiktok_url: form.tiktok_url.trim(),
      opening_hours: form.opening_hours.trim(),
      price_range: form.price_range.trim(),
      amenities: splitList(form.amenities),
      services: splitList(form.services),
      photos: form.photos,
      ownership_type: form.ownership_type.trim(),
      tourism_relevance: form.tourism_relevance.trim(),
      source_name: form.source_name.trim(),
      source_urls: splitList(form.source_urls),
      verification_status: form.verification_status,
      last_verified: form.last_verified || '',
      is_active: form.is_active,
      is_featured: form.is_featured
    };
    if (form.verification_status === 'verified' && !p.last_verified) {
      p.last_verified = new Date().toISOString().slice(0, 10);
    }
    return p;
  };

  const doSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = buildPayload();
      if (!payload.name || !payload.category) throw new Error('Name and category are required.');
      if (isEdit) await base44.entities.TourismPlace.update(initial.id, payload);
      else await base44.entities.TourismPlace.create(payload);
      onSaved();
    } catch (e) {
      setError(e.message || 'Save failed');
      setSaving(false);
    }
  };

  const attemptSave = () => {
    const payload = buildPayload();
    const d = findDuplicates(payload, places, initial?.id);
    if (d.length) { setDupes(d); return; }
    doSave();
  };

  const addPhotos = async (e) => {
    const files = [...(e.target.files || [])];
    if (!files.length) return;
    setUploading(true);
    try {
      for (const f of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
        setField('photos', [...(form.photos || []), file_url]);
      }
    } catch (err) {
      setError('Photo upload failed: ' + (err.message || ''));
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 py-10" role="dialog" aria-modal="true" aria-label={isEdit ? 'Edit establishment' : 'Add establishment'}>
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-slate-100 bg-white px-6 py-4">
          <h2 className="font-black text-[#0a1a35]">{isEdit ? 'Edit' : 'Add'} Establishment</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="af-name">Name *</label>
            <input id="af-name" className={inputCls} value={form.name} onChange={(e) => onNameChange(e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-slug">Slug (URL)</label>
            <input id="af-slug" className={inputCls} value={form.slug} onChange={(e) => setField('slug', slugify(e.target.value))} placeholder="auto-generated from name" />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-cat">Category *</label>
            <select id="af-cat" className={inputCls} value={form.category} onChange={(e) => { setField('category', e.target.value); setField('subcategory', ''); }}>
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label.en}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="af-sub">Subcategory</label>
            <select id="af-sub" className={inputCls} value={form.subcategory} onChange={(e) => setField('subcategory', e.target.value)} disabled={subOptions.length === 0}>
              <option value="">—</option>
              {subOptions.map((s) => <option key={s.key} value={s.key}>{s.label.en}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="af-bgy">Barangay</label>
            <select id="af-bgy" className={inputCls} value={form.barangay} onChange={(e) => setField('barangay', e.target.value)}>
              <option value="">—</option>
              {BARANGAYS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="af-desc">Description</label>
            <textarea id="af-desc" rows={3} className={inputCls} value={form.description} onChange={(e) => setField('description', e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="af-addr">Address</label>
            <input id="af-addr" className={inputCls} value={form.address} onChange={(e) => setField('address', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-lat">Latitude</label>
            <input id="af-lat" type="number" step="any" className={inputCls} value={form.latitude} onChange={(e) => setField('latitude', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-lng">Longitude</label>
            <input id="af-lng" type="number" step="any" className={inputCls} value={form.longitude} onChange={(e) => setField('longitude', e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="af-maps">Google Maps link (overrides coordinates)</label>
            <input id="af-maps" className={inputCls} value={form.maps_url} onChange={(e) => setField('maps_url', e.target.value)} placeholder="https://maps.app.goo.gl/…" />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-contact">Contact number</label>
            <input id="af-contact" className={inputCls} value={form.contact_number} onChange={(e) => setField('contact_number', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-email">Email</label>
            <input id="af-email" type="email" className={inputCls} value={form.email} onChange={(e) => setField('email', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-web">Website</label>
            <input id="af-web" className={inputCls} value={form.website} onChange={(e) => setField('website', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-hours">Opening hours</label>
            <input id="af-hours" className={inputCls} value={form.opening_hours} onChange={(e) => setField('opening_hours', e.target.value)} placeholder="e.g. Mon–Sat 9:00 AM – 8:00 PM" />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-price">Price range</label>
            <input id="af-price" className={inputCls} value={form.price_range} onChange={(e) => setField('price_range', e.target.value)} placeholder="e.g. ₱₱" />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-fb">Facebook URL</label>
            <input id="af-fb" className={inputCls} value={form.facebook_url} onChange={(e) => setField('facebook_url', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-ig">Instagram URL</label>
            <input id="af-ig" className={inputCls} value={form.instagram_url} onChange={(e) => setField('instagram_url', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-tt">TikTok URL</label>
            <input id="af-tt" className={inputCls} value={form.tiktok_url} onChange={(e) => setField('tiktok_url', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-own">Ownership type</label>
            <input id="af-own" className={inputCls} value={form.ownership_type} onChange={(e) => setField('ownership_type', e.target.value)} placeholder="e.g. Family-owned, Corporation" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="af-rel">Tourism relevance</label>
            <input id="af-rel" className={inputCls} value={form.tourism_relevance} onChange={(e) => setField('tourism_relevance', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-amen">Amenities (comma-separated)</label>
            <input id="af-amen" className={inputCls} value={form.amenities} onChange={(e) => setField('amenities', e.target.value)} placeholder="Pool, Wi-Fi, Parking" />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-serv">Services (comma-separated)</label>
            <input id="af-serv" className={inputCls} value={form.services} onChange={(e) => setField('services', e.target.value)} placeholder="Catering, Venue rental" />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-src">Source name</label>
            <input id="af-src" className={inputCls} value={form.source_name} onChange={(e) => setField('source_name', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-srcurl">Source URLs (comma-separated)</label>
            <input id="af-srcurl" className={inputCls} value={form.source_urls} onChange={(e) => setField('source_urls', e.target.value)} />
          </div>
          <div>
            <label className={labelCls} htmlFor="af-status">Verification status</label>
            <select id="af-status" className={inputCls} value={form.verification_status} onChange={(e) => setField('verification_status', e.target.value)}>
              {VERIFICATION_STATUSES.map((s) => <option key={s.key} value={s.key}>{statusLabel(s.key, 'en')}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="af-verified">Last verified date</label>
            <input id="af-verified" type="date" className={inputCls} value={form.last_verified} onChange={(e) => setField('last_verified', e.target.value)} />
          </div>

          {/* Photos */}
          <div className="sm:col-span-2">
            <label className={labelCls}>Photos</label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:border-[#1a73e8] hover:text-[#1a73e8]">
              <UploadCloud size={16} /> {uploading ? 'Uploading…' : 'Upload photos'}
              <input type="file" accept="image/*" multiple className="sr-only" onChange={addPhotos} disabled={uploading} />
            </label>
            {form.photos?.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {form.photos.map((u) => (
                  <li key={u} className="relative">
                    <Image src={u} alt="Uploaded" className="h-16 w-16 rounded-lg object-cover" />
                    <button
                      type="button"
                      aria-label="Remove photo"
                      onClick={() => setField('photos', form.photos.filter((x) => x !== u))}
                      className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-white"
                    >
                      <X size={11} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap gap-5 sm:col-span-2">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setField('is_active', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#1a73e8] focus:ring-[#1a73e8]" />
              Active
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
              <input type="checkbox" checked={form.is_featured} onChange={(e) => setField('is_featured', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#1a73e8] focus:ring-[#1a73e8]" />
              Featured
            </label>
          </div>

          {/* Duplicate warning */}
          {dupes && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 sm:col-span-2" role="alert">
              <p className="flex items-center gap-2 font-bold text-amber-800"><AlertTriangle size={16} /> Possible duplicate records found</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-700">
                {dupes.map((d) => (
                  <li key={d.place.id}>“{d.place.name}” — {d.reasons.join(', ')}</li>
                ))}
              </ul>
              <div className="mt-3 flex gap-2">
                <button type="button" onClick={doSave} className="rounded-full bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700">Save anyway (not a duplicate)</button>
                <button type="button" onClick={() => setDupes(null)} className="rounded-full border border-amber-300 px-4 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100">Cancel</button>
              </div>
            </div>
          )}
          {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700 sm:col-span-2">{error}</p>}
        </div>

        <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-b-2xl border-t border-slate-100 bg-white px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-full border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
          <button type="button" onClick={attemptSave} disabled={saving} className="rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1557b0] disabled:opacity-50">
            {saving ? 'Saving…' : 'Save record'}
          </button>
        </div>
      </div>
    </div>
  );
}