'use client';

import { useState } from 'react';
import { useAuth, canPost } from '@/lib/useAuth';
import Sidebar from '@/components/Sidebar';
import { Plus, Lock, Code2, Tag, Building2, AlertCircle } from 'lucide-react';

// Mock data — replace with real API calls later
const MOCK_QUESTIONS = [
  {
    id: 1,
    company: 'Google',
    title: 'Maximum Subarray Sum',
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'Arrays'],
    year: '2024',
    description: 'Given an integer array, find the contiguous subarray with the largest sum.',
    contributor: 'Rahul Sharma',
  },
  {
    id: 2,
    company: 'Amazon',
    title: 'LRU Cache Implementation',
    difficulty: 'Hard',
    tags: ['Design', 'HashMap', 'Linked List'],
    year: '2024',
    description: 'Design a data structure that follows the constraints of a Least Recently Used cache.',
    contributor: 'Priya Singh',
  },
  {
    id: 3,
    company: 'Microsoft',
    title: 'Level Order Traversal of Binary Tree',
    difficulty: 'Easy',
    tags: ['Trees', 'BFS', 'Queue'],
    year: '2024',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
    contributor: 'Amit Kumar',
  },
  {
    id: 4,
    company: 'Atlassian',
    title: 'Word Break Problem',
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'String'],
    year: '2023',
    description: 'Given a string and a dictionary, determine if the string can be segmented into space-separated words from the dictionary.',
    contributor: 'Sneha Patel',
  },
  {
    id: 5,
    company: 'Google',
    title: 'Merge K Sorted Lists',
    difficulty: 'Hard',
    tags: ['Heap', 'Linked List', 'Divide & Conquer'],
    year: '2024',
    description: 'Merge k sorted linked lists and return it as one sorted list.',
    contributor: 'Rahul Sharma',
  },
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Hard: 'bg-red-100 text-red-700',
};

interface AddQuestionFormProps {
  onClose: () => void;
}

function AddQuestionForm({ onClose }: AddQuestionFormProps) {
  const [form, setForm] = useState({ company: '', title: '', difficulty: 'Medium', tags: '', year: '', description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to backend
    alert('Question added! (API integration pending)');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl my-8">
        <h2 className="text-xl font-bold mb-6">Add OA Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input required placeholder="Company Name" value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
            <input required placeholder="Year (e.g. 2024)" value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          </div>
          <input required placeholder="Question Title" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input required placeholder="Tags (comma separated)" value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              className="px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm" />
          </div>
          <textarea required placeholder="Question description..." value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} rows={4}
            className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 border border-border rounded-xl text-muted-foreground hover:bg-gray-50 transition text-sm">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition text-sm">
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function OAQuestions() {
  const user = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [diffFilter, setDiffFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('All');

  if (!user) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  const canSubmit = canPost(user.role);

  const companies = ['All', ...Array.from(new Set(MOCK_QUESTIONS.map(q => q.company)))];

  const filtered = MOCK_QUESTIONS.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchDiff = diffFilter === 'All' || q.difficulty === diffFilter;
    const matchCompany = companyFilter === 'All' || q.company === companyFilter;
    return matchSearch && matchDiff && matchCompany;
  });

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar user={user} />

      {showForm && <AddQuestionForm onClose={() => setShowForm(false)} />}

      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-bold">OA Question Bank</h1>
            <p className="text-muted-foreground mt-1">Online assessment questions asked by companies on campus.</p>
          </div>
          {canSubmit ? (
            <button onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition shadow-lg shadow-primary/20 font-medium">
              <Plus className="w-4 h-4" /> Add Question
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-muted-foreground text-sm">
              <Lock className="w-4 h-4" /> View only
            </div>
          )}
        </div>

        {/* Role notice for students */}
        {user.role === 'student' && (
          <div className="mt-4 mb-2 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>You are viewing as a <strong>Student</strong>. Seniors and placement officers can contribute questions.</span>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mt-6 mb-8">
          <input
            placeholder="Search questions or tags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/70 min-w-[240px]"
          />
          {['All', 'Easy', 'Medium', 'Hard'].map(d => (
            <button key={d} onClick={() => setDiffFilter(d)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${diffFilter === d ? 'bg-primary text-white' : 'bg-white/70 border border-border text-muted-foreground hover:border-primary/40'}`}>
              {d}
            </button>
          ))}
          <select value={companyFilter} onChange={e => setCompanyFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white/70">
            {companies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <div className="glass-panel px-5 py-3 rounded-xl text-sm">
            <span className="text-muted-foreground">Total: </span>
            <span className="font-bold">{MOCK_QUESTIONS.length}</span>
          </div>
          {['Easy', 'Medium', 'Hard'].map(d => (
            <div key={d} className="glass-panel px-5 py-3 rounded-xl text-sm">
              <span className="text-muted-foreground">{d}: </span>
              <span className="font-bold">{MOCK_QUESTIONS.filter(q => q.difficulty === d).length}</span>
            </div>
          ))}
        </div>

        {/* Question Cards */}
        <div className="space-y-4">
          {filtered.map(q => (
            <div key={q.id} className="glass-panel p-6 rounded-2xl hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{q.title}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {q.company} · {q.year} · by {q.contributor}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${DIFFICULTY_COLORS[q.difficulty as keyof typeof DIFFICULTY_COLORS]}`}>
                  {q.difficulty}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{q.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {q.tags.map(t => (
                  <span key={t} className="px-2.5 py-0.5 bg-primary/5 border border-primary/10 rounded-full text-xs text-primary flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5" /> {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">No questions found.</div>
          )}
        </div>
      </main>
    </div>
  );
}
