"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Trophy, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

interface Customer {
  id: number;
  name: string;
  phone: string;
  orders_count: number;
  total_spending: number;
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const fetchCustomers = async (search = "") => {
    setLoading(true);
    try {
      let url = "/customers";
      if (search) url += `?search=${encodeURIComponent(search)}`;

      const response = await api.get(url);
      setCustomers(response.data.data || response.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers("");
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {
      fetchCustomers(value);
    }, 500));
  };

  const getLevelBadge = (ordersCount: number) => {
    if (ordersCount >= 10) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"><Trophy className="w-3 h-3 mr-1"/> VIP</Badge>;
    } else if (ordersCount >= 3) {
      return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-none">Regular</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none">New</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Customers</h2>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Cari nama atau nomor HP..."
          className="pl-9 h-10 rounded-xl bg-white border-gray-200"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      ) : customers.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-gray-500 font-medium">Pelanggan tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <Card key={customer.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{customer.name}</h3>
                      <p className="text-gray-500 text-sm font-medium mb-2">{customer.phone}</p>
                      {getLevelBadge(customer.orders_count || 0)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Orders</p>
                      <p className="font-bold text-gray-900">{customer.orders_count || 0}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Spent</p>
                      <p className="font-bold text-indigo-600">Rp{Number(customer.total_spending || 0).toLocaleString('id-ID')}</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
