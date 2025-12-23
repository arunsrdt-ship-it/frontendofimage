import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Plus, X, FileImage, Loader2, Clock, CheckCircle2 } from "lucide-react";
import API from "../services/api";
import ImageCard from "../components/ImageCard";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Upload State
  const [uploadQueue, setUploadQueue] = useState({
    active: false,
    file: null,
    progress: 0,
    timeLeft: null,
    completed: false,
  });

  const fileInputRef = useRef(null);
  const startTimeRef = useRef(null);

  const fetchImages = async () => {
    try {
      const res = await API.get("/images");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to load images");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // --- Upload Logic with Progress Calculation ---

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) startUpload(file);
  };

  const startUpload = async (file) => {
    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";

    setUploadQueue({
      active: true,
      file,
      progress: 0,
      timeLeft: "Calculating...",
      completed: false,
      mediaType,
    });

    const formData = new FormData();
    formData.append(mediaType, file);

    const endpoint = isVideo ? "/videos/upload" : "/images/upload";

    startTimeRef.current = Date.now();

    try {
      await API.post(endpoint, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
          const uploadSpeed = progressEvent.loaded / timeElapsed;
          const remainingBytes = progressEvent.total - progressEvent.loaded;
          const secondsLeft = remainingBytes / uploadSpeed;

          setUploadQueue((prev) => ({
            ...prev,
            progress: percentCompleted,
            timeLeft: percentCompleted === 100 ? "Processing..." : `${Math.ceil(secondsLeft)}s remaining`,
          }));
        },
      });

      setUploadQueue((prev) => ({
        ...prev,
        progress: 100,
        completed: true,
        timeLeft: "Complete",
      }));

      fetchImages(); // later you’ll also fetch videos

      setTimeout(() => {
        setUploadQueue((prev) => ({ ...prev, active: false }));
      }, 3000);
    } catch (err) {
      console.error("Upload failed", err);
      setUploadQueue((prev) => ({ ...prev, active: false }));
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div
      // UPDATED: Changed padding to pt-28 (mobile) and pt-36 (desktop) to clear the navbar
      className="min-h-screen bg-[#FBFBFD] pt-28 px-6 pb-6 md:pt-36 md:px-12 md:pb-12"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Library</h1>
          <p className="text-gray-500 mt-2">Manage your collection across all devices.</p>
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,video/*" />

        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={20} />
          Upload Media
        </button>
      </div>

      {/* Drag & Drop Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-blue-500/10 backdrop-blur-sm border-4 border-blue-500 border-dashed m-4 rounded-3xl flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-bounce">
              <UploadCloud size={48} className="text-blue-600 mb-2" />
              <p className="text-lg font-bold text-gray-700">Drop to upload</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileImage className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No photos yet</h3>
            <p className="text-gray-500 mt-2 max-w-sm">Upload your first photo or video to start building your secure library.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <motion.div key={img._id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                <ImageCard img={img} refresh={fetchImages} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Progress Toast */}
      <AnimatePresence>
        {uploadQueue.active && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-40 w-full max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 overflow-hidden relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  {uploadQueue.completed ? <CheckCircle2 size={16} className="text-green-500" /> : <Loader2 size={16} className="text-blue-500 animate-spin" />}
                  {uploadQueue.completed ? "Upload Complete" : "Uploading 1 item..."}
                </span>
                <button onClick={() => setUploadQueue((prev) => ({ ...prev, active: false }))} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileImage size={20} className="text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{uploadQueue.file?.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    {!uploadQueue.completed && <Clock size={10} />}
                    {uploadQueue.timeLeft}
                  </p>
                </div>
              </div>

              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${uploadQueue.completed ? "bg-green-500" : "bg-blue-600"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadQueue.progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
