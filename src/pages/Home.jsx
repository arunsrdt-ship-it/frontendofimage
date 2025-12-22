import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">
        PhotoSafe 📸
      </h1>
      <p className="text-gray-600 max-w-xl mb-8">
        Securely store, manage, and access your photos from anywhere.
        Upload your memories and keep them safe in the cloud.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
