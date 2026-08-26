import { CheckCircle2, Circle, PackageCheck, Shirt, WashingMachine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import api from "@/lib/api";

// Fetch actual data from backend
async function getOrderDetails(orderNumber: string) {
  try {
    const res = await fetch(`http://localhost:8000/api/track/${orderNumber}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function TrackOrderDetailPage({ params }: { params: Promise<{ orderNumber: string }> }) {
  const resolvedParams = await params;
  const order = await getOrderDetails(resolvedParams.orderNumber);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-6">Nomor order {resolvedParams.orderNumber} tidak valid atau belum terdaftar.</p>
        <Link href="/track" className="text-indigo-600 font-semibold hover:underline">
          ← Kembali
        </Link>
      </div>
    );
  }

  const statusMap: Record<string, string> = {
    NEW: "Laundry diterima",
    WASHING: "Sedang dicuci",
    IRONING: "Sedang disetrika",
    READY: "Siap diambil",
    COMPLETED: "Selesai & Diambil",
    CANCELLED: "Dibatalkan"
  };

  const statusOrder = ["NEW", "WASHING", "IRONING", "READY", "COMPLETED"];
  const currentStatusIndex = statusOrder.indexOf(order.status);

  const timeline = statusOrder.map((status, index) => {
    const historyEntry = order.histories.find((h: any) => h.status === status);

    // For "NEW", the created_at of the order itself is the time
    let time = null;
    if (status === "NEW") {
      time = new Date(order.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } else if (historyEntry) {
      time = new Date(historyEntry.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } else if (status === "COMPLETED" && order.completed_at) {
      time = new Date(order.completed_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    }

    return {
      status,
      title: statusMap[status],
      time,
      done: index <= currentStatusIndex || !!historyEntry
    };
  });

  const getStatusIcon = (status: string, done: boolean) => {
    if (!done) return <Circle className="w-6 h-6 text-gray-300" />;
    switch(status) {
      case 'NEW': return <PackageCheck className="w-6 h-6 text-indigo-600" />;
      case 'WASHING': return <WashingMachine className="w-6 h-6 text-indigo-600" />;
      case 'IRONING': return <Shirt className="w-6 h-6 text-indigo-600" />;
      case 'READY': return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'COMPLETED': return <CheckCircle2 className="w-6 h-6 text-indigo-600" />;
      default: return <CheckCircle2 className="w-6 h-6 text-indigo-600" />;
    }
  }

  const isReady = order.status === 'READY';
  const isCompleted = order.status === 'COMPLETED';

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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{order.order_number}</h1>
          <p className="text-gray-500 font-medium">{order.customer_name}</p>
        </div>

        {/* Current Status Badge */}
        <Card className={`${isReady ? 'bg-emerald-50 border-emerald-200' : isCompleted ? 'bg-gray-100 border-gray-300' : 'bg-blue-50 border-blue-200'} shadow-sm overflow-hidden`}>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
             <div className={`${isReady ? 'text-emerald-800' : isCompleted ? 'text-gray-600' : 'text-blue-800'} font-medium text-sm tracking-widest uppercase`}>Status Sekarang</div>
             <div className={`text-2xl font-bold ${isReady ? 'text-emerald-700' : isCompleted ? 'text-gray-700' : 'text-blue-700'} flex items-center gap-2`}>
               {(!isCompleted && !isReady) && (
                 <span className="relative flex h-4 w-4 mr-1">
                   <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isReady ? 'bg-emerald-400' : 'bg-blue-400'} opacity-75`}></span>
                   <span className={`relative inline-flex rounded-full h-4 w-4 ${isReady ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                 </span>
               )}
               {statusMap[order.status].toUpperCase()}
             </div>
             <p className={`${isReady ? 'text-emerald-700/80' : isCompleted ? 'text-gray-500' : 'text-blue-700/80'} text-sm max-w-[250px] mx-auto mt-2`}>
                {isReady ? "Order selesai diproses dan siap diambil di outlet." :
                 isCompleted ? "Order sudah diambil oleh pelanggan." :
                 "Order Anda sedang dalam proses pengerjaan."}
             </p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Timeline Pesanan</h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-600 before:via-gray-200 before:to-transparent">
              {timeline.map((step, index) => (
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
               {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="text-gray-500">{item.quantity} {item.unit}</span>
                  </div>
               ))}
             </div>
             <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-xl">
               <span className="font-bold text-gray-900">Total Tagihan</span>
               <span className="font-bold text-xl text-indigo-700">Rp{Number(order.total).toLocaleString('id-ID')}</span>
             </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
