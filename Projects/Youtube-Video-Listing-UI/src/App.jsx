import { useEffect, useState } from "react";
import VideoCard from "./components/VideoCard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchVideos() {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/youtube/videos"
      );

      const data = await response.json();

      setVideos(data.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <VideoCard
                key={video.items.id}
                video={video.items}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;