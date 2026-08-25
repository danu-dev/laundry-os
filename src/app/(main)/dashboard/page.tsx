import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, TrendingUp, Clock, CheckCircle2, ListOrdered } from "lucide-react";
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
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          Good morning, Budi 👋
        </h2>
        {/* Mobile quick add button - hidden on desktop where sidebar has one */}
        <div className="md:hidden">
            <Link href="/orders/new" className="text-indigo-600 font-semibold flex items-center gap-1 text-sm bg-indigo-50 px-3 py-1.5 rounded-full">
                <span>+ Order</span>
            </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="border-gray-200 shadow-sm col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Today's Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{formatRupiah(1240000)}</div>
            <p className="text-xs text-emerald-600 flex items-center font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.4% vs yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Orders Today
            </CardTitle>
            <ListOrdered className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">34</div>
            <p className="text-xs text-gray-500 mt-1">12 pending</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Ready to Pickup
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-gray-500 mt-1">4 just finished</p>
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
