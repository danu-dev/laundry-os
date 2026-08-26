"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, Clock, CheckCircle2, ListOrdered, Calendar, Loader2, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { useAuthStore } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardData {
  metrics: {
    today_revenue: number;
    today_orders: number;
    ready_orders: number;
    processing_orders: number;
  };
  needs_attention: Array<{
    id: number;
    order_number: string;
    status: string;
    customer: { name: string };
    items: Array<{ quantity: number, unit: string, service: { name: string } }>;
  }>;
}

const STATUS_OPTIONS = [
  { value: "NEW", label: "NEW" },
  { value: "WASHING", label: "WASHING" },
  { value: "IRONING", label: "IRONING" },
  { value: "READY", label: "READY" },
  { value: "COMPLETED", label: "COMPLETED" },
  { value: "CANCELLED", label: "CANCELLED" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { user } = useAuthStore();

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard');
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchDashboard();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      // Refetch dashboard to update metrics and lists correctly
      await fetchDashboard();
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Gagal mengubah status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'READY': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'WASHING': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'IRONING': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'COMPLETED': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'CANCELLED': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading && !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Welcome Header Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-0 shadow-md">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Selamat Pagi, {user?.name.split(' ')[0] || 'User'} 👋
            </h2>
            <p className="text-indigo-100 max-w-lg">
              Berikut adalah ringkasan operasional laundry Anda hari ini. {data?.metrics.ready_orders ? `Ada ${data.metrics.ready_orders} pesanan yang siap untuk diambil oleh pelanggan.` : "Semua pesanan terkendali."}
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm">
             <Calendar className="w-5 h-5 text-indigo-100" />
             <div className="text-sm font-medium">
               {mounted ? currentDate : "Loading..."}
             </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-gray-900">
          Ringkasan Hari Ini
        </h3>
        {/* Mobile quick add button - hidden on desktop where sidebar has one */}
        <div className="md:hidden">
            <Link href="/orders/new" className="text-indigo-600 font-semibold flex items-center gap-1 text-sm bg-indigo-50 px-3 py-1.5 rounded-full">
                <span className="flex items-center justify-center w-5 h-5 bg-indigo-100 rounded-full mr-1">+</span> Order Baru
            </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-gray-200 shadow-sm col-span-2 md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Pendapatan Hari Ini
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
               <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{formatRupiah(data?.metrics.today_revenue || 0)}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Order Masuk
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
               <ListOrdered className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data?.metrics.today_orders || 0}</div>
            <p className="text-xs text-gray-500 mt-2">Sedang diproses: <span className="font-semibold text-gray-700">{data?.metrics.processing_orders || 0}</span></p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Siap Diambil
            </CardTitle>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{data?.metrics.ready_orders || 0}</div>
            {data?.metrics.ready_orders ? (
              <p className="text-xs text-amber-600 mt-2 font-medium">Harus segera di-WA</p>
            ) : (
              <p className="text-xs text-gray-500 mt-2">Belum ada order siap</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Urgent Orders List */}
      <Card className="border-gray-200 shadow-sm overflow-visible">
        <CardHeader className="pb-3 border-b border-gray-100">
          <CardTitle className="text-lg font-bold text-gray-900">Order Perlu Perhatian</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {data?.needs_attention && data.needs_attention.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {data.needs_attention.map((order) => {
                const mainItem = order.items[0];
                const serviceName = mainItem?.service?.name || "Order";
                const weight = mainItem ? `${mainItem.quantity} ${mainItem.unit}` : "—";

                return (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{order.order_number}</span>
                        <span className="text-gray-900 font-medium text-sm">{order.customer.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {serviceName} • {weight} {order.items.length > 1 && `(+${order.items.length - 1} item)`}
                      </div>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(order.status)} font-semibold rounded-full px-2.5 py-1 text-xs cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1`}
                          >
                            {updatingId === order.id ? (
                              <Loader2 className="w-3 h-3 animate-spin mr-1" />
                            ) : null}
                            {order.status}
                            <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          {STATUS_OPTIONS.map((status) => (
                            <DropdownMenuItem
                              key={status.value}
                              className="flex justify-between items-center cursor-pointer"
                              onClick={() => handleStatusChange(order.id, status.value)}
                            >
                              {status.label}
                              {order.status === status.value && <Check className="w-4 h-4 text-indigo-600" />}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Belum ada order hari ini. Mulai dengan membuat order pertama.
            </div>
          )}
          <div className="p-4 border-t border-gray-100">
             <Link href="/orders" className="text-sm font-semibold text-indigo-600 flex items-center justify-center w-full">
                Lihat semua order →
             </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
