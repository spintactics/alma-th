import React from "react";
import { rankWith, scopeEndsWith } from "@jsonforms/core";

export const visaCategoriesRendererTester = rankWith(
  5, // Priority rank for this renderer
  scopeEndsWith("visaCategories") // Matches the "visaCategories" field
);

const VisaCategoriesRenderer = ({ data, handleChange, path, schema }: any) => {
  console.log('hello world')
  
  const options = schema.items.enum;

  return (
    <div className="space-y-2">
      <label className="text-gray-500">Visa Categories</label>
      <select
        multiple
        value={data || []}
        onChange={(e) => {
          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
          handleChange(path, selectedOptions);
        }}
        className="w-full border border-gray-300 rounded p-2"
      >
        {options.map((option: string) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VisaCategoriesRenderer;
