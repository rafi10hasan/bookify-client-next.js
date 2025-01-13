
import AccountMenu from "./account-menu";
import SideBarMenu from "./Side-bar-menu";
import {data} from './menu-data'
import { auth } from "@/auth.config";
// This is sample data.

export default async function SideBar() {
  const session = await auth()
  return (
    <div className="p-4 max-h-screen h-[100vh] bg-slate-50 hidden xl:block">
      <AccountMenu session={session}/>

      <SideBarMenu items={data.navMain} />
      {/* /* <NavProjects projects={data.projects} /> */}
    </div>
  );
}
