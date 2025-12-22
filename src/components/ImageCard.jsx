import API from "../services/api";

const ImageCard = ({ img, refresh }) => {
  const deleteImage = async () => {
    await API.delete(`/images/${img._id}`);
    refresh();
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <img src={img.imageUrl} className="w-full h-60 object-cover" />
      <button
        onClick={deleteImage}
        className="w-full py-2 bg-red-500 text-white hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ImageCard;
    