import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Plus,
  X,
  FileImage,
  Loader2,
  Clock,
  CheckCircle2,
} from "lucide-react";
import API from "../services/api";
import ImageCard from "../components/ImageCard";
import VideoCard from "../components/VideoCard";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const [uploadQueue, setUploadQueue] = useState({
    active: false,
    file: null,
    progress: 0,
    timeLeft: null,
    completed: false,
  });

  const fileInputRef = useRef(null);
  const startTimeRef = useRef(null);

  /* ---------------- FETCH MEDIA ---------------- */

  const fetchImages = async () => {
    try {
      const res = await API.get("/images");
      setImages(res.data);
    } catch {
      console.error("Failed to load images");
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await API.get("/videos");
      setVideos(res.data);
    } catch {
      console.error("Failed to load videos");
    }
  };

  useEffect(() => {
    fetchImages();
    fetchVideos();
  }, []);

  /* ---------------- UPLOAD ---------------- */

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) startUpload(file);
  };

  const startUpload = async (file) => {
    const isVideo = file.type.startsWith("video/");
    const mediaType = isVideo ? "video" : "image";
    const endpoint = isVideo ? "/videos/upload" : "/images/upload";

    setUploadQueue({
      active: true,
      file,
      progress: 0,
      timeLeft: "Calculating...",
      completed: false,
    });

    const formData = new FormData();
    formData.append(mediaType, file);

    startTimeRef.current = Date.now();

    try {
      await API.post(endpoint, formData, {
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          const speed = e.loaded / elapsed;
          const remaining = e.total - e.loaded;
          const seconds = remaining / speed;

          setUploadQueue((prev) => ({
            ...prev,
            progress: percent,
            timeLeft:
              percent === 100
                ? "Processing..."
                : `${Math.ceil(seconds)}s remaining`,
          }));
        },
      });

      setUploadQueue((prev) => ({
        ...prev,
        progress: 100,
        completed: true,
        timeLeft: "Complete",
      }));

      fetchImages();
      fetchVideos();

      setTimeout(() => {
        setUploadQueue((prev) => ({ ...prev, active: false }));
      }, 3000);
    } catch (err) {
      console.error("Upload failed", err);
      setUploadQueue((prev) => ({ ...prev, active: false }));
    }
  };

  /* ---------------- DRAG & DROP ---------------- */

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      startUpload(e.dataTransfer.files[0]);
    }
  };

  /* ---------------- MERGE MEDIA ---------------- */

  const media = [
    ...images.map((img) => ({ ...img, type: "image" })),
    ...videos.map((vid) => ({ ...vid, type: "video" })),
  ];

  /* ---------------- UI ---------------- */

  return (
    <div
      className="min-h-screen bg-[#FBFBFD] pt-28 px-6 pb-6 md:pt-36 md:px-12 md:pb-12"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Library
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your collection across all devices.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*,video/*"
          onChange={handleFileSelect}
        />

        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2"
        >
          <Plus size={20} />
          Upload Media
        </button>
      </div>

      {/* Drag Overlay */}
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
              <p className="text-lg font-bold text-gray-700">
                Drop to upload
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {media.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FileImage className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              No media yet
            </h3>
            <p className="text-gray-500 mt-2 max-w-sm">
              Upload your first photo or video to start building your secure
              library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <motion.div
                key={item.publicId || item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.type === "image" ? (
                  <ImageCard img={item} refresh={fetchImages} />
                ) : (
                  <VideoCard video={item} />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Toast (unchanged) */}
      <AnimatePresence>
        {uploadQueue.active && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-40 w-full max-w-sm"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold flex items-center gap-2">
                  {uploadQueue.completed ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <Loader2 size={16} className="text-blue-500 animate-spin" />
                  )}
                  {uploadQueue.completed
                    ? "Upload Complete"
                    : "Uploading media"}
                </span>
                <button onClick={() => setUploadQueue({ ...uploadQueue, active: false })}>
                  <X size={16} />
                </button>
              </div>

              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    uploadQueue.completed
                      ? "bg-green-500"
                      : "bg-blue-600"
                  }`}
                  animate={{ width: `${uploadQueue.progress}%` }}
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
