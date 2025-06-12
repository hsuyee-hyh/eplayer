import { Router, Routes, Route } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/main.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Playlists from "./components/Playlists";
import SavedSongs from "./components/SavedSongs";
import AudioPlayer from "./components/AudioPlayer";
import Home from "./components/Home";
import Player from "./components/AudioPlayerTest";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import NewPlaylistForm from "./components/NewPlaylistForm";

function MyApp() {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        {/* <Route path="home/:userid" element={<Home />}></Route> */}
        <Route path="home" element={<Home />}></Route>
        <Route path="playlists" element={<Playlists />}></Route>
        <Route path="savedsongs" element={<SavedSongs />}></Route>

        <Route path="playlists/new-playlist" element={<NewPlaylistForm />}></Route>

        {/* home route to every sub routes(playlists, saved playlists, player) */}
        {/* <Route path="index" element={<Home />}> */}
        {/* <Route path="home" element={<Search/>}></Route> */}
        {/* <Route path="playlists" element={<Playlists />}></Route> */}
        {/* <Route path="savedplaylists" element={<SavedPlaylists />}></Route> */}
        {/* <Route path="player" element={<Player />}></Route> */}
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default MyApp;
