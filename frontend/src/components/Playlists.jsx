import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/main.css";
import "../css/playlist.css";
import imgTest from "../assets/358219.jpg";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar.jsx";
import NewPlaylistForm from "./NewPlaylistForm.jsx";

function Playlists() {
  const location = useLocation();
  const user = location.state?.user.data.foundUser;
  console.log("Playlists component rendered", location.state);
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModelOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  // const videoId = "-8-t-yWDpqs";
  useEffect(() => {
    const fetchPlaylist = async () => {
      const response = await fetch(
        `http://localhost/esound/backend/router.php?path=playlists&userid=${location.state.user.data.foundUser.id}`,
        {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setPlaylist(data.data);
      console.log("Fetched videos:", data.data.title);
    };
    fetchPlaylist();
  }, []);

  const handleCreatePlaylist = () => {
    // Logic to handle creating a new playlist
    // This could open a modal or redirect to a form page
    console.log(`Create Playlist button clicked ${user.id}`);
    
    navigate(`new-playlist?userid=${user.id}`, {
      state: {
        user: location.state.user,
      },
    });
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <div style={{ paddingLeft: "320px", paddingTop: "20px" }}>
        <h4 className="ms-4">Playlists</h4>

        <div className="row ms-4">
          <div className="card cus-playlist-card my-1">
            <div className="card-body">
              <button
                className="cus-playlist-button btn btn-lg btn-success w-100"
                onClick={handleCreatePlaylist}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Create Playlist
              </button>
            </div>
          </div>

          {Array.isArray(playlist) &&
            playlist.length > 0 &&
            playlist.map((item) => (
              <div
                key={item.playlist_id}
                // className="col-lg-3 col-md-4 col-sm-12 my-3 me-2"
                // className="d-flex"
              >
                <div className="card cus-playlist-card">
                  <img
                    src={imgTest}
                    alt=""
                    className="card-img-top cus-playlist-img"
                  />
                  <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title" style={{ color: "white" }}>
                      {item.title}
                    </h5>
                    <a href="#" className="btn btn-success mt-0 pt-0">
                      Go to Playlist
                    </a>
                  </div>
                </div>
                
              </div>
            ))}

          {/* video playlist */}

          {/* {videos.map((video) => ( */}
          {/* // <div */}
          {/* // key={video.search_query_id} */}
          {/* // className="col-lg-3 col-md-6 col-sm-12 my-3" */}
          {/* // > */}
          {/* <div className="card my-card"> */}
          {/* <div className="card-body"> */}
          {/* <ReactPlayer */}
          {/* // url={`https://www.youtube.com/watch?v=${video.video_id.trim()}`} */}
          {/* // controls */}
          {/* // width={"10rem"} */}
          {/* // height={"200px"} */}
          {/* // className="my-card-img " */}
          {/* // style={{ borderRadius: "10px", position: "relative" }} */}
          {/* // onReady={() => setLoading(false)} */}
          {/* // onBuffer={() => setLoading(true)} */}
          {/* // onBufferEnd={() => setLoading(false)} */}
          {/* // /> */}
          {/* {loading && ( */}
          {/* // <div */}
          {/* // className="spinner-border text-success" */}
          {/* // role="status" */}
          {/* // style={{ */}
          {/* // position: "absolute", */}
          {/* // top: "100px", */}
          {/* // left: "80px", */}
          {/* // }} */}
          {/* // > */}
          {/* <span className="sr-only">Loading...</span> */}
          {/* </div> */}
          {/* // )} */}

          {/* <div className="card-title">{video.search_query_id}</div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* // ))}
          
          {/* // ))} */}
          {/* // ))} */}
        </div>
      </div>
    </>
  );
}

export default Playlists;
