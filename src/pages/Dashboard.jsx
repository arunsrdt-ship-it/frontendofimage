import { useEffect, useState } from "react";
import API from "../services/api";
import ImageCard from "../components/ImageCard";

const Dashboard = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    const res = await API.get("/images");
    setImages(res.data);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);
    await API.post("/images/upload", formData);
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Your Photos</h2>

      <div className="mb-6 flex gap-4">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button
          onClick={uploadImage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map(img => (
          <ImageCard key={img._id} img={img} refresh={fetchImages} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
