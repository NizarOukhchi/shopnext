import { getAuthToken } from "@/app/auth";
import { DashboardSidebar } from "@/app/(dashboard)/DashboardSidebar";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();
  if (!token) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <DashboardSidebar>
        <div className="flex flex-1 py-4 pr-4">
          <div className="rounded-2xl shadow-1 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
            {children}
          </div>
        </div>
      </DashboardSidebar>
    </div>
  );
}
