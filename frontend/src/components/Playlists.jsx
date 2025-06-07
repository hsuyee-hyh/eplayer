import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/main.css";

function Playlists() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  // const videoId = "-8-t-yWDpqs";
  useEffect(() => {
    fetch("http://localhost/esound/backend/selectTest.php")
      .then((response) => response.json())
      .then((data) => setVideos(data));
    // .finally(() => setLoading(false));
  }, []);

  console.log(videos);

  return (
    <>
    
    
        <h4 className="ms-4">Playlists</h4>

        <div className="row ms-4">
          {videos.length === 0 ? (
            <div className="alert alert-warning">No Videos found</div>
          ) : (
            videos.map((video) => (
              <>
                <div
                  key={video.search_query_id}
                  className="col-lg-3 col-md-6 col-sm-12 my-3"
                >
                  <div className="card my-card">
                    <div className="card-body">
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${video.video_id.trim()}`}
                        controls
                        width={"10rem"}
                        height={"200px"}
                        className="my-card-img "
                        style={{ borderRadius: "10px", position: "relative" }}
                        onReady={() => setLoading(false)}
                        onBuffer={() => setLoading(true)}
                        onBufferEnd={() => setLoading(false)}
                      />
                      {loading && (
                        <div
                          className="spinner-border text-success"
                          role="status"
                          style={{
                            position: "absolute",
                            top: "100px",
                            left: "80px",
                          }}
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}

                      <div className="card-title">{video.search_query_id}</div>
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      
    </>
  );
}

export default Playlists;
