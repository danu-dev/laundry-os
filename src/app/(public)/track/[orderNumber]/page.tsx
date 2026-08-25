import { CheckCircle2, Circle, Clock, PackageCheck, Shirt, WashingMachine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Mock Data fetcher
async function getOrderDetails(orderNumber: string) {
  // Simulate API call
  return {
    orderNumber: orderNumber,
    customerName: "Andi Pratama",
    status: "READY",
    total: 48000,
    items: [
      { name: "Cuci + Setrika", weight: "4.5 kg" },
      { name: "Pewangi Premium", weight: "—" }
    ],
    timeline: [
      { status: "NEW", title: "Laundry diterima", time: "25 Aug · 09:32", done: true },
      { status: "WASHING", title: "Sedang dicuci", time: "25 Aug · 11:20", done: true },
      { status: "IRONING", title: "Sedang disetrika", time: "25 Aug · 14:10", done: true },
      { status: "READY", title: "Siap diambil", time: "25 Aug · 15:02", done: true },
      { status: "PICKED_UP", title: "Selesai & Diambil", time: null, done: false },
    ]
  };
}

export default async function TrackOrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const resolvedParams = await params;
  const order = await getOrderDetails(resolvedParams.orderNumber);

  const getStatusIcon = (status: string, done: boolean) => {
    if (!done) return <Circle className="w-6 h-6 text-gray-300" />;
    switch(status) {
      case 'NEW': return <PackageCheck className="w-6 h-6 text-indigo-600" />;
      case 'WASHING': return <WashingMachine className="w-6 h-6 text-indigo-600" />;
      case 'IRONING': return <Shirt className="w-6 h-6 text-indigo-600" />;
      case 'READY': return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'PICKED_UP': return <CheckCircle2 className="w-6 h-6 text-indigo-600" />;
      default: return <CheckCircle2 className="w-6 h-6 text-indigo-600" />;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
      <div className="w-full max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/track" className="text-indigo-600 font-semibold text-sm hover:underline">
            ← Cek Order Lain
          </Link>
          <div className="text-sm font-bold text-gray-400">LaundryOS</div>
        </div>

        {/* Order Info */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{order.orderNumber}</h1>
          <p className="text-gray-500 font-medium">{order.customerName}</p>
        </div>

        {/* Current Status Badge */}
        <Card className="bg-emerald-50 border-emerald-200 shadow-sm overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
             <div className="text-emerald-800 font-medium text-sm tracking-widest uppercase">Status Sekarang</div>
             <div className="text-2xl font-bold text-emerald-700 flex items-center gap-2">
               <span className="relative flex h-4 w-4 mr-1">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
               </span>
               SIAP DIAMBIL
             </div>
             <p className="text-emerald-700/80 text-sm max-w-[250px] mx-auto mt-2">
                Order selesai diproses dan siap diambil di outlet.
             </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Timeline Pesanan</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-600 before:via-gray-200 before:to-transparent">
              {order.timeline.map((step, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-white z-10">
                     {getStatusIcon(step.status, step.done)}
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] pl-4 md:pl-0 md:group-odd:pr-4 md:group-even:pl-4">
                    <div className="flex flex-col">
                      <span className={`font-semibold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</span>
                      {step.time && <span className="text-xs text-gray-500 mt-0.5">{step.time}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Details & Total */}
        <Card className="border-gray-200 shadow-sm">
           <CardContent className="p-0">
             <div className="p-6 space-y-4">
               <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detail Item</h2>
               {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-gray-500">{item.weight}</span>
                  </div>
               ))}
             </div>
             <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-xl">
               <span className="font-bold text-gray-900">Total Tagihan</span>
               <span className="font-bold text-xl text-indigo-700">Rp{order.total.toLocaleString('id-ID')}</span>
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}