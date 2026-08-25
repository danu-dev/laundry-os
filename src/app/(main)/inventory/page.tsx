import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inventoryItems = [
  { id: 1, name: "Deterjen Cair", qty: 8, unit: "liter", status: "low", minStock: 10 },
  { id: 2, name: "Pewangi Premium", qty: 25, unit: "liter", status: "safe", minStock: 15 },
  { id: 3, name: "Plastik 30x40", qty: 120, unit: "pcs", status: "safe", minStock: 50 },
  { id: 4, name: "Hanger Plastik", qty: 45, unit: "pcs", status: "low", minStock: 100 },
  { id: 5, name: "Nota Bon", qty: 3, unit: "buku", status: "low", minStock: 5 },
  { id: 6, name: "Tag Laundry", qty: 800, unit: "pcs", status: "safe", minStock: 200 },
];

export default function InventoryPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Inventory</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Update Stok
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {inventoryItems.map((item) => (
          <Card key={item.id} className={`border-2 shadow-sm ${item.status === 'low' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200'}`}>
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900">{item.qty}</span>
                  <span className="text-gray-500 font-medium">{item.unit}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {item.status === 'low' ? (
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 gap-1 rounded-full px-2">
                    <AlertCircle className="w-3 h-3" />
                    Stok Rendah
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 rounded-full px-2">
                    <CheckCircle2 className="w-3 h-3" />
                    Aman
                  </Badge>
                )}
                <span className="text-xs text-gray-400 mt-2">Min. {item.minStock} {item.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}