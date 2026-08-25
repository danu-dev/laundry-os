"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save, Store, Bell, Printer, Receipt } from "lucide-react";

export default function SettingsPage() {
  const handleSave = () => {
    alert("Pengaturan berhasil disimpan!");
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8 max-w-5xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Settings</h2>
           <p className="text-gray-500 text-sm mt-1">Kelola preferensi dan operasional outlet Anda.</p>
        </div>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm hidden md:flex">
          <Save className="w-4 h-4 mr-2" />
          Simpan Perubahan
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-gray-100/50 mb-6 flex flex-wrap h-auto p-1">
          <TabsTrigger value="general" className="flex-1 min-w-[120px] py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
             <Store className="w-4 h-4 mr-2" /> Outlet
          </TabsTrigger>
          <TabsTrigger value="services" className="flex-1 min-w-[120px] py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
             <Receipt className="w-4 h-4 mr-2" /> Layanan
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 min-w-[120px] py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
             <Bell className="w-4 h-4 mr-2" /> Notifikasi
          </TabsTrigger>
          <TabsTrigger value="printer" className="flex-1 min-w-[120px] py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
             <Printer className="w-4 h-4 mr-2" /> Printer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 outline-none">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Informasi Outlet</CardTitle>
              <CardDescription>Data ini akan ditampilkan pada nota cetak dan halaman tracking pelanggan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="outlet-name">Nama Outlet</Label>
                <Input id="outlet-name" defaultValue="Laundry Bersih Wangi" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outlet-phone">Nomor Telepon (WhatsApp)</Label>
                <Input id="outlet-phone" defaultValue="081234567890" className="rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outlet-address">Alamat Lengkap</Label>
                <Textarea id="outlet-address" defaultValue="Jl. Sudirman No. 45, Jakarta Selatan" className="rounded-xl min-h-[100px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outlet-notes">Catatan Kaki Nota (Opsional)</Label>
                <Input id="outlet-notes" defaultValue="Terima kasih telah mencuci di tempat kami!" className="rounded-xl h-12" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4 outline-none">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Katalog Layanan</CardTitle>
                <CardDescription>Atur daftar layanan dan harga dasar.</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-xl border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-50">Tambah Layanan</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Cuci Reguler", price: "7000", unit: "kg" },
                  { name: "Cuci + Setrika", price: "10000", unit: "kg" },
                  { name: "Cuci Express 1 Hari", price: "15000", unit: "kg" },
                  { name: "Selimut / Bedcover", price: "25000", unit: "pcs" },
                ].map((service, i) => (
                   <div key={i} className="flex flex-col sm:flex-row gap-3 items-end sm:items-center p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                      <div className="flex-1 w-full space-y-1">
                        <Label className="text-xs text-gray-500">Nama Layanan</Label>
                        <Input defaultValue={service.name} className="h-10 bg-white" />
                      </div>
                      <div className="w-full sm:w-32 space-y-1">
                        <Label className="text-xs text-gray-500">Harga (Rp)</Label>
                        <Input defaultValue={service.price} type="number" className="h-10 bg-white" />
                      </div>
                      <div className="w-full sm:w-24 space-y-1">
                        <Label className="text-xs text-gray-500">Satuan</Label>
                        <Input defaultValue={service.unit} className="h-10 bg-white" />
                      </div>
                      <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl sm:mb-[2px] self-end sm:self-auto shrink-0 w-full sm:w-auto">Hapus</Button>
                   </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 outline-none">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Pengaturan WhatsApp</CardTitle>
              <CardDescription>Atur template pesan yang akan dikirim ke pelanggan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-gray-900">Aktifkan Tombol WhatsApp</Label>
                  <p className="text-sm text-gray-500">Tampilkan pintasan kirim WA di halaman pesanan yang selesai.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                   <Label htmlFor="wa-template" className="font-semibold text-gray-900">Template Pesan "Siap Diambil"</Label>
                   <span className="text-xs text-gray-400">Variabel: {'{nama}'}, {'{no_order}'}, {'{total}'}</span>
                </div>
                <Textarea
                  id="wa-template"
                  defaultValue="Halo {nama}, laundry dengan nomor pesanan {no_order} sudah selesai dan siap diambil. Total tagihan Anda adalah Rp{total}. Terima kasih!"
                  className="rounded-xl min-h-[120px] font-mono text-sm bg-gray-50"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="printer" className="space-y-4 outline-none">
           <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Printer Kasir (Thermal)</CardTitle>
              <CardDescription>Pengaturan untuk cetak struk dari browser.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-gray-900">Otomatis Cetak Struk</Label>
                  <p className="text-sm text-gray-500">Langsung munculkan dialog print saat order baru dibuat.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 gap-2">
                <div className="space-y-0.5">
                  <Label className="text-base font-semibold text-gray-900">Ukuran Kertas</Label>
                  <p className="text-sm text-gray-500">Pilih lebar kertas thermal printer Bluetooth/USB Anda.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" className="flex-1 sm:flex-auto border-indigo-600 bg-indigo-50 text-indigo-700 rounded-xl">58mm</Button>
                  <Button variant="outline" className="flex-1 sm:flex-auto border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl">80mm</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mobile Sticky Save Button */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
         <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-bold shadow-lg shadow-indigo-600/20">
          <Save className="w-4 h-4 mr-2" />
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
}