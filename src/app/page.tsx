"use client";

import PublicLeadForm from "@/components/PublicLeadForm";

export default function Page() {
  return (
    <main className="bg-white min-h-screen">
      <div className="relative bg-[#D9DEA7] h-[50vh] flex items-center">
        <div className="absolute top-0 left-0 h-full w-1/4">
          <img
            src="/assets/green-coins.png"
            alt="Green Coins"
            className="h-full object-cover"
          />
        </div>
        <div className="pr-8 w-2/3 flex flex-col items-start" style={{ marginLeft: "450px"}}>
          <img
            src="/assets/logo-darker.svg"
            alt="alma logo"
            className="h-12 mb-4"
          />
          <h1 className="text-8xl font-bold text-black">
            Get An Assessment Of Your Immigration Case
          </h1>
        </div>
      </div>
      <PublicLeadForm />
    </main>
  );
}
