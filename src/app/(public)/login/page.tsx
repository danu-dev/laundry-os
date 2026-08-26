"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { Loader2, Waves } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sanctum CSRF protection - mostly needed for stateful domains,
      // but good practice. For stateless API token, we just need the token.

      const response = await api.post("/auth/login", { email, password });

      const access_token = response.data?.data?.token || response.data?.access_token;
      const user = response.data?.data?.user || response.data?.user;

      if (access_token) {
        Cookies.set("token", access_token, { expires: 7 }); // expires in 7 days
        Cookies.set("user", JSON.stringify(user), { expires: 7 });

        router.push("/dashboard");
        router.refresh(); // Force a refresh to update layout state if needed
      } else {
        setError("Gagal mendapatkan token autentikasi.");
      }
    } catch (err: any) {
      if (err.response?.data?.errors?.email) {
        setError(err.response.data.errors.email[0]);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan saat mencoba login. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-3 pb-6 flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
            <Waves className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">
              Masuk ke LaundryOS
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Masukkan email dan password untuk mengelola operasional laundry Anda.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="budi@laundry.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-lg border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-lg border-gray-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </Button>

            <div className="text-center text-sm text-gray-500 pt-2">
              Bukan pengguna terdaftar?{" "}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Hubungi kami
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
