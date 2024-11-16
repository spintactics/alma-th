import { NextResponse } from "next/server";

// below uses the user submitted data on the main form page
let leads: { id: number; state: string; [key: string]: any }[] = [];

export async function GET() {
  return NextResponse.json(leads, { status: 200 });
}
// above uses the user submitted data on the main form page

// below will generate mock data for viewing large amounts of leads data
// let leads: { id: number; state: string; [key: string]: any }[] = Array.from(
//   { length: 200 },
//   (_, i) => ({
//     id: i + 1,
//     firstName: `Lead${i + 1}`,
//     lastName: `Last${i + 1}`,
//     email: `lead${i + 1}@example.com`,
//     citizenship: ["United States", "Mexico", "Brazil", "France", "Canada"][i % 5],
//     website: `https://example.com/lead${i + 1}`,
//     visaCategories: ["H1B", "L1", "O1"],
//     helpText: "Need help with visa options",
//     state: i % 3 === 0 ? "Pending" : "Reached Out",
//     submittedAt: new Date().toISOString(),
//   })
// );

// export async function GET() {
//   return new Response(JSON.stringify(leads), { status: 200 });
// }
// above will generate mock data for viewing large amounts of leads data

export async function POST(req: Request) {
  try {
    // Parse FormData from the request
    const formData = await req.formData();

    // Extract form fields
    const newLead = {
      id: Date.now(),
      state: "Pending",
      firstName: formData.get("firstName") || "",
      lastName: formData.get("lastName") || "",
      email: formData.get("email") || "",
      citizenship: formData.get("citizenship") || "",
      website: formData.get("website") || "",
      visaCategories: JSON.parse(formData.get("visaCategories") as string || "[]"),
      helpText: formData.get("helpText") || "",
      resume: formData.get("resume"), // This will be a File object
      submittedAt: formData.get("submittedAt")
    };

    // Save lead to in-memory storage
    leads.push(newLead);

    // Return success response
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json({ error: "Failed to process form data." }, { status: 500 });
  }
}


// PATCH request to update a lead's state
export async function PATCH(req: Request) {
  try {
    const { id, state } = await req.json(); // Destructuring to get id and new state directly

    // Find the lead with the matching ID
    const lead = leads.find((lead) => lead.id === id);

    if (lead) {
      // Update the lead's state if found
      lead.state = state;
      return NextResponse.json(lead, { status: 200 });
    } else {
      // Return a 404 if the lead isn't found
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating lead:", error);
    // Return a 500 if there's a server error
    return NextResponse.json({ error: "Failed to update lead." }, { status: 500 });
  }
}