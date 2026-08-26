"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Plus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  minimum_stock: number;
  status: 'low' | 'ok';
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await api.get('/inventory');
        setItems(response.data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Inventory</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Update Stok
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-gray-500 font-medium">Belum ada data inventori.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className={`border-2 shadow-sm ${item.status === 'low' ? 'border-amber-200 bg-amber-50/30' : 'border-gray-200 hover:border-gray-300 transition-colors'}`}>
              <CardContent className="p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-black text-gray-900">{Number(item.quantity)}</span>
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
                  <span className="text-xs text-gray-400 mt-2">Min. {Number(item.minimum_stock)} {item.unit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
