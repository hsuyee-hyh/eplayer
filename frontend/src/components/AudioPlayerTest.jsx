import "../css/main.css";
import imgTest from "../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faHeart,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";

function AudioPlayerTest() {
  return (
    <>
      <div className="container-fluid cus-container">
        <div
          className="d-flex justify-content-around align-items-center h-100"
          style={{ height: "100%", padding: "0 1.5rem" }}
        >
          {/* Left: Song image + info */}
          <div
            className="d-flex align-items-center"
            style={{ minWidth: "200px" }}
          >
            <img
              src={imgTest}
              alt=""
              className="cus-player-img"
            />
            <div className="d-flex flex-row align-items-center ms-3">
              <div className="d-flex flex-column justify-content-center">
                <p className="px-2 m-0 fw-bold" style={{ fontSize: "1rem" }}>
                  Song Name
                </p>
                <p
                  className="px-2 m-0 text-secondary"
                  style={{ fontSize: "0.9rem" }}
                >
                  Channel Name
                </p>
              </div>
              <button className="btn btn-outline-success ms-2">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>

          {/* Center: Controls */}
          <div
            className="d-flex flex-column align-items-center"
            style={{ minWidth: "260px" }}
          >
            <div className="d-flex flex-row justify-content-center mb-1">
              <button className="btn btn-outline-success mx-1">
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button className="btn btn-outline-success mx-1">
                <FontAwesomeIcon icon={faPlay} />
              </button>
              <button className="btn btn-outline-success mx-1">
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center w-100 mt-1">
              <p className="cus-player-time start">01:00</p>
              <input
                type="range"
                name="progressbar"
                value={35}
                max={100}
                id=""
                className="cus-player-progress flex-grow-1"
                style={{ minWidth: "400px", maxWidth: "500px" }}
              />
              <p className="cus-player-time end">3:33</p>
            </div>
          </div>

          <div className="cus-player-actions">
            <button className="btn btn-outline-success">
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioPlayerTest;
