"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicLeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    citizenship: "",
    website: "",
    visaCategories: [] as string[],
    helpText: "",
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      visaCategories: checked
        ? [...prev.visaCategories, value]
        : prev.visaCategories.filter((category) => category !== value),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the form data for submission
    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("citizenship", formData.citizenship);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("helpText", formData.helpText);
    formDataToSend.append("visaCategories", JSON.stringify(formData.visaCategories));

    if (formData.resume) {
      formDataToSend.append("resume", formData.resume);
    }
    
    // Assuming this submission is successful
    try {
      // Replace with actual API call if necessary
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        router.push("/thank-you"); // Redirect to the Thank You page
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <header className="bg-green-100 p-8 rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Get An Assessment Of Your Immigration Case</h1>
      </header>

      <p className="text-lg text-gray-600 mb-8">
        Submit the form below and our team of experienced attorneys will review your information...
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <input
            type="text"
            name="citizenship"
            placeholder="Country of Citizenship"
            value={formData.citizenship}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <input
            type="text"
            name="website"
            placeholder="LinkedIn / Personal Website URL"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="text-left">
          <p className="mb-2">Visa categories of interest?</p>
          <label className="block">
            <input type="checkbox" value="O1" onChange={handleCheckboxChange} className="mr-2" />
            O1
          </label>
          <label className="block">
            <input type="checkbox" value="EB1A" onChange={handleCheckboxChange} className="mr-2" />
            EB-1A
          </label>
          <label className="block">
            <input type="checkbox" value="EB2-NIW" onChange={handleCheckboxChange} className="mr-2" />
            EB2-NIW
          </label>
          <label className="block">
            <input type="checkbox" value="I don't know" onChange={handleCheckboxChange} className="mr-2" />
            I don't know
          </label>
        </div>

        <div>
          <textarea
            name="helpText"
            placeholder="How can we help you?"
            value={formData.helpText}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        <button type="submit" className="bg-gray-800 text-white py-3 px-6 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}
