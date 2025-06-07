import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faList,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  return (
    <aside
      style={{
        minWidth: "330px",        
        // border: "3px solid red",
        position:"fixed",
        zIndex: 1040
      }}
      
    >
      <div className="d-flex flex-row justify-content-center align-items-center me-5">
        <img
          src={logo}
          alt=""
          style={{
            minWidth: "90px",
            minHeight: "90px",
            margin: "0px",
            padding: "0px",
          }}
        />
        <h1>ePlayer</h1>
      </div>

      <div className="d-flex flex-column">
        
          <Link to="/" className="cus-sidebar-btn">
            <FontAwesomeIcon
              icon={faHome}
              className="mx-4 ms-5"
            ></FontAwesomeIcon>
            <span>Home</span>
          </Link>
        

        <Link to="playlists" className="cus-sidebar-btn">
          <FontAwesomeIcon
            icon={faList}
            className="mx-4 ms-5"
          ></FontAwesomeIcon>
          <span>Playlists</span>
        </Link>

        <Link to="savedplaylists" className="cus-sidebar-btn">
          <FontAwesomeIcon
            icon={faFolder}
            className="mx-4 ms-5"
          ></FontAwesomeIcon>
          <span>Saved Songs</span>
        </Link>

        <Link to="player" className="cus-sidebar-btn">
          <FontAwesomeIcon
            icon={faPlay}
            className="mx-4 ms-5"
          ></FontAwesomeIcon>
          <span>Play</span>
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
