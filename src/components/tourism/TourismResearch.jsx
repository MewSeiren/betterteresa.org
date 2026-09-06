import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, Plus, ExternalLink, Info } from 'lucide-react';
import { base44 } from '@/api/base44Client';

// Admin "Refresh Tourism Information" workflow.
// Runs a web-researched scan for Teresa, Rizal establishments via the LLM
// integration and returns PROPOSALS only — nothing is written to the
// directory automatically; the administrator approves each record.
export default function TourismResearch({ places, onAdopt }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [adopted, setAdopted] = useState([]);

  const run = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setAdopted([]);
    try {
      const existingNames = places.map((p) => p.name).join('; ');
      const res = await base44.integrations.Core.InvokeLLM({
        model: 'gemini_3_flash',
        add_context_from_internet: true,
        prompt: `You are helping maintain a civic tourism directory for the Municipality of Teresa, Rizal, Philippines (a landlocked municipality bordered by Antipolo, Morong, Tanay, Baras).

Research publicly available information on the internet about establishments and places located SPECIFICALLY within Teresa, Rizal ONLY. Do NOT include places from Antipolo, Taytay, Angono, Binangonan, Cainta, Morong, Tanay, Baras, or any other municipality unless the place is physically located in Teresa.

Existing directory records (do not re-propose these as new):
${existingNames}

Tasks:
1. Find establishments, attractions, resorts, restaurants, cafes, farms, or places of interest in Teresa, Rizal that are NOT in the existing records. Use official pages, Facebook pages, Google Maps listings, news articles, and tourism directories as sources. For each, provide the name, a short factual description, the barangay if known, and the best source URL.
2. For existing records, identify any public evidence of closures, renames, or changed contact information (suspected_change should be one of: "possibly closed", "possibly renamed", "contact info may have changed").

Be conservative: only report what public sources actually say. If unsure, leave fields empty rather than guessing.`,
        response_json_schema: {
          type: 'object',
          properties: {
            new_places: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  category: { type: 'string', description: 'One of: attractions, recreation, food, services, business, others' },
                  description: { type: 'string' },
                  barangay: { type: 'string' },
                  source_name: { type: 'string' },
                  source_url: { type: 'string' }
                },
                required: ['name']
              }
            },
            status_changes: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  existing_name: { type: 'string' },
                  suspected_change: { type: 'string' },
                  reason: { type: 'string' },
                  source_url: { type: 'string' }
                },
                required: ['existing_name', 'suspected_change']
              }
            }
          },
          required: ['new_places', 'status_changes']
        }
      });
      setResult(res);
    } catch (e) {
      setError(e.message || 'Research failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-black text-[#0a1a35]">Refresh Tourism Information</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-500">
            Scans public web sources for new Teresa establishments and possible closures, renames, or changed contact details.
            Proposals are <strong>never saved automatically</strong> — you review and approve each one.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-[#0a1a35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#15294a] disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Researching…' : 'Run web research'}
        </button>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-400">
        <Info size={13} className="mt-0.5 shrink-0" />
        Uses a web-enabled AI model (extra integration credits apply). Results are unverified proposals — always check the source before marking anything verified.
      </p>

      {error && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">
          <AlertTriangle size={15} /> {error}
        </p>
      )}

      {loading && (
        <div className="mt-4 space-y-2" aria-hidden="true">
          {[0, 1, 2].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />)}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-8">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">New places found ({result.new_places?.length || 0})</h3>
            {result.new_places?.length ? (
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {result.new_places.map((c, i) => (
                  <li key={i} className="rounded-xl border border-slate-200 bg-[#f8f9fa] p-4">
                    <p className="font-bold text-[#0a1a35]">{c.name}</p>
                    {c.category && <p className="mt-0.5 text-xs font-bold uppercase tracking-wide text-[#1a73e8]">{c.category}</p>}
                    {c.description && <p className="mt-1.5 text-sm text-slate-600">{c.description}</p>}
                    {c.barangay && <p className="mt-1 text-xs font-semibold text-slate-400">{c.barangay}</p>}
                    {c.source_url && (
                      <a href={c.source_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 break-all text-xs font-semibold text-[#1a73e8] hover:underline">
                        {c.source_name || 'Source'} <ExternalLink size={10} />
                      </a>
                    )}
                    <button
                      type="button"
                      disabled={adopted.includes(i)}
                      onClick={() => { setAdopted((a) => [...a, i]); onAdopt(c); }}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#1a73e8] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1557b0] disabled:opacity-40"
                    >
                      <Plus size={12} /> {adopted.includes(i) ? 'Opened in form' : 'Add as new record'}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No new places found outside the existing records.</p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-wide text-slate-500">Possible changes to existing records ({result.status_changes?.length || 0})</h3>
            {result.status_changes?.length ? (
              <ul className="mt-3 space-y-2">
                {result.status_changes.map((c, i) => (
                  <li key={i} className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
                    <p className="font-bold text-amber-900">{c.existing_name}</p>
                    <p className="mt-1 text-amber-800"><strong>{c.suspected_change}</strong> — {c.reason}</p>
                    {c.source_url && (
                      <a href={c.source_url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 break-all text-xs font-semibold text-amber-700 underline">
                        {c.source_url} <ExternalLink size={10} />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No suspected changes found.</p>
            )}
            <p className="mt-3 text-xs text-slate-400">Review these manually, then edit the record in the table above with the corrected details and mark it verified when confirmed.</p>
          </div>
        </div>
      )}
    </div>
  );
}