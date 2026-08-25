"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const mockOrders = [
  { id: "LD-260825-018", name: "Andi Pratama", details: "4.5 kg · Cuci + Setrika", price: 31500, time: "Dibuat 09:32", status: "READY" },
  { id: "LD-260825-017", name: "Sari", details: "2.0 kg · Setrika", price: 20000, time: "Dibuat 08:15", status: "IRONING" },
  { id: "LD-260825-016", name: "Budi", details: "3.5 kg · Cuci", price: 24500, time: "Dibuat 07:30", status: "WASHING" },
  { id: "LD-260824-015", name: "Citra", details: "1 pcs · Selimut", price: 25000, time: "Dibuat Kemarin", status: "COMPLETED" },
];

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Orders</h2>
        <Link href="/orders/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hidden md:flex">
            <Plus className="w-5 h-5 mr-2" />
            New Order
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Cari nomor order / nama / HP..." className="pl-9 h-10 rounded-xl bg-white border-gray-200" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
           <Button variant="outline" className="rounded-full bg-indigo-50 text-indigo-700 border-indigo-200 shrink-0">All</Button>
           <Button variant="outline" className="rounded-full bg-white text-gray-600 border-gray-200 shrink-0">New</Button>
           <Button variant="outline" className="rounded-full bg-white text-gray-600 border-gray-200 shrink-0">Processing</Button>
           <Button variant="outline" className="rounded-full bg-white text-gray-600 border-gray-200 shrink-0">Ready</Button>
           <Button variant="outline" className="rounded-full bg-white text-gray-600 border-gray-200 shrink-0">Completed</Button>
        </div>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id} className="border-gray-200 shadow-sm hover:border-indigo-200 transition-colors cursor-pointer">
            <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-start justify-between sm:justify-start sm:gap-4">
                  <div className="font-mono text-sm font-semibold text-indigo-600">{order.id}</div>
                  <Badge
                    variant="outline"
                    className={`
                      ${order.status === 'READY' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}
                      ${order.status === 'WASHING' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                      ${order.status === 'IRONING' ? 'bg-amber-50 text-amber-700 border-amber-200' : ''}
                      ${order.status === 'COMPLETED' ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}
                      font-semibold rounded-full px-2.5 py-0.5 text-xs
                    `}
                  >
                    {order.status}
                  </Badge>
                </div>
                <div>
                   <div className="font-bold text-gray-900 text-lg">{order.name}</div>
                   <div className="text-sm text-gray-600 font-medium">{order.details}</div>
                </div>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                 <div className="text-lg font-bold text-gray-900">Rp{order.price.toLocaleString('id-ID')}</div>
                 <div className="text-xs text-gray-500 mt-1">{order.time}</div>
                 {order.status === 'READY' && (
                    <div className="mt-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto text-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          onClick={(e) => {
                             e.stopPropagation();
                             alert(`WhatsApp template:\n\nHalo ${order.name}, laundry dengan nomor ${order.id} sudah selesai dan siap diambil. Total pembayaran Rp${order.price.toLocaleString('id-ID')}.`);
                          }}
                        >
                          Kirim WhatsApp
                        </Button>
                    </div>
                 )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}