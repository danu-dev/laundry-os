import { Card, CardContent } from "@/components/ui/card";
import { Search, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockCustomers = [
  { name: "Andi Pratama", phone: "0812••••8899", orders: 12, spent: 840000, level: "VIP" },
  { name: "Sari", phone: "0813••••2241", orders: 8, spent: 520000, level: "Regular" },
  { name: "Budi Santoso", phone: "0857••••1234", orders: 3, spent: 150000, level: "Regular" },
  { name: "Joko", phone: "0811••••9999", orders: 1, spent: 25000, level: "New" },
];

export default function CustomersPage() {
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "VIP": return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-none"><Trophy className="w-3 h-3 mr-1"/> VIP</Badge>;
      case "Regular": return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-none">Regular</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none">New</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Customers</h2>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input placeholder="Cari nama atau nomor HP..." className="pl-9 h-10 rounded-xl bg-white border-gray-200" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCustomers.map((customer, idx) => (
          <Card key={idx} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{customer.name}</h3>
                    <p className="text-gray-500 text-sm font-medium mb-2">{customer.phone}</p>
                    {getLevelBadge(customer.level)}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold border border-indigo-100">
                    {customer.name.charAt(0)}
                  </div>
               </div>

               <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Orders</p>
                    <p className="font-bold text-gray-900">{customer.orders}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Spent</p>
                    <p className="font-bold text-indigo-600">Rp{customer.spent.toLocaleString('id-ID')}</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}