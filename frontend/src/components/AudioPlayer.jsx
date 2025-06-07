import { useState, useRef, useEffect } from "react";

import imgTest from "../assets/358219.jpg";
import song from "../mp3/chinese-folk.mp3";
import "../css/main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faForward,
  faBackward,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

function AudioPlayer(props) {
  const [play, setPlay] = useState(false);
  const [playBtn, setPlayBtn] = useState(true);
  const [pauseBtn, setPauseBtn] = useState(false);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  function handlePlayBtn() {
    setPlay((prevValue) => !prevValue);
    setPlayBtn((prevValue) => !prevValue);
    setPauseBtn((prevValue) => !prevValue);

    if (!play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  // useEffect(() => {
    // if (audioRef.current) {
      // if (play) {
        // const time = Math.floor(currentTime) / Math.floor(duration);
        // setMinute(Math.floor(time) / 60);
        // setSecond(Math.floor(time) % 60);
        // console.log(`${currentTime}/${duration}`);
      // }
    // }
  // }, [play]);

  function handleSeek(e) {
    const seekTime = Number(e.target.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  }

  // for currentTime
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60)
    .toString()
    .padStart(2, "0");

  // for duration
  const durMinutes = Math.floor(duration / 60);
  const durSeconds = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");

  return (
    <>
      <p>this is audio clip</p>
      <a href={props.videoId}>{props.videoId}</a>

      {/* audio mp3 playing */}
      <audio
        ref={audioRef}
        src={song}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      ></audio>

      <div className="container">
        <div className="audio-player-wrapper">
          <div
            className="card-bg-img"
            style={{ backgroundImage: `url(${imgTest})` }}
          ></div>
          <div className="card " style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Song Name</h5>
              {/* progress bar */}
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                step="0.01"
                style={{ width: "100%" }}
              />

              {/* display currentTime and Duration */}
              <div className="d-flex flex-row justify-content-between">
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  {minutes}:{seconds}
                </div>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  {durMinutes}:{durSeconds}
                </div>
              </div>

              {/* play buttons  */}
              <div className="d-flex flex-row justify-content-center align-items-center">
                <button className="btn btn-outline-success m-2">
                  <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon>
                </button>
                {playBtn && (
                  <button
                    className="btn btn-outline-success m-2"
                    onClick={handlePlayBtn}
                  >
                    <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                  </button>
                )}
                {pauseBtn && (
                  <button
                    className="btn btn-outline-success m-2"
                    onClick={handlePlayBtn}
                  >
                    <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                  </button>
                )}
                <button className="btn btn-outline-success m-2">
                  <FontAwesomeIcon icon={faForward}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AudioPlayer;
