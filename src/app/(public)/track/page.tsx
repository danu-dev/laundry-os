"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TrackSearchPage() {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      router.push(`/track/${orderNumber.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 md:p-8 space-y-6">
        <div className="text-center space-y-2">
           <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
             L
           </div>
          <h1 className="text-2xl font-bold text-gray-900">Cek Status Laundry</h1>
          <p className="text-gray-500 text-sm">Masukkan nomor order untuk melihat status pesanan Anda saat ini.</p>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Contoh: LD-260825-018"
              className="pl-10 h-14 text-lg bg-gray-50 border-gray-200 rounded-xl uppercase"
            />
          </div>
          <Button type="submit" className="w-full h-14 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20">
            Cari Order
          </Button>
        </form>
      </div>
    </div>
  );
}