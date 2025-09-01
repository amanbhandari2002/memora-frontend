import React, { useState, useContext } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";


export default function ImageUploadBox() {
  const [dragActive, setDragActive] = useState(false);
  const { userId } = useContext(AuthContext);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files); // handle files
    }
  };

  const handleChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const formData = new FormData();
        const title = "Frontend temp 2"
        const location = " del"
        const date = new Date();
        const long = 1.4
        const lat = 2.2
        console.log("uid bata bc---->", userId)

        formData.append("image", e.target.files[0]);  // actual file
        formData.append("title", title);
        formData.append("location", location);
        formData.append("date", date);
        formData.append("long", long);
        formData.append("lat", lat);
        formData.append("user_id", userId);
        console.log('form->', formData.get("image"))
        const response = await api.post("memories/uploadimage", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
      } catch (err) {
        console.log("wtf err-->", err)
      }

    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition 
      ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Placeholder Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 16l5-5 4 4 8-8M21 12V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h6"
            />
          </svg>
        </div>

        {/* Text */}
        <h2 className="text-lg font-semibold">Upload Your Images</h2>
        <p className="text-gray-500 max-w-sm">
          Drag and drop your images here, or click the button below to browse
          your files. We&apos;ll analyze them with AI for better searchability.
        </p>

        {/* Button */}
        <label className="mt-4">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleChange}
          />
          <div className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:opacity-90 transition">
            Choose Images
          </div>
        </label>

        {/* Supported formats */}
        <p className="text-sm text-gray-400 mt-2">
          Supports JPG, PNG, GIF, WEBP
        </p>
      </div>
    </div>
  );
}
