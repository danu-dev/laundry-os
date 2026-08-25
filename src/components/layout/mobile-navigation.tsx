"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListOrdered, Users, MoreHorizontal, Plus } from "lucide-react";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            pathname === "/dashboard" ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link
          href="/orders"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            pathname.startsWith("/orders") && pathname !== "/orders/new"
              ? "text-indigo-600"
              : "text-gray-500"
          }`}
        >
          <ListOrdered className="w-6 h-6" />
          <span className="text-[10px] font-medium">Orders</span>
        </Link>

        {/* Primary Action Button */}
        <div className="relative -top-5 flex justify-center w-full">
          <Link
            href="/orders/new"
            className="flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <Plus className="w-8 h-8" strokeWidth={2.5} />
          </Link>
        </div>

        <Link
          href="/customers"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            pathname.startsWith("/customers") ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-[10px] font-medium">Customers</span>
        </Link>
        <Link
          href="/more"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
            pathname.startsWith("/more") ? "text-indigo-600" : "text-gray-500"
          }`}
        >
          <MoreHorizontal className="w-6 h-6" />
          <span className="text-[10px] font-medium">More</span>
        </Link>
      </div>
    </nav>
  );
}