"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, ArrowDownRight, Wallet, Receipt, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const recentExpenses = [
  { id: 1, category: "Supplies", desc: "Beli deterjen 20L", amount: 250000, date: "Hari ini" },
  { id: 2, category: "Electricity", desc: "Token Listrik", amount: 500000, date: "Kemarin" },
  { id: 3, category: "Other", desc: "Plastik kresek", amount: 45000, date: "23 Aug" },
];

export default function FinancePage() {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Finance</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-gray-200 shadow-sm md:col-span-2">
          <CardContent className="p-6">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Revenue (Bulan ini)</p>
                 <div className="text-4xl font-black text-gray-900">{formatRupiah(14500000)}</div>
                 <div className="flex items-center gap-1 text-emerald-600 font-medium mt-2 text-sm">
                   <ArrowUpRight className="w-4 h-4" />
                   <span>+8.2% dari bulan lalu</span>
                 </div>
               </div>
               <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                 <TrendingUp className="w-6 h-6 text-indigo-600" />
               </div>
             </div>

             <div className="mt-8 pt-6 border-t border-gray-100 flex gap-8">
               <div>
                 <p className="text-xs text-gray-500 mb-1">Cash</p>
                 <p className="font-bold text-gray-900">{formatRupiah(4200000)}</p>
               </div>
               <div>
                 <p className="text-xs text-gray-500 mb-1">Transfer/QRIS</p>
                 <p className="font-bold text-gray-900">{formatRupiah(10300000)}</p>
               </div>
             </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
          <CardContent className="p-6 flex flex-col h-full justify-between">
            <div>
               <p className="text-sm font-medium text-indigo-200 uppercase tracking-wider mb-2">Estimated Net</p>
               <div className="text-3xl font-black">{formatRupiah(8200000)}</div>
               <p className="text-xs text-indigo-200 mt-2 flex items-center gap-1">
                 <AlertCircleIcon className="w-3 h-3" />
                 *Berdasarkan biaya yang tercatat
               </p>
            </div>
            <div className="mt-6 pt-4 border-t border-indigo-500/30">
               <p className="text-xs text-indigo-200 mb-1">Total Pengeluaran</p>
               <p className="font-bold text-lg">{formatRupiah(6300000)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="expenses" className="w-full mt-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-gray-100/50">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="sales">Sales History</TabsTrigger>
          </TabsList>

          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Pengeluaran
          </Button>
        </div>

        <TabsContent value="expenses" className="space-y-4 outline-none">
          {recentExpenses.map((expense) => (
             <Card key={expense.id} className="border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
               <CardContent className="p-4 flex items-center justify-between">
                 <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                     <Receipt className="w-5 h-5 text-red-500" />
                   </div>
                   <div>
                     <p className="font-bold text-gray-900">{expense.desc}</p>
                     <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-gray-900 text-lg flex items-center gap-1">
                     <ArrowDownRight className="w-4 h-4 text-red-500" />
                     {formatRupiah(expense.amount)}
                   </p>
                 </div>
               </CardContent>
             </Card>
          ))}
        </TabsContent>
        <TabsContent value="sales" className="outline-none">
           <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-xl">
             Riwayat penjualan harian akan tampil di sini.
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AlertCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}
