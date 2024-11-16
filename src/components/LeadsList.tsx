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

type SortConfig = {
  key: keyof Lead | null;
  direction: "asc" | "desc";
};

export default function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" });
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

  // Sorting function
  const sortLeads = (leads: Lead[]) => {
    if (!sortConfig.key) return leads;
  
    const sortedLeads = [...leads].sort((a, b) => {
      const key = sortConfig.key as keyof Lead;
      
      const aValue = a[key];
      const bValue = b[key];
      
      if (aValue === undefined || bValue === undefined) return 0;
  
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  
    return sortedLeads;
  };
  

  const handleSort = (key: keyof Lead) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredLeads = leads.filter((lead) =>
    (statusFilter === "All" || lead.state === statusFilter) &&
    (lead.firstName.toLowerCase().includes(search.toLowerCase()) ||
     lead.lastName.toLowerCase().includes(search.toLowerCase()))
  );

  const sortedAndFilteredLeads = sortLeads(filteredLeads);

  // Pagination logic
  const totalLeads = sortedAndFilteredLeads.length;
  const totalPages = Math.ceil(totalLeads / leadsPerPage);
  const startIdx = (currentPage - 1) * leadsPerPage;
  const currentLeads = sortedAndFilteredLeads.slice(startIdx, startIdx + leadsPerPage);

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

  const generatePageNumbers = () => {
    const pages: number[] = [];

    if (totalPages <= 11) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 6) {
        for (let i = 1; i <= 11; i++) {
          pages.push(i);
        }
      } else if (currentPage > totalPages - 6) {
        for (let i = totalPages - 10; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 5; i <= currentPage + 5; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
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
          className="p-2 border border-gray-300 rounded-lg shadow-sm text-gray-400"
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
              <th className="p-3 text-left text-gray-500 cursor-pointer" onClick={() => handleSort("firstName")}>
                Name {sortConfig.key === "firstName" && (
                  <img src={sortConfig.direction === "asc" ? "/assets/arrow-up.svg" : "/assets/arrow-down.svg"} className="inline ml-1 w-3 h-3" />
                )}
              </th>
              <th className="p-3 text-left text-gray-500 cursor-pointer" onClick={() => handleSort("submittedAt")}>
                Submitted {sortConfig.key === "submittedAt" && (
                  <img src={sortConfig.direction === "asc" ? "/assets/arrow-up.svg" : "/assets/arrow-down.svg"} className="inline ml-1 w-3 h-3" />
                )}
              </th>
              <th className="p-3 text-left text-gray-500 cursor-pointer" onClick={() => handleSort("state")}>
                Status {sortConfig.key === "state" && (
                  <img src={sortConfig.direction === "asc" ? "/assets/arrow-up.svg" : "/assets/arrow-down.svg"} className="inline ml-1 w-3 h-3" />
                )}
              </th>
              <th className="p-3 text-left text-gray-500 cursor-pointer" onClick={() => handleSort("citizenship")}>
                Country {sortConfig.key === "citizenship" && (
                  <img src={sortConfig.direction === "asc" ? "/assets/arrow-up.svg" : "/assets/arrow-down.svg"} className="inline ml-1 w-3 h-3" />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-gray-300 h-16">
                <td className="p-3 text-gray-800">{lead.firstName} {lead.lastName}</td>
                <td className="p-3 text-gray-800">{formatTimestamp(lead.submittedAt)}</td>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end p-4 space-x-2 bg-white border-t border-gray-300">
            <button
              onClick={handlePreviousPage}
              className="p-2 text-gray-700 rounded-lg disabled:opacity-50"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {generatePageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`p-2 rounded-lg ${
                  page === currentPage
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {page}
              </button>
            ))}
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
