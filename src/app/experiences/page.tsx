'use client';

import { useState } from 'react';
import { useAuth, canPost } from '@/lib/useAuth';
import Sidebar from '@/components/Sidebar';
import { Plus, Lock, ThumbsUp, Calendar, Building2 } from 'lucide-react';

// Mock data — replace with real API calls later
const MOCK_EXPERIENCES = [
  {
    id: 1,
    company: 'Google',
    role: 'SDE Intern',
    author: 'Rahul Sharma',
    authorRole: 'senior',
    year: '2024',
    rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'HR Round'],
    summary: 'The process started with a 90-min OA with 3 coding questions. After clearing that, there were two technical rounds focused on DSA and system design basics. Overall a great experience!',
    tips: 'Focus on graphs, DP and be ready for follow-up questions. Communication matters.',
    result: 'Selected',
    likes: 34,
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'SDE',
    author: 'Priya Singh',
    authorRole: 'senior',
    year: '2024',
    rounds: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'Technical Round 3'],
    summary: 'OA had 2 medium-level LeetCode problems. All 3 tech rounds had a mix of DSA and CS fundamentals. The interviewers were very collaborative.',
    tips: 'Practice trees, graphs. Be thorough with OS and DBMS basics.',
    result: 'Selected',
    likes: 28,
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'SDE I',
    author: 'Amit Kumar',
    authorRole: 'senior',
    year: '2023',
    rounds: ['Online Assessment', 'Loop Round 1', 'Loop Round 2', 'Bar Raiser', 'Hiring Manager'],
    summary: 'Amazon\'s process is intense with 5 rounds. Every round had 1-2 DSA questions plus heavy LP questions. Know the leadership principles inside out.',
    tips: 'Prepare STAR format answers for all 16 LPs. Don\'t ignore behavioural rounds.',
    result: 'Selected',
    likes: 51,
  },
];

interface AddExperienceFormProps {
  onClose: () => void;
}

function AddExperienceForm({ onClose }: AddExperienceFormProps) {
  const [form, setForm] = useState({ company: '', role: '', year: '', rounds: '', summary: '', tips: '', result: 'Selected' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to backend
    alert('Experience added! (API integration pending)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl my-8">
        <h2 className="text-xl font-bold mb-6">Share Your Interview Experience</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Company Name" value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            <input required placeholder="Role (e.g. SDE Intern)" value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Year (e.g. 2024)" value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            <select value={form.result} onChange={e => setForm({ ...form, result: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <input required placeholder="Rounds (comma separated)" value={form.rounds}
            onChange={e => setForm({ ...form, rounds: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          <textarea required placeholder="Describe your experience in detail..." value={form.summary}
            onChange={e => setForm({ ...form, summary: e.target.value })} rows={4}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" />
          <textarea required placeholder="Tips for future candidates..." value={form.tips}
            onChange={e => setForm({ ...form, tips: e.target.value })} rows={2}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 border border-border rounded-xl text-muted-foreground hover:bg-gray-50 transition text-sm">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition text-sm">
              Submit Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Experiences() {
  const user = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  if (!user) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  const canSubmit = canPost(user.role);

  const filtered = MOCK_EXPERIENCES.filter(e =>
    e.company.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar user={user} />

      {showForm && <AddExperienceForm onClose={() => setShowForm(false)} />}

      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">Interview Experiences</h1>
            <p className="text-muted-foreground mt-1">Real experiences shared by seniors and placed students.</p>
          </div>
          {canSubmit ? (
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 font-medium">
              <Plus className="w-4 h-4" /> Share Experience
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-muted-foreground text-sm">
              <Lock className="w-4 h-4" /> View only
            </div>
          )}
        </div>

        {/* Role notice for students */}
        {user.role === 'student' && (
          <div className="mt-4 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700">
            You are viewing as a <strong>Student</strong>. Only seniors and placement officers can post experiences.
          </div>
        )}

        {/* Search */}
        <div className="mt-4 mb-8">
          <input
            placeholder="Search by company or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/70 min-w-[280px]"
          />
        </div>

        {/* List */}
        <div className="space-y-5">
          {filtered.map(exp => (
            <div key={exp.id} className="glass-panel p-6 rounded-2xl hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg">
                    {exp.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{exp.company} — {exp.role}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> {exp.year} · by {exp.author}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  exp.result === 'Selected' ? 'bg-green-100 text-green-700' :
                  exp.result === 'Rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {exp.result}
                </span>
              </div>

              {/* Rounds */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.rounds.map((r, i) => (
                  <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                    {i + 1}. {r}
                  </span>
                ))}
              </div>

              <p className="text-sm text-foreground mb-3 leading-relaxed">{exp.summary}</p>

              <div className="p-3 bg-primary/5 rounded-xl text-sm text-primary border border-primary/10">
                <span className="font-semibold">💡 Tips: </span>{exp.tips}
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                <ThumbsUp className="w-4 h-4" /> {exp.likes} found this helpful
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No experiences found.</div>
          )}
        </div>
      </main>
    </div>
  );
}
