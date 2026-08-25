"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserPlus, Minus, Plus, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock Data
const SERVICES = [
  { id: "s1", name: "Cuci", price: 7000, unit: "kg" },
  { id: "s2", name: "Cuci + Setrika", price: 10000, unit: "kg" },
  { id: "s3", name: "Express", price: 12000, unit: "kg" },
  { id: "s4", name: "Selimut", price: 25000, unit: "pcs" },
];

const ADDONS = [
  { id: "a1", name: "Pewangi Premium", price: 3000 },
  { id: "a2", name: "Express (1 Hari)", price: 10000 },
  { id: "a3", name: "Antar Jemput", price: 5000 },
];

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [customerSearch, setCustomerSearch] = useState("");

  // Order State
  const [selectedCustomer, setSelectedCustomer] = useState<{name: string, phone: string} | null>(null);
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [weight, setWeight] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  // Derived State
  const subtotal = (selectedService?.price || 0) * weight + selectedAddons.reduce((acc, id) => acc + (ADDONS.find(a => a.id === id)?.price || 0), 0);
  const change = Math.max(0, paymentAmount - subtotal);

  const handleSelectCustomer = (name: string, phone: string) => {
    setSelectedCustomer({ name, phone });
    setStep(2);
  };

  const handleSelectService = (service: typeof SERVICES[0]) => {
    setSelectedService(service);
    setStep(3);
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    // In a real app, this would hit an API.
    // For now, redirect to a mock track page.
    alert("Order berhasil disimpan!");
    router.push("/track/LD-260825-018");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 pb-24 md:pb-8">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Buat Order</h1>
        <div className="flex gap-1 ml-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-2 w-8 rounded-full ${s <= step ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-lg font-semibold text-gray-900">1. Pilih Customer</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cari nomor HP atau nama..."
              className="pl-10 h-12 text-lg rounded-xl border-gray-300"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
            />
          </div>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl border-dashed border-2 border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50"
            onClick={() => {
              if (!customerSearch.trim()) {
                alert("Silakan isi nomor HP/nama terlebih dahulu untuk membuat customer baru.");
                return;
              }
              handleSelectCustomer("Customer Baru", customerSearch || "-");
            }}
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Customer Baru {customerSearch && `(${customerSearch})`}
          </Button>

          {/* Dummy search results - simple implementation */}
          {customerSearch && customerSearch.toLowerCase() !== "andi" && (
             <Card className="cursor-pointer hover:border-indigo-600 transition-colors border-dashed" onClick={() => handleSelectCustomer("Customer Baru", customerSearch)}>
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <div className="font-bold text-gray-900">Tambahkan sebagai baru</div>
                   <div className="text-gray-500 text-sm">{customerSearch}</div>
                 </div>
               </CardContent>
             </Card>
          )}

          {(!customerSearch || customerSearch.toLowerCase().includes("andi")) && (
             <Card className="cursor-pointer hover:border-indigo-600 transition-colors" onClick={() => handleSelectCustomer("Andi Pratama", "081288889999")}>
               <CardContent className="p-4 flex items-center justify-between">
                 <div>
                   <div className="font-bold text-gray-900">Andi Pratama</div>
                   <div className="text-gray-500 text-sm">0812••••9999</div>
                 </div>
                 <div className="text-sm font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                   12 orders
                 </div>
               </CardContent>
             </Card>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">2. Pilih Layanan</h2>
            <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-gray-500">Ganti Customer</Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {SERVICES.map((s) => (
              <Card
                key={s.id}
                className={`cursor-pointer transition-all ${selectedService?.id === s.id ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/20' : 'hover:border-gray-300'}`}
                onClick={() => handleSelectService(s)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                  <div className="font-bold text-gray-900 mb-1">{s.name}</div>
                  <div className="text-sm text-gray-500">Rp{s.price.toLocaleString('id-ID')}/{s.unit}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
           <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">3. Berat & Tambahan</h2>
             <Button variant="ghost" size="sm" onClick={() => setStep(2)} className="text-gray-500">Ganti Layanan</Button>
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wider">Berat Laundry</div>
                <div className="flex items-center justify-center gap-6">
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-gray-300 text-gray-600" onClick={() => setWeight(Math.max(0.5, weight - 0.5))}>
                    <Minus className="w-6 h-6" />
                  </Button>
                  <div className="w-24 text-center">
                    <span className="text-5xl font-bold text-gray-900 tracking-tighter">{weight}</span>
                    <span className="text-xl text-gray-500 font-medium ml-1">kg</span>
                  </div>
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-gray-300 text-gray-600" onClick={() => setWeight(weight + 0.5)}>
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Harga dasar</span>
                <span className="font-bold text-gray-900 text-lg">Rp{((selectedService?.price || 0) * weight).toLocaleString('id-ID')}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Tambahan (Opsional)</h3>
            {ADDONS.map(addon => (
              <label key={addon.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${selectedAddons.includes(addon.id) ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                <div className="flex items-center gap-3">
                  {/* Make the checkbox hidden but functional for screen readers, while clicking the label toggles the state via React */}
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                  />
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${selectedAddons.includes(addon.id) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 bg-white'}`}>
                    {selectedAddons.includes(addon.id) && <Check className="w-4 h-4" strokeWidth={3} />}
                  </div>
                  <span className="font-medium text-gray-900">{addon.name}</span>
                </div>
                <span className="text-gray-600">+Rp{addon.price.toLocaleString('id-ID')}</span>
              </label>
            ))}
          </div>

          <Button className="w-full h-14 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setStep(4)}>
            Lanjut ke Pembayaran
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
           <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">4. Ringkasan & Bayar</h2>
            <Button variant="ghost" size="sm" onClick={() => setStep(3)} className="text-gray-500">Edit Order</Button>
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="font-bold text-gray-900">{selectedCustomer?.name}</div>
                <div className="text-sm text-gray-500">{selectedCustomer?.phone}</div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium text-gray-900">{selectedService?.name}</div>
                    <div className="text-sm text-gray-500">{weight} {selectedService?.unit} x Rp{selectedService?.price.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="font-medium text-gray-900">Rp{((selectedService?.price || 0) * weight).toLocaleString('id-ID')}</div>
                </div>

                {selectedAddons.map(id => {
                  const addon = ADDONS.find(a => a.id === id);
                  if (!addon) return null;
                  return (
                    <div key={id} className="flex justify-between text-sm">
                      <div className="text-gray-600">{addon.name}</div>
                      <div className="text-gray-900">Rp{addon.price.toLocaleString('id-ID')}</div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Total</span>
                  <span className="font-bold text-2xl text-indigo-700">Rp{subtotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Uang Diterima</h3>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
              <Input
                type="number"
                className="pl-12 h-14 text-xl font-bold rounded-xl border-gray-300"
                value={paymentAmount || ''}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                placeholder={subtotal.toString()}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setPaymentAmount(subtotal)}>Uang Pas</Button>
              <Button variant="outline" className="flex-1" onClick={() => setPaymentAmount(Math.ceil(subtotal / 50000) * 50000)}>50rb</Button>
              <Button variant="outline" className="flex-1" onClick={() => setPaymentAmount(Math.ceil(subtotal / 100000) * 100000)}>100rb</Button>
            </div>
          </div>

          {paymentAmount > subtotal && (
             <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
               <span className="text-emerald-800 font-medium">Kembalian</span>
               <span className="font-bold text-xl text-emerald-700">Rp{change.toLocaleString('id-ID')}</span>
             </div>
          )}

          <Button
            className="w-full h-14 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
            onClick={handleSubmit}
          >
            Simpan Order
          </Button>
        </div>
      )}
    </div>
  );
}
