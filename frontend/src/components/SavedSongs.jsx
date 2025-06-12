import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlay, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import imgTest from "../assets/react.svg";
import "../css/main.css";

import AudioPlayer from "./AudioPlayer.jsx";
import AudioPlayerTest from "./AudioPlayerTest.jsx";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

function SavedPlaylists() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [showAudio, setShowAudio] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const user= location.state.user.data.foundUser;
  console.log("SavedPlaylists component rendered", user.id);

  //fetch from backend
  useEffect(() => {
    fetch(`http://localhost/esound/backend/router.php?path=savedsongs&userid=${user.id}`,{
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      }
    })
      .then((response) => response.json())
      .then((data) => setLikedSongs(data.data));
  }, []);

  // play button onClick
  function playBtnOnClick(videoId) {
    const link = "https://www.youtube.com/watch?v=" + videoId;
    setShowAudio(true);
    setVideoLink(link);

    //// navigate to Link
    navigate("/player");

    axios
      .post("http://localhost/esound/backend/convertMp3.php", {
        url: link,
        videoid: videoId,
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  function playBtnTest() {
    setShowAudio(true);
  }
  return (
    <>
      <Sidebar />
      <Navbar />
      <div style={{ paddingLeft: "300px", paddingTop: "20px" }}>
        <div
          className=" cus-saved-container ms-4"
          style={{ paddingBottom: showAudio ? "90px" : "0px" }}
        >
          <h4>Saved Playlists</h4>
          <div className="container">
            <table className="cus-table-likedsongs">
              <tbody>
                {likedSongs.map((item) => (
                  <tr key={item.search_query_id}>
                    <th className="mx-3" scope="row">
                      {item.search_query_id}
                    </th>
                    <td>
                      <div className="img-container">
                        <img src={imgTest} alt="" className="playlist-img" />

                        <span className="play-overlay">
                          <button
                            className="play-btn-overlay"
                            onClick={playBtnTest}
                            // onClick={() => playBtnOnClick(item.video_id)}
                          >
                            <FontAwesomeIcon icon={faPlay} />
                            <span hidden>
                              <a href="https://www.youtube.com/watch?v=KjcCxH2pEAw"></a>
                            </span>
                          </button>
                        </span>
                      </div>
                    </td>
                    <td>{item.search_query}</td>
                    <td>
                      <button
                        className="btn"
                        style={{ backgroundColor: "#222831", color: "#fff" }}
                      >
                        <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn"
                        style={{ backgroundColor: "#222831", color: "#fff" }}
                      >
                        <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showAudio && <AudioPlayerTest videoId={videoLink} />}
        </div>
      </div>
    </>
  );
}

export default SavedPlaylists;
