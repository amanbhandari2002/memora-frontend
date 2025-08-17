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

                {/* {errors.length > 0 && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <ul className="space-y-1">
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )} */}
            </motion.div>

            <div className="space-y-8">
                <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm p-5">
                    <div>
                        <div className="flex items-center gap-3 text-xl mb-2">
                            <FileImage className="w-5 h-5 text-blue-600" />
                            Select Images
                        </div>
                    </div>
                    <div>
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <ImageUploadBox/>
                        </div>
                    </div>
                </div>

                {files.length > 0 && (
                    <div className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-3 text-xl">
                                <Camera className="w-5 h-5 text-purple-600" />
                                Selected Images ({files.length})
                            </div>
                            <div className="flex gap-3">
                                <button
                                    variant="outline"
                                    onClick={() => {
                                        files.forEach(f => f.preview && URL.revokeObjectURL(f.preview));
                                        setFiles([]);
                                        setCompleted([]);
                                        setErrors([]);
                                    }}
                                    disabled={uploading.length > 0}
                                >
                                    Clear All
                                </button>
                                <button
                                    onClick={uploadFiles}
                                    disabled={uploading.length > 0}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
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
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* <AnimatePresence>
                                    {files.map((fileObj) => (
                                        <FilePreview
                                            key={fileObj.id}
                                            fileObj={fileObj}
                                            isUploading={uploading.includes(fileObj.id)}
                                            isCompleted={completed.includes(fileObj.id)}
                                            onRemove={removeFile}
                                        />
                                    ))}
                                </AnimatePresence> */}
                            </div>
                            
                            {/* {uploading.length > 0 && (
                                <UploadProgress
                                    total={files.length}
                                    completed={completed.length}
                                    uploading={uploading.length}
                                />
                            )} */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}