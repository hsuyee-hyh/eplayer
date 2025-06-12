import { useLocation, useNavigate } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/main.css";

function NewPlaylistForm() {
  const navigate = useNavigate();
  const location = useLocation();
  // const user = location.state.user.data.foundUser;
  // const jwtToken = location.state.user.data.token;
  console.log("NewPlaylistForm component rendered");

  const handleSubmit = (event) => {
    event.preventDefault();
    const element = event.target;
    const formData = new FormData(element);
    const playlistName = formData.get("playlistName");
    const playlistDescription = formData.get("playlistDescription");
    console.log("Form submitted with data:", {
      playlistName,
      playlistDescription,
    });

    fetch("http://localhost/esound/backend/src/actions/new-playlist.php", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: location.state.user.data.foundUser.id,
        title: playlistName,
        description: playlistDescription,
      }),
    })
      .then((response) => response.json())
      .then((data) => navigate(-1));
  };
  return (
    <>
      <div
        className="container"
        style={{ maxWidth: "600px", paddingTop: "50px" }}
      >
        <h2 className="text-center mb-4 text-success">Create New Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="playlistName">Title</label>
            <input
              type="text"
              className="form-control"
              name="playlistName"
              id="playlistName"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="playlistDescription">Description</label>
            <textarea
              className="form-control"
              type="text"
              name="playlistDescription"
              id="playlistDescription"
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewPlaylistForm;
