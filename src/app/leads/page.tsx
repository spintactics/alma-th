"use client";

import LeadsList from "@/components/LeadsList";
import { isAuthenticated, logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LeadsPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gradient-to-b from-green-100 to-white p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">alma</h1>
          <nav className="space-y-4">
            <a href="#" className="block font-semibold text-gray-800">Leads</a>
            <a href="#" className="block text-gray-500">Settings</a>
          </nav>
        </div>
        <div className="flex items-center space-x-2 mt-8">
          <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-lg">
            A
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="text-gray-600 font-semibold"
          >
            Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Leads</h2>
        <LeadsList />
      </main>
    </div>
  );
}
