"use client";

import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers } from "@jsonforms/material-renderers";
import { useRouter } from "next/navigation";
import leadFormSchema from "@/schemas/leadFormSchema.json";
import leadFormUiSchema from "@/schemas/leadFormUiSchema.json";
import "@/styles/formStyles.css";

// Define FormData interface with all required fields
interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  citizenship?: string;
  website?: string;
  visaCategories?: string[];
  helpText?: string;
  resume?: File | null;
}

export default function PublicLeadForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isClient, setIsClient] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ensure JsonForms only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [formData, isSubmitted]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName?.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName?.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email?.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.citizenship?.trim())
      newErrors.citizenship = "Country of Citizenship is required.";
    if (!formData.website?.trim()) newErrors.website = "Website URL is required.";
    if (!formData.visaCategories || formData.visaCategories.length === 0)
      newErrors.visaCategories = "At least one visa category must be selected.";
    if (!formData.helpText?.trim()) newErrors.helpText = "Please describe how we can help you.";
    if (!formData.resume) newErrors.resume = "Resume upload is required.";

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleHelpTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      helpText: event.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!validateForm()) {
      console.log('validation failed')
      return; // Do not proceed if validation fails
    }

    const formDataToSend = new FormData();

    const now = new Date().toISOString();

    for (const key in formData) {
      const value = formData[key as keyof FormData];
      if (key === "resume" && value instanceof File) {
        formDataToSend.append(key, value);
      } else if (Array.isArray(value)) {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value as string);
      }
    }

    formDataToSend.append("submittedAt", now);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isClient) {
    return null; // Prevent server-side rendering
  }

  const schemaAbove = {
    type: "object",
    properties: {
      firstName: leadFormSchema.properties.firstName,
      lastName: leadFormSchema.properties.lastName,
      email: leadFormSchema.properties.email,
      citizenship: leadFormSchema.properties.citizenship,
      website: leadFormSchema.properties.website
    },
    required: ["firstName", "lastName", "email", "citizenship", "website"],
  };

  const schemaMid = {
    type: "object",
    properties: {
      visaCategories: leadFormSchema.properties.visaCategories
    },
    required: ["visaCategories"],
  };

  const uiSchemaAbove = {
    type: "VerticalLayout",
    elements: leadFormUiSchema.elements.slice(0, 5),
  };

  const uiSchemaMid = {
    type: "VerticalLayout",
    elements: leadFormUiSchema.elements.slice(5, 6),
  };

  return (
    <div className="max-w-xl mx-auto p-4 text-center bg-white">
      <img
        src="/assets/i-file.png"
        alt="i file"
        className="h-14 mb-4 mx-auto"
      />
      <h2 className="text-2xl text-black font-semibold mb-5">Want to understand your visa options?</h2>
      <p className="text-lg text-black font-semibold mb-8">
        Submit the form below and our team of experienced attorneys will review your information and send a preliminary assessment of your case based on your goals.
      </p>

      <form onSubmit={handleSubmit}>
        <JsonForms
          schema={schemaAbove}
          uischema={uiSchemaAbove}
          data={formData}
          renderers={[...materialRenderers]}
          validationMode={ isSubmitted ? "ValidateAndShow" : "ValidateAndHide"}
          onChange={({ data }) => {
            setFormData(data as FormData);
          }}
          
        />
        <div className={`flex items-center space-x-4 border ${isSubmitted && errors.resume ? "border-red-500" : "border-gray-300"} rounded p-2`}>
          <label className={`${isSubmitted && errors.resume ? 'text-red-500' : 'text-gray-500'} w-1/3`} htmlFor="resume">
            Upload Resume
          </label>
          <input
            id="resume"
            type="file"
            className={`w-2/3 ${isSubmitted && errors.resume ? 'text-red-500' : 'text-gray-700'} focus:outline-none`}
            onChange={handleFileChange}
          />
        </div>
        {isSubmitted && errors.resume && (
          <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
        )}
        <img
          src="/assets/die.png"
          alt="die"
          className="h-14 my-4 mx-auto"
        />
        <h2 className="text-2xl text-black font-semibold mb-5">Visa categories of interest?</h2>
        <div className={`${isSubmitted && errors.visaCategories ? 'border border-red-500 rounded' : ''}`}>
          <JsonForms
            schema={schemaMid}
            uischema={uiSchemaMid}
            data={formData}
            renderers={[...materialRenderers]}
            validationMode={ isSubmitted ? "ValidateAndShow" : "ValidateAndHide"}
            onChange={({ data }) => {
              setFormData(data as FormData);
            }}
          />
        </div>
        {isSubmitted && errors.visaCategories && (
          <p className="text-red-500 text-sm mt-1">{errors.visaCategories}</p>
        )}
        <img
          src="/assets/heart.png"
          alt="die"
          className="h-14 my-4 mx-auto"
        />
        <h2 className="text-2xl text-black font-semibold mb-5">How can we help you?</h2>
        <div className={`space-y-2 ${isSubmitted && errors.helpText ? "border border-red-500 rounded p-2" : "border border-gray-300 rounded p-2"}`}>
          <textarea
            id="helpText"
            value={formData.helpText || ""}
            placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
            onChange={handleHelpTextChange}
            className="w-full text-gray-700 focus:outline-none"
            rows={4}
          />
        </div>
        {isSubmitted && errors.helpText && (
          <p className="text-red-500 text-sm mt-1">{errors.helpText}</p>
        )}
        <button type="submit" className="bg-black text-white py-3 px-6 rounded-lg w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
