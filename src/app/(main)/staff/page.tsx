import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const staffMembers = [
  { id: 1, name: "Budi Santoso", role: "OWNER", phone: "081122334455" },
  { id: 2, name: "Rina", role: "STAFF", phone: "085566778899" },
  { id: 3, name: "Joko", role: "STAFF", phone: "087711223344" },
];

export default function StaffPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Staff Management</h2>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Tambah Staff
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {staffMembers.map((staff) => (
          <Card key={staff.id} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{staff.name}</h3>
                    <p className="text-gray-500 text-sm font-medium">{staff.phone}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${staff.role === 'OWNER' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                    {staff.name.charAt(0)}
                  </div>
               </div>

               <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Shield className={`w-4 h-4 ${staff.role === 'OWNER' ? 'text-indigo-600' : 'text-gray-400'}`} />
                  <span className="text-sm font-semibold text-gray-700">{staff.role}</span>
                  {staff.role === 'STAFF' && (
                     <Badge variant="outline" className="ml-auto bg-gray-50 text-gray-600 border-gray-200 text-[10px]">Limited Access</Badge>
                  )}
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}