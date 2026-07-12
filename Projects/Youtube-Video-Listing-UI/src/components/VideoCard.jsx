function VideoCard({ video }) {
  return (
    <div className="card">
      <img
        src={video.snippet.thumbnails.high.url}
        alt={video.snippet.title}
      />

      <div className="content">
        <h3>{video.snippet.title}</h3>

        <p>{video.snippet.channelTitle}</p>

        <small>
          {video.statistics.viewCount} views
        </small>
      </div>
    </div>
  );
}

export default VideoCard;