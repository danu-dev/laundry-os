import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { DesktopSidebar } from "@/components/layout/desktop-sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DesktopSidebar />
      <main className="flex-1 pb-20 md:pb-0 w-full max-w-full overflow-x-hidden">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
}