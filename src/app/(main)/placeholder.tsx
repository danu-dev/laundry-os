export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
      <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center text-gray-500 py-12">
          Modul {title} sedang dalam tahap pengembangan (Phase 2).
      </div>
    </div>
  );
}