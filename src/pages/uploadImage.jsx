import React, { useState, useCallback, useRef } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploadBox from "../components/dargAndDrop/dargAndDrop";
import { 
    Upload as UploadIcon, 
    Camera, 
    CheckCircle, 
    X, 
    AlertCircle,
    Sparkles,
    FileImage
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// import UploadZone from "../components/upload/UploadZone";
// import FilePreview from "../components/upload/FilePreview";
// import UploadProgress from "../components/upload/UploadProgress";

export default function Upload() {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [errors, setErrors] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            file => file.type.startsWith("image/")
        );

        if (droppedFiles.length === 0) {
            setErrors(prev => [...prev, "Please upload image files only"]);
            return;
        }

        addFiles(droppedFiles);
    }, []);

    const handleFileInput = (e) => {
        const selectedFiles = Array.from(e.target.files).filter(
            file => file.type.startsWith("image/")
        );

        if (selectedFiles.length === 0) {
            setErrors(prev => [...prev, "Please upload image files only"]);
            return;
        }

        addFiles(selectedFiles);
    };

    const addFiles = (newFiles) => {
        const fileObjects = newFiles.map(file => ({
            file,
            id: Date.now() + Math.random(),
            preview: URL.createObjectURL(file)
        }));
        
        setFiles(prev => [...prev, ...fileObjects]);
    };

    const removeFile = (fileId) => {
        const fileObj = files.find(f => f.id === fileId);
        if (fileObj?.preview) {
            URL.revokeObjectURL(fileObj.preview);
        }
        setFiles(prev => prev.filter(f => f.id !== fileId));
        setErrors(prev => prev.filter(e => !e.includes(fileObj?.file?.name || '')));
    };

    const uploadFiles = async () => {
        if (files.length === 0) return;

        setUploading(files.map(f => f.id));
        setCompleted([]);
        setErrors([]);

        for (let fileObj of files) {
            try {
                // Upload file
                // const { file_url } = await UploadFile({ file: fileObj.file });

                // Generate AI description
                // Get image dimensions
                // const img = new window.Image();
                // const dimensions = await new Promise((resolve) => {
                //     img.onload = () => resolve({ width: img.width, height: img.height });
                //     img.src = fileObj.preview;
                // });

                // Save to database
                // await Image.create({
                //     filename: fileObj.file.name,
                //     file_url,
                //     ai_description: description,
                //     tags: tags || [],
                //     file_size: fileObj.file.size,
                //     dimensions,
                //     upload_date: new Date().toISOString()
                // });

                setCompleted(prev => [...prev, fileObj.id]);
                
            } catch (error) {
                console.error(`Error uploading ${fileObj.file.name}:`, error);
                setErrors(prev => [...prev, `Failed to upload ${fileObj.file.name}`]);
            }

            setUploading(prev => prev.filter(id => id !== fileObj.id));
        }

        // Clean up and redirect after a delay
        setTimeout(() => {
            files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
            navigate("/Gallery");
        }, 2000);
    };

    return (
  <div className="p-6 max-w-6xl mx-auto">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <UploadIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Upload Images</h1>
          <p className="text-slate-600">Add images to your vault with AI-powered analysis</p>
        </div>
      </div>

      {/* Error Alert */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 mt-1 text-red-500" />
          <ul className="space-y-1">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>

    <div className="space-y-8">
      {/* Upload Box */}
      <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-5">
        <div className="flex items-center gap-3 text-xl mb-2">
          <FileImage className="w-5 h-5 text-blue-600" />
          Select Images
        </div>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <ImageUploadBox />
        </div>
      </div>

      {/* File Previews */}
      {files.length > 0 && (
        <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-6">
          <div className="flex flex-row items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-xl">
              <Camera className="w-5 h-5 text-purple-600" />
              Selected Images ({files.length})
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
                  setFiles([]);
                  setCompleted([]);
                  setErrors([]);
                }}
                disabled={uploading.length > 0}
                className="px-4 py-2 border rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-50"
              >
                Clear All
              </button>
              <button
                onClick={uploadFiles}
                disabled={uploading.length > 0}
                className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg disabled:opacity-50"
              >
                {uploading.length > 0 ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload & Analyze
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((fileObj) => (
              <motion.div
                key={fileObj.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="relative group rounded-lg overflow-hidden border shadow"
              >
                {/* Image */}
                <img
                  src={fileObj.preview}
                  alt={fileObj.file.name}
                  className="h-48 w-full object-cover"
                />

                {/* Overlay Status */}
                {uploading.includes(fileObj.id) && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                {completed.includes(fileObj.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 p-1 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* File Info */}
                <div className="p-3 bg-slate-50 text-sm text-slate-700 truncate">
                  {fileObj.file.name} ({(fileObj.file.size / 1024).toFixed(1)} KB)
                </div>
              </motion.div>
            ))}
          </div>

          {/* Upload Progress */}
          {uploading.length > 0 && (
            <div className="mt-6">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(completed.length / files.length) * 100}%`,
                  }}
                  className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Uploaded {completed.length}/{files.length}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

}