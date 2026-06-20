'use client';

import { useAuth } from '@/lib/useAuth';
import Sidebar from '@/components/Sidebar';
import { TrendingUp, BookOpen, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const user = useAuth();

  if (!user) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar user={user} />

      <main className="flex-1 p-10 overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

        <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
        <p className="text-muted-foreground mb-10 capitalize">
          Logged in as <span className="font-medium text-foreground">{user.role}</span> · Here&apos;s what&apos;s happening today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Upcoming Companies</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">New Experiences</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Your Readiness</h3>
            <p className="text-3xl font-bold text-secondary">82%</p>
          </div>
        </div>

        {/* Role-specific info banner */}
        <div className="glass-panel p-6 rounded-2xl mb-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            {user.role === 'student' && (
              <>
                <p className="font-semibold mb-1">You&apos;re signed in as a Student</p>
                <p className="text-sm text-muted-foreground">You can browse companies, read interview experiences, and study OA questions. To contribute, ask an officer to upgrade your role.</p>
              </>
            )}
            {user.role === 'senior' && (
              <>
                <p className="font-semibold mb-1">You&apos;re signed in as a Senior / Placed Student</p>
                <p className="text-sm text-muted-foreground">You can post interview experiences and add OA questions to help juniors prepare.</p>
              </>
            )}
            {user.role === 'officer' && (
              <>
                <p className="font-semibold mb-1">You&apos;re signed in as a Placement Officer</p>
                <p className="text-sm text-muted-foreground">You have full access — add companies, approve experiences, and manage the OA question bank.</p>
              </>
            )}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl min-h-[300px] flex items-center justify-center text-muted-foreground border-dashed border-2">
          Analytics Module (Real API Integration Pending)
        </div>
      </main>
    </div>
  );
}
