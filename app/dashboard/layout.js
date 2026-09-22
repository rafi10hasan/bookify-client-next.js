import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import SideBar from "./_components/SideBar";
import Mobilesidebar from "./_components/mobile-sidebar";

export default async function DashboardLayout({ children }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-100/70 text-gray-800">
      {/* Mobile Sidebar */}
      <Mobilesidebar />

      {/* Desktop Sidebar Container - Clean White Look */}
      <aside className="hidden xl:block w-72 shrink-0 border-r border-gray-200 bg-white">
        <SideBar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
        <Toaster />
      </main>
    </div>
  );
}