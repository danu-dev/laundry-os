export default function MorePage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Lainnya</h2>
      </div>
      <div className="grid gap-4">
        {/* Placeholder for settings, finance, inventory on mobile */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center text-gray-500 py-12">
            Menu Lainnya (Finance, Inventory, Settings) sedang dalam pengembangan.
        </div>
      </div>
    </div>
  );
}