import { Link, useSearchParams, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faList,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Sidebar() {
  // parameters for the sidebar links
  // const [searchParams] = useSearchParams();
  // const userid = searchParams.get("userid");
  // const userid = props.userObj;
  // console.log("userObj from props of Sidebar: ", props.userObj);

  const location = useLocation();
  console.log("location: ", location);
  console.log("location.state: ", location.state.user);
  const userid = location.state?.user.data.foundUser.id || null;

  console.log("this is from sidebar's userid: ", userid);

  return (
    <aside
      style={{
        minWidth: "330px",
        // border: "3px solid red",
        position: "fixed",
        zIndex: 1040,
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
        <Link
          to={`/home?userid=${userid}`}
          state={{ user: location.state.user }} // passing user data to Home component
          // that state is preserved when navigating via the Sidebar
          className="cus-sidebar-btn"
        >
          <FontAwesomeIcon
            icon={faHome}
            className="mx-4 ms-5"
          ></FontAwesomeIcon>
          <span>Home</span>
        </Link>

        <Link
          to={`/playlists?userid=${userid}`}
          state={{ user: location.state.user }} // passing user data to Playlists component
          className="cus-sidebar-btn"
        >
          <FontAwesomeIcon
            icon={faList}
            className="mx-4 ms-5"
          ></FontAwesomeIcon>
          <span>Playlists</span>
        </Link>

        <Link
          to={`/savedsongs?userid=${userid}`}
          state={{ user: location.state.user }}
          className="cus-sidebar-btn"
        >
          <FontAwesomeIcon
            icon={faFolder}
            className="mx-4 ms-5"
          ></FontAwesomeIcon>
          <span>Saved Songs</span>
        </Link>

        <Link to={`/player?userid=${userid}`} className="cus-sidebar-btn">
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
