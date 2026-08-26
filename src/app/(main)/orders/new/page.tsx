"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UserPlus, Minus, Plus, ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Service {
  id: number;
  name: string;
  price: string | number;
  unit: string;
}

interface Customer {
  id: number;
  name: string;
  phone: string;
  orders_count: number;
}

export default function NewOrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // New Customer Form State
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");

  // Order State
  const [selectedCustomer, setSelectedCustomer] = useState<{id?: number, name: string, phone: string} | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [weight, setWeight] = useState<number>(1);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data)).catch(console.error);
    fetchCustomers("");
  }, []);

  const fetchCustomers = async (search: string) => {
    setSearching(true);
    try {
      const res = await api.get(`/customers?search=${encodeURIComponent(search)}`);
      setCustomers(res.data.data || res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const handleCustomerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerSearch(val);

    // Auto-fill new customer form based on what they typed
    if (/^[0-9]+$/.test(val)) {
      setNewCustomerPhone(val);
      setNewCustomerName(""); // They typed a phone number
    } else {
      setNewCustomerName(val);
      setNewCustomerPhone(""); // They typed a name
    }

    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => fetchCustomers(val), 500));
  };

  const servicePrice = Number(selectedService?.price || 0);
  const subtotal = servicePrice * weight;
  const change = Math.max(0, paymentAmount - subtotal);

  const handleSelectCustomer = (customer: {id?: number, name: string, phone: string}) => {
    setSelectedCustomer(customer);
    setIsAddingNewCustomer(false);
    setStep(2);
  };

  const handleSaveNewCustomer = () => {
    if (!newCustomerName.trim() || !newCustomerPhone.trim()) {
      alert("Nama dan nomor HP wajib diisi untuk pelanggan baru.");
      return;
    }
    handleSelectCustomer({
      name: newCustomerName.trim(),
      phone: newCustomerPhone.trim()
    });
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let customerId = selectedCustomer?.id;

      if (!customerId) {
        const res = await api.post('/customers', {
          name: selectedCustomer?.name,
          phone: selectedCustomer?.phone,
        });
        customerId = res.data.id;
      }

      const res = await api.post('/orders', {
        customer_id: customerId,
        items: [{
          service_id: selectedService?.id,
          quantity: weight
        }],
        amount_paid: paymentAmount || 0,
        payment_method: "Cash"
      });

      const orderNumber = res.data.order_number;
      router.push(`/track/${orderNumber}`);
    } catch (error: any) {
      console.error("Failed to create order:", error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menyimpan order.");
    } finally {
      setLoading(false);
    }
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

          {!isAddingNewCustomer ? (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Cari nomor HP atau nama..."
                  className="pl-10 h-12 text-lg rounded-xl border-gray-300"
                  value={customerSearch}
                  onChange={handleCustomerSearch}
                />
              </div>

              {customerSearch && customers.length === 0 && !searching && (
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl border-dashed border-2 border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50"
                  onClick={() => setIsAddingNewCustomer(true)}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Tambahkan "{customerSearch}" sebagai Pelanggan Baru
                </Button>
              )}

              {searching ? (
                 <div className="flex justify-center p-4"><Loader2 className="animate-spin text-indigo-600 w-6 h-6" /></div>
              ) : (
                <div className="space-y-3 mt-4">
                  {customers.map((c) => (
                    <Card key={c.id} className="cursor-pointer hover:border-indigo-600 transition-colors" onClick={() => handleSelectCustomer(c)}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900">{c.name}</div>
                          <div className="text-gray-500 text-sm">{c.phone}</div>
                        </div>
                        <div className="text-sm font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          {c.orders_count || 0} orders
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {!customerSearch && (
                 <Button
                  variant="ghost"
                  className="w-full text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                  onClick={() => setIsAddingNewCustomer(true)}
                 >
                   <Plus className="w-4 h-4 mr-2" /> Buat Pelanggan Baru Manual
                 </Button>
              )}
            </>
          ) : (
            <Card className="border-indigo-200 shadow-sm border-2 animate-in zoom-in-95 duration-200">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-indigo-900 flex items-center">
                    <UserPlus className="w-5 h-5 mr-2 text-indigo-600" />
                    Data Pelanggan Baru
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsAddingNewCustomer(false)} className="text-gray-500 h-8">
                    Batal
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Lengkap</label>
                    <Input
                      placeholder="Masukkan nama pelanggan"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      className="h-11 bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Nomor HP/WhatsApp</label>
                    <Input
                      placeholder="Contoh: 08123456789"
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                      className="h-11 bg-gray-50 border-gray-200"
                      type="tel"
                    />
                  </div>

                  <Button
                    className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white mt-2"
                    onClick={handleSaveNewCustomer}
                  >
                    Simpan & Lanjut
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
            {services.map((s) => (
              <Card
                key={s.id}
                className={`cursor-pointer transition-all ${selectedService?.id === s.id ? 'border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/20' : 'hover:border-gray-300'}`}
                onClick={() => handleSelectService(s)}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-28">
                  <div className="font-bold text-gray-900 mb-1">{s.name}</div>
                  <div className="text-sm text-gray-500">Rp{Number(s.price).toLocaleString('id-ID')}/{s.unit}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
           <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">3. Berat</h2>
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
                    <span className="text-xl text-gray-500 font-medium ml-1">{selectedService?.unit || 'kg'}</span>
                  </div>
                  <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-gray-300 text-gray-600" onClick={() => setWeight(weight + 0.5)}>
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="font-bold text-gray-900 text-lg">Rp{(servicePrice * weight).toLocaleString('id-ID')}</span>
              </div>
            </CardContent>
          </Card>

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
                    <div className="text-sm text-gray-500">{weight} {selectedService?.unit} x Rp{servicePrice.toLocaleString('id-ID')}</div>
                  </div>
                  <div className="font-medium text-gray-900">Rp{(servicePrice * weight).toLocaleString('id-ID')}</div>
                </div>
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
            disabled={loading}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            Simpan Order
          </Button>
        </div>
      )}
    </div>
  );
}
