"use client";

import LeadsList from "@/components/LeadsList";
import { isAuthenticated, logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null;
  }

  const logoutHandler = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className="w-1/4 p-4 flex flex-col justify-between"
        style={{
          backgroundImage: "linear-gradient(to bottom, #F8FDD3, #ffffff 40%)",
        }}
      >
        <div>
          <h1 className="mb-8">
            <img src="/assets/logo.png" alt="alma" className="h-12" />
          </h1>
          <nav className="space-y-4">
            <a href="#" className="block font-semibold text-black">
              Leads
            </a>
            <a href="#" className="block text-gray-500">
              Settings
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-2 mt-8">
          <div
            className="bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center text-lg cursor-pointer"
            onClick={() => setShowLogoutModal(true)}>
            A
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-black font-semibold cursor-pointer"
          >
            Admin
          </button>
        </div>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 border border-gray-300">
            <h3 className="text-lg font-semibold mb-4 text-center text-black">
              Do you want to log out?
            </h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={logoutHandler}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-3/4 p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-black font-semibold">
          Leads
        </h2>
        <LeadsList />
      </main>
    </div>
  );
}
