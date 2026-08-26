"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Loader2, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: number;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  customer: {
    name: string;
    phone: string;
  };
  items: Array<{
    quantity: number;
    unit: string;
    service: {
      name: string;
    };
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

export default function OrdersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchOrders = async (search = "", statusFilter = "All") => {
    setLoading(true);
    try {
      let url = "/orders?";
      if (search) url += `search=${encodeURIComponent(search)}&`;

      let backendStatus = "";
      if (statusFilter === "New") backendStatus = "NEW";
      else if (statusFilter === "Ready") backendStatus = "READY";
      else if (statusFilter === "Completed") backendStatus = "COMPLETED";

      if (backendStatus) url += `status=${backendStatus}&`;

      const response = await api.get(url);
      setOrders(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders("", filter);
  }, [filter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      fetchOrders(value, filter);
    }, 500));
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Gagal mengubah status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const displayedOrders = filter === "Processing"
    ? orders.filter(o => ["WASHING", "IRONING", "NEW"].includes(o.status))
    : orders;

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

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Orders</h2>
        <Link href="/orders/new" className="hidden md:block">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
            <Plus className="w-5 h-5 mr-2" />
            New Order
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Cari nomor order / nama / HP..."
            className="pl-9 h-11 sm:h-10 rounded-xl bg-white border-gray-200"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
           {["All", "New", "Processing", "Ready", "Completed"].map(status => (
             <Button
               key={status}
               variant="outline"
               className={`rounded-full shrink-0 h-9 px-4 ${filter === status ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-gray-600 border-gray-200'}`}
               onClick={() => setFilter(status)}
             >
               {status}
             </Button>
           ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : displayedOrders.length === 0 ? (
          <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-500 font-medium">Order tidak ditemukan.</p>
          </div>
        ) : (
          displayedOrders.map((order) => {
            const mainItem = order.items[0];
            const details = mainItem
              ? `${mainItem.quantity} ${mainItem.unit} · ${mainItem.service?.name} ${order.items.length > 1 ? `(+${order.items.length - 1} item)` : ''}`
              : "No items";

            const createdTime = new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const createdDate = new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

            return (
              <Card
                key={order.id}
                className="border-gray-200 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer overflow-visible"
                onClick={() => router.push(`/track/${order.order_number}`)}
              >
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-start justify-between sm:justify-start sm:gap-4">
                      <div className="font-mono text-sm font-semibold text-indigo-600 mt-1">{order.order_number}</div>

                      <div onClick={(e) => e.stopPropagation()}>
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
                          <DropdownMenuContent align="start" className="w-40 rounded-xl">
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
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{order.customer.name}</div>
                      <div className="text-sm text-gray-600 font-medium">{details}</div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                    <div className="text-lg font-bold text-gray-900">
                      Rp{Number(order.total).toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Dibuat {createdDate} {createdTime}</div>
                    {order.status === 'READY' && (
                        <div className="mt-2 w-full sm:w-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full sm:w-auto text-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                const msg = `Halo ${order.customer.name}, laundry dengan nomor ${order.order_number} sudah selesai dan siap diambil. Total pembayaran Rp${Number(order.total).toLocaleString('id-ID')}.`;
                                window.open(`https://wa.me/${order.customer.phone.replace(/^0/, '62')}?text=${encodeURIComponent(msg)}`, '_blank');
                              }}
                            >
                              Kirim WhatsApp
                            </Button>
                        </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
