'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BookOpen, Briefcase, Sparkles, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-50 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="font-bold text-xl tracking-tight">PlacementIQ</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="#features" className="text-muted-foreground hover:text-foreground transition">Features</Link>
          <Link href="#companies" className="text-muted-foreground hover:text-foreground transition">Companies</Link>
          <Link href="#reviews" className="text-muted-foreground hover:text-foreground transition">Reviews</Link>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:text-primary transition">Log in</Link>
          <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-full hover:bg-primary hover:text-white transition shadow-lg">Sign up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center relative">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-border backdrop-blur-md text-sm mb-8 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="font-medium text-muted-foreground">AI-Powered Career Mentor Now Live</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.1] mb-6"
        >
          Decode Placement Trends <br/>
          <span className="gradient-text">Before Everyone Else</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Access real interview experiences, placement analytics, salary trends, preparation resources, and AI-powered career guidance.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard" className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group">
            Explore Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/demo" className="px-8 py-4 bg-white border border-border text-foreground rounded-full font-medium hover:bg-gray-50 transition shadow-sm flex items-center justify-center">
            Watch Demo
          </Link>
        </motion.div>
      </section>

      {/* Bento Grid Dashboard Layout preview */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]"
        >
          {/* Card 1 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between md:col-span-2 group hover:border-primary/30 transition-colors">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">+24% this week</span>
            </div>
            <div>
              <h3 className="text-muted-foreground font-medium mb-1">Total Companies Visited</h3>
              <p className="text-4xl font-bold">142</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between group hover:border-secondary/30 transition-colors">
             <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <TrendingUp className="w-6 h-6" />
              </div>
            <div>
              <h3 className="text-muted-foreground font-medium mb-1">Highest Package</h3>
              <p className="text-4xl font-bold">54 <span className="text-xl text-muted-foreground">LPA</span></p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between group hover:border-accent/30 transition-colors">
            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-muted-foreground font-medium mb-1">Interview Experiences</h3>
              <p className="text-4xl font-bold">1,204+</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between md:col-span-2 relative overflow-hidden group hover:border-primary/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 z-10">
                <Users className="w-6 h-6" />
            </div>
            <div className="z-10">
              <h3 className="text-muted-foreground font-medium mb-1">Overall Selection Rate</h3>
              <div className="flex items-end gap-4">
                <p className="text-5xl font-bold">68.5%</p>
                <div className="flex-1 max-w-xs mb-2">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[68.5%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Floating AI Orb placeholder */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full shadow-2xl flex items-center justify-center text-white relative z-10 transform group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
