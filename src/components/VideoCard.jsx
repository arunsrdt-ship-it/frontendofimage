import { motion } from "framer-motion";

const VideoCard = ({ video }) => {
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow"
    >
      <video
        src={video.videoUrl}
        controls
        preload="metadata"
        className="w-full h-60 object-cover bg-black"
      />
    </motion.div>
  );
};

export default VideoCard;
