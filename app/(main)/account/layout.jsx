import React from 'react';

import { Toaster } from '@/components/ui/toaster';
import AccountSidebar from './components/accountSidebar';

export default function AccountLayout({ children}) {
  return (
<div className='bg-slate-50 '>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-10 lg:grid-cols-12 w-[82vw] mx-auto py-10 bg-slate-50">
      {/* Sidebar */}
      <aside className="col-span-12 h-[320px] md:h-[320px] md:col-span-3 lg:col-span-3  bg-white shadow-md rounded-sm">
         <AccountSidebar/>
      </aside>
	  {/* <Separator orientation="vertical" className="hidden md:block col-span-1"/>
	  <Separator className="block md:hidden col-span-0 my-4"/> */}
      {/* Main Content */}
      <main className="col-span-12 md:col-span-7 lg:col-span-9 py-4 backdrop-blur-xl bg-white/50 shadow-md rounded-sm">
        {children}
        <Toaster/>
      </main>
    </div>

    </div>
  );
}
