import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Pencil, BadgeCheck, Star, Archive, ArchiveRestore, LogIn } from 'lucide-react';
import NavBar from '@/components/civic/NavBar';
import CivicFooter from '@/components/civic/CivicFooter';
import Seo from '@/components/tourism/Seo';
import AdminPlaceForm from '@/components/tourism/AdminPlaceForm';
import TourismResearch from '@/components/tourism/TourismResearch';
import useTourismPlaces from '@/hooks/useTourismPlaces';
import { base44 } from '@/api/base44Client';
import { getCategory, statusMeta, statusLabel } from '@/data/tourismTaxonomy';

export default function TourismAdmin() {
  const { places, error } = useTourismPlaces();
  const [me, setMe] = useState('loading');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null); // null = closed; {} = new; object = edit
  const [formOpen, setFormOpen] = useState(false);
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    base44.auth.me()
      .then((u) => setMe(u || null))
      .catch(() => setMe(null));
  }, []);

  const rows = useMemo(() => {
    const list = places || [];
    const q = query.trim().toLowerCase();
    return q ? list.filter((p) => p.name.toLowerCase().includes(q)) : list;
  }, [places, query]);

  const stats = useMemo(() => ({
    total: (places || []).length,
    verified: (places || []).filter((p) => p.verification_status === 'verified').length,
    needs: (places || []).filter((p) => p.verification_status === 'needs_verification').length,
    archived: (places || []).filter((p) => p.verification_status === 'archived').length
  }), [places]);

  const refresh = () => { window.location.reload(); };

  const patch = async (p, data) => {
    setBusyId(p.id);
    try {
      await base44.entities.TourismPlace.update(p.id, data);
      refresh();
    } catch (e) {
      alert(e.message || 'Update failed');
      setBusyId(null);
    }
  };

  const openNew = (prefill = {}) => {
    setEditing({ ...prefill });
    setFormOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setFormOpen(true);
  };

  if (me === 'loading') {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <NavBar />
        <div className="grid place-items-center py-32" role="status">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a73e8]" />
        </div>
        <CivicFooter />
      </div>
    );
  }

  if (!me || me.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#f8f9fa]">
        <Seo title="Tourism Admin — Better Teresa" />
        <NavBar />
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <div className="rounded-2xl border border-slate-200 bg-white p-10">
            <LogIn size={32} className="mx-auto text-slate-300" aria-hidden="true" />
            <h1 className="mt-4 text-xl font-black text-[#0a1a35]">Administrator access required</h1>
            <p className="mt-2 text-sm text-slate-500">Sign in with an administrator account to manage the tourism directory.</p>
            <Link to="/login" className="mt-6 inline-block rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#1557b0]">
              Sign in
            </Link>
          </div>
        </div>
        <CivicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900">
      <Seo title="Tourism Admin — Better Teresa" />
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1a73e8]">Admin</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0a1a35]">Tourism Directory Management</h1>
            <p className="mt-2 text-sm text-slate-500">Add, verify, and archive establishments. Verified records are never changed automatically — web research proposals always require your approval.</p>
          </div>
          <button
            type="button"
            onClick={() => openNew()}
            className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1557b0]"
          >
            <Plus size={16} /> Add Establishment
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['Total records', stats.total],
            ['Verified', stats.verified],
            ['Needs verification', stats.needs],
            ['Archived', stats.archived]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-2xl font-black text-[#0a1a35]">{value}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        {error && (
          <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">Could not load records. Please refresh.</p>
        )}

        {/* Research / update workflow */}
        <TourismResearch places={places || []} onAdopt={(cand) => openNew({
          name: cand.name || '',
          description: cand.description || '',
          barangay: cand.barangay || '',
          source_name: cand.source_name || 'Web research (pending verification)',
          source_urls: cand.source_url ? [cand.source_url] : []
        })} />

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4">
            <h2 className="font-black text-[#0a1a35]">Records</h2>
            <div className="relative">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-64 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm focus:border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20"
              />
            </div>
          </div>
          {!places ? (
            <div className="grid place-items-center py-16" role="status">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#1a73e8]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Barangay</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Verified</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => {
                    const cat = getCategory(p.category);
                    const meta = statusMeta(p.verification_status);
                    const archived = p.verification_status === 'archived';
                    return (
                      <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-[#f8f9fa]">
                        <td className="max-w-[240px] px-4 py-3">
                          <Link to={`/tourism/${p.slug}`} className="font-bold text-[#0a1a35] hover:text-[#1a73e8] hover:underline">{p.name}</Link>
                          {p.is_featured && <Star size={12} className="ml-1.5 inline fill-amber-400 text-amber-400" aria-label="Featured" />}
                        </td>
                        <td className="px-4 py-3 text-slate-500">{cat?.label.en || p.category}{p.subcategory ? ` · ${p.subcategory}` : ''}</td>
                        <td className="px-4 py-3 text-slate-500">{p.barangay || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                            {statusLabel(p.verification_status, 'en')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500">{p.last_verified || '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button type="button" title="Edit" aria-label={`Edit ${p.name}`} onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-[#0a1a35]">
                              <Pencil size={15} />
                            </button>
                            {p.verification_status !== 'verified' && (
                              <button
                                type="button"
                                title="Mark verified today"
                                aria-label={`Verify ${p.name}`}
                                disabled={busyId === p.id}
                                onClick={() => patch(p, { verification_status: 'verified', last_verified: new Date().toISOString().slice(0, 10) })}
                                className="grid h-8 w-8 place-items-center rounded-lg text-emerald-600 transition hover:bg-emerald-50 disabled:opacity-40"
                              >
                                <BadgeCheck size={16} />
                              </button>
                            )}
                            <button
                              type="button"
                              title={p.is_featured ? 'Remove featured' : 'Mark featured'}
                              aria-label={`Toggle featured ${p.name}`}
                              disabled={busyId === p.id}
                              onClick={() => patch(p, { is_featured: !p.is_featured })}
                              className={`grid h-8 w-8 place-items-center rounded-lg transition hover:bg-amber-50 disabled:opacity-40 ${p.is_featured ? 'text-amber-500' : 'text-slate-300'}`}
                            >
                              <Star size={16} className={p.is_featured ? 'fill-amber-400 text-amber-400' : ''} />
                            </button>
                            {archived ? (
                              <button
                                type="button"
                                title="Restore"
                                aria-label={`Restore ${p.name}`}
                                disabled={busyId === p.id}
                                onClick={() => patch(p, { verification_status: 'needs_verification', is_active: true })}
                                className="grid h-8 w-8 place-items-center rounded-lg text-blue-600 transition hover:bg-blue-50 disabled:opacity-40"
                              >
                                <ArchiveRestore size={16} />
                              </button>
                            ) : (
                              <button
                                type="button"
                                title="Archive (keeps history)"
                                aria-label={`Archive ${p.name}`}
                                disabled={busyId === p.id}
                                onClick={() => patch(p, { verification_status: 'archived', is_active: false })}
                                className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:opacity-40"
                              >
                                <Archive size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {rows.length === 0 && <p className="p-8 text-center text-sm text-slate-400">No records match your search.</p>}
            </div>
          )}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Archiving keeps a record's history — closed or renamed establishments are never deleted. Duplicate detection (name, contact, address, coordinates, social links) runs automatically when saving a record.
        </p>
      </main>
      {formOpen && (
        <AdminPlaceForm
          initial={editing}
          places={places || []}
          onClose={() => { setFormOpen(false); setEditing(null); }}
          onSaved={refresh}
        />
      )}
      <CivicFooter />
    </div>
  );
}