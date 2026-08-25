import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, Clock, CheckCircle2, ListOrdered, Calendar } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const urgentOrders = [
    { id: "LD-018", name: "Andi", service: "Cuci", weight: "4.2 kg", status: "WASHING" },
    { id: "LD-019", name: "Sari", service: "Setrika", weight: "2.0 kg", status: "IRONING" },
    { id: "LD-020", name: "Dimas", service: "Cuci + Setrika", weight: "—", status: "READY" },
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Welcome Header Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-0 shadow-md">
        <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Selamat Pagi, Budi 👋
            </h2>
            <p className="text-indigo-100 max-w-lg">
              Berikut adalah ringkasan operasional laundry Anda hari ini. Ada 12 pesanan yang siap untuk diambil oleh pelanggan.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm">
             <Calendar className="w-5 h-5 text-indigo-100" />
             <div className="text-sm font-medium">26 Agustus 2026</div>
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
            <div className="text-3xl font-bold text-gray-900">{formatRupiah(1240000)}</div>
            <p className="text-xs text-emerald-600 flex items-center font-medium mt-2 bg-emerald-50 w-fit px-2 py-1 rounded-md">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.4% vs kemarin
            </p>
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
            <div className="text-2xl font-bold text-gray-900">34</div>
            <p className="text-xs text-gray-500 mt-2">Sedang diproses: <span className="font-semibold text-gray-700">12</span></p>
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
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-amber-600 mt-2 font-medium">Harus segera di-WA</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Orders List */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100">
          <CardTitle className="text-lg font-bold text-gray-900">Order Perlu Perhatian</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {urgentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 text-sm">{order.id}</span>
                    <span className="text-gray-900 font-medium text-sm">{order.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.service} • {order.weight}
                  </div>
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className={`
                      ${order.status === 'READY' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                      ${order.status === 'WASHING' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${order.status === 'IRONING' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                      font-semibold rounded-full px-3
                    `}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
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
