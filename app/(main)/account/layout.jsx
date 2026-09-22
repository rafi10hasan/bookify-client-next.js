import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import AccountSidebar from './components/accountSidebar';

export default function AccountLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/60 py-8 md:py-12">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Sidebar Area */}
          <aside className="md:col-span-4 lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sticky top-6">
            <AccountSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-8 lg:col-span-9 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 min-h-[500px]">
            {children}
            <Toaster />
          </main>

        </div>
      </div>
    </div>
  );
}