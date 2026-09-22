import AccountMenu from "./account-menu";
import SideBarMenu from "./Side-bar-menu";
import { data } from "./menu-data";
import { auth } from "@/auth.config";

export default async function SideBar() {
  const session = await auth();

  return (
    <div className="flex flex-col h-screen sticky top-0 p-4 justify-between bg-white">
      <div className="space-y-6">
        {/* User Account Card */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-1 shadow-sm">
          <AccountMenu session={session} />
        </div>

        {/* Navigation Section */}
        <div className="px-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 px-3">
            Bookify Admin
          </p>
          <SideBarMenu items={data.navMain} />
        </div>
      </div>
    </div>
  );
}