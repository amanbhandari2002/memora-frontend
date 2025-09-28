import React, { useState, useContext } from "react";
import { api } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function ImageUploadBox() {
  const [dragActive, setDragActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [file, setFile] = useState(null);
  const { userId } = useContext(AuthContext);

  // form fields
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setShowModal(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setShowModal(true);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setShowLoader(true)
      setShowModal(false);
      const formData = new FormData();
      const fileSize = file.size / (1024 ** 3); // in GB

      formData.append("image", file);
      formData.append("title", title);
      formData.append("location", location);
      formData.append("date", date);
      formData.append("long", long);
      formData.append("lat", lat);
      formData.append("user_id", userId);
      formData.append("fileSize", fileSize);

      await api.post("memories/uploadimage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowLoader(false)

      // reset
      setFile(null);
      setTitle("");
      setLocation("");
      setDate("");
      setLat("");
      setLong("");
    } catch (err) {
      console.log("Upload error -->", err);
    }
  };

  return (
    <>
      {/* Upload Box */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center text-center transition 
        ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
      >
        {!showLoader &&
          <div className="flex flex-col items-center gap-4"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}>
            {/* Icon */}
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

            <h2 className="text-lg font-semibold">Upload Your Images</h2>
            <p className="text-gray-500 max-w-sm">
              Drag and drop your images here, or click the button below to browse.
            </p>

            <label className="mt-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              <div className="cursor-pointer px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-md hover:opacity-90 transition">
                Choose Images
              </div>
            </label>

            <p className="text-sm text-gray-400 mt-2">
              Supports JPG, PNG, GIF, WEBP
            </p>
          </div>
        }
        {showLoader &&
          <div className="flex flex-col items-center h-[350px]">
            <video
              className="h-full video-container is-loaded"
              src="https://cdn.dribbble.com/userupload/17608183/file/original-a9b30b0413131d806620dc5db95c99f1.mp4"
              autoPlay
              muted
              loop
              playsInline
            ></video>
            <div className="absolute top-[80%]">
              <div>Image getting saved</div>
              <div>AI is gerenating description</div>
            </div>

          </div>}
      </div>

      {/* Modal */}
      {showModal && !showLoader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Image Details</h2>

            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <input
              type="text"
              placeholder="Longitude"
              value={long}
              onChange={(e) => setLong(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
