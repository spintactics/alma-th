"use client";

import React, { useState, useEffect } from "react";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  citizenship: string;
  website: string;
  visaCategories: string[];
  helpText: string;
  resume?: File;
  state: string;
  submittedAt: string;
}

export default function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 8;

  useEffect(() => {
    async function fetchLeads() {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    }
    fetchLeads();
  }, []);

  const updateLeadState = async (id: number, newState: string) => {
    try {
      const response = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, state: newState }),
      });

      if (response.ok) {
        setLeads((prevLeads) =>
          prevLeads.map((lead) =>
            lead.id === id ? { ...lead, state: newState } : lead
          )
        );
      } else {
        alert("Failed to update lead state.");
      }
    } catch (error) {
      console.error("Error updating lead state:", error);
    }
  };

  const filteredLeads = leads.filter((lead) =>
    (statusFilter === "All" || lead.state === statusFilter) &&
    (lead.firstName.toLowerCase().includes(search.toLowerCase()) ||
     lead.lastName.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / leadsPerPage);
  const startIdx = (currentPage - 1) * leadsPerPage;
  const currentLeads = filteredLeads.slice(startIdx, startIdx + leadsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative">
      {/* Search and Filter Controls */}
      <div className="flex space-x-4 mb-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-12 border border-gray-300 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:border-gray-400"
          />
          <img
            src="/assets/search.svg"
            alt="Search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            width={20}
            height={20}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg shadow-sm"
        >
          <option value="All">Status</option>
          <option value="Pending">Pending</option>
          <option value="Reached Out">Reached Out</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="rounded-2xl border border-gray-300 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-gray-500">Name</th>
              <th className="p-3 text-left text-gray-500">Submitted</th>
              <th className="p-3 text-left text-gray-500">Status</th>
              <th className="p-3 text-left text-gray-500">Country</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-gray-300">
                <td className="p-3 text-gray-800">{lead.firstName} {lead.lastName}</td>
                <td className="p-3 text-gray-800">{new Date(lead.submittedAt).toLocaleString()}</td>
                <td className="p-3 text-gray-800">
                  <div className="flex items-center space-x-4">
                    <span>{lead.state}</span>
                    {lead.state === "Pending" && (
                      <button
                        onClick={() => updateLeadState(lead.id, "Reached Out")}
                        className="p-2 border border-gray-300 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                      >
                        <img
                          src="/assets/reach.svg"
                          alt="Reach Out"
                          className="w-4 h-4"
                        />
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-3 text-gray-800">{lead.citizenship}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination (hidden if only one page) */}
        {totalPages > 1 && (
          <div className="flex justify-end p-4 space-x-2 bg-white border-t border-gray-300">
            <button
              onClick={handlePreviousPage}
              className="p-2 text-gray-700 rounded-lg disabled:opacity-50"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <span className="p-2 text-gray-700">{currentPage} / {totalPages}</span>
            <button
              onClick={handleNextPage}
              className="p-2 text-gray-700 rounded-lg disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
