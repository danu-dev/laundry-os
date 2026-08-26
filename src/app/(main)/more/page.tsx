"use client";

import { useAuthStore } from "@/hooks/use-auth";
import api from "@/lib/api";
import { LogOut, Settings, BarChart3, Box, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function MorePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

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

  const menuItems = [
    { icon: BarChart3, label: "Laporan Keuangan", href: "/finance", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Box, label: "Inventori", href: "/inventory", color: "text-amber-600", bg: "bg-amber-50" },
    { icon: CreditCard, label: "Layanan & Harga", href: "/services", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: ShieldCheck, label: "Kelola Pegawai", href: "/staff", color: "text-purple-600", bg: "bg-purple-50", ownerOnly: true },
    { icon: Settings, label: "Pengaturan Outlet", href: "/settings", color: "text-gray-600", bg: "bg-gray-100" },
  ];

  return (
    <div className="flex-1 p-4 pb-24 max-w-lg mx-auto w-full space-y-6 pt-6">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xl">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">{user?.name || 'User'}</h2>
          <p className="text-sm text-gray-500 capitalize">{user?.role?.toLowerCase() || 'Role'} • {user?.outlet?.name}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 px-1">Menu Utama</h3>
        <Card className="border-gray-100 shadow-sm overflow-hidden">
          <CardContent className="p-0 divide-y divide-gray-100">
            {menuItems.map((item, i) => {
              if (item.ownerOnly && user?.role !== 'OWNER') return null;

              return (
                <Link key={i} href={item.href} className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${item.bg}`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 font-medium text-gray-700">{item.label}</div>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4 pt-4">
        <Card className="border-gray-100 shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-4 hover:bg-red-50 active:bg-red-100 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-red-50">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1 font-semibold text-red-600">Keluar dari Akun</div>
            </button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-xs text-gray-400 mt-8">
        LaundryOS v0.1.0
      </div>
    </div>
  );
}
