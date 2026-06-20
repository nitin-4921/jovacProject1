'use client';

import { useState } from 'react';
import { useAuth, canManageCompanies } from '@/lib/useAuth';
import Sidebar from '@/components/Sidebar';
import { Building2, Plus, Lock, MapPin, Users, TrendingUp } from 'lucide-react';

// Mock data — replace with real API calls later
const MOCK_COMPANIES = [
  { id: 1, name: 'Google', type: 'Product', location: 'Bangalore', ctc: '45 LPA', roles: ['SDE', 'SWE Intern'], selectionRate: '3%', lastVisited: '2024' },
  { id: 2, name: 'Microsoft', type: 'Product', location: 'Hyderabad', ctc: '40 LPA', roles: ['SDE', 'PM Intern'], selectionRate: '5%', lastVisited: '2024' },
  { id: 3, name: 'Amazon', type: 'Product', location: 'Bangalore', ctc: '35 LPA', roles: ['SDE I', 'SDE Intern'], selectionRate: '4%', lastVisited: '2024' },
  { id: 4, name: 'Infosys', type: 'Service', location: 'Pune', ctc: '6.5 LPA', roles: ['Systems Engineer'], selectionRate: '60%', lastVisited: '2024' },
  { id: 5, name: 'Atlassian', type: 'Product', location: 'Remote', ctc: '54 LPA', roles: ['SDE'], selectionRate: '2%', lastVisited: '2023' },
  { id: 6, name: 'TCS', type: 'Service', location: 'Multiple', ctc: '7 LPA', roles: ['Developer'], selectionRate: '70%', lastVisited: '2024' },
];

interface AddCompanyFormProps {
  onClose: () => void;
}

function AddCompanyForm({ onClose }: AddCompanyFormProps) {
  const [form, setForm] = useState({ name: '', type: 'Product', location: '', ctc: '', roles: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to backend
    alert('Company added! (API integration pending)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-6">Add Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Company Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="Product">Product</option>
            <option value="Service">Service</option>
            <option value="Startup">Startup</option>
            <option value="Consulting">Consulting</option>
          </select>
          <input required placeholder="Location" value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input required placeholder="CTC (e.g. 12 LPA)" value={form.ctc}
            onChange={e => setForm({ ...form, ctc: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <input required placeholder="Roles offered (comma separated)" value={form.roles}
            onChange={e => setForm({ ...form, roles: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 border border-border rounded-xl text-muted-foreground hover:bg-gray-50 transition">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Companies() {
  const user = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  if (!user) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  const isOfficer = canManageCompanies(user.role);

  const filtered = MOCK_COMPANIES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar user={user} />

      {showForm && <AddCompanyForm onClose={() => setShowForm(false)} />}

      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Companies</h1>
            <p className="text-muted-foreground mt-1">Browse companies that visited campus for placements.</p>
          </div>
          {isOfficer ? (
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 font-medium">
              <Plus className="w-4 h-4" /> Add Company
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-muted-foreground text-sm">
              <Lock className="w-4 h-4" /> View only
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-6 mb-8">
          <input
            placeholder="Search companies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/70 min-w-[220px]"
          />
          {['All', 'Product', 'Service', 'Startup', 'Consulting'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${filter === f ? 'bg-primary text-white' : 'bg-white/70 border border-border text-muted-foreground hover:border-primary/40'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map(company => (
            <div key={company.id} className="glass-panel p-6 rounded-2xl hover:border-primary/30 transition-colors group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {company.name.charAt(0)}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  company.type === 'Product' ? 'bg-blue-100 text-blue-700' :
                  company.type === 'Service' ? 'bg-green-100 text-green-700' :
                  company.type === 'Startup' ? 'bg-orange-100 text-orange-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {company.type}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{company.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="w-3.5 h-3.5" /> {company.location}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> CTC</span>
                  <span className="font-semibold text-primary">{company.ctc}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Selection Rate</span>
                  <span className="font-medium">{company.selectionRate}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {company.roles.map(r => (
                  <span key={r} className="px-2.5 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">{r}</span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-20 text-muted-foreground">No companies found.</div>
          )}
        </div>
      </main>
    </div>
  );
}
