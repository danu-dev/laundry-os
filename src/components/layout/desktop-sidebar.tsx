"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ListOrdered,
  Users,
  Settings,
  BarChart3,
  Box,
  Plus,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/hooks/use-auth";
import api from "@/lib/api";

export function DesktopSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Logout failed on server", error);
    } finally {
      logout();
      router.push("/login");
    }
  };

  const links = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/orders", icon: ListOrdered, label: "Orders" },
    { href: "/customers", icon: Users, label: "Customers" },
    { href: "/finance", icon: BarChart3, label: "Finance" },
    { href: "/inventory", icon: Box, label: "Inventory" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            L
          </div>
          LaundryOS
        </h1>
      </div>

      <div className="px-4 pb-4">
        <Link href="/orders/new">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 shadow-sm font-semibold">
            <Plus className="w-5 h-5 mr-2" />
            New Order
          </Button>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/dashboard');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <link.icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 truncate max-w-[100px]">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase() || 'Role'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Keluar"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
