import API from "../services/api";

const VideoCard = ({ video, refresh }) => {
  const deleteVideo = async () => {
    try {
      await API.delete(`/videos/${video._id}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete video", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <video src={video.videoUrl} controls preload="metadata" className="w-full h-60 object-cover bg-black" />
      <button onClick={deleteVideo} className="w-full py-2 cursor-pointer bg-red-500 text-white hover:bg-red-600">
        Delete
      </button>
    </div>
  );
};

export default VideoCard;
