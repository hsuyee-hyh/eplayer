import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
function Navbar(props) {
  const [user, setUser] = useState(null);

  // console.log(props.userobj);
  useEffect(() => {
    setUser(props.userobj);
  }, [props.userobj]);

  function handleSubmit() {}
  return (
    <>
      <div className="container-fluid">
        <nav
          className="navbar sticky-top justify-content-end"
          style={{
            background: "linear-gradient(0deg, #222831 0%, #13151a 100%)",
            paddingLeft: "320px",
          }}
        >
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </div>
          </div>

          {/* <div className="dropdown"> */}
          {/* <button */}
          {/* // className="btn btn-lg text-success my-sm-0 dropdown" */}
          {/* // type="submit" */}
          {/* // onSubmit={handleSubmit} */}
          {/* // id="navbarDropdown" */}
          {/* // role="button" */}
          {/* // data-toggle="dropdown" */}
          {/* // aria-haspopup="true" */}
          {/* // aria-expanded="false" */}
          {/* // > */}
          {/* <div className="d-flex flex-row align-items-center "> */}
          {/* <FontAwesomeIcon */}
          {/* // icon={faCircleUser} */}
          {/* // className="mr-sm-2 px-3" */}
          {/* // style={{ fontSize: "1.8rem" }} */}
          {/* // ></FontAwesomeIcon> */}
          {/* <p className="h4 pt-2 pe-3">{user?.foundUser.username}</p> */}
          {/* </div> */}
          {/* </button> */}
          {/* <div class="dropdown-menu" aria-labelledby="navbarDropdown"> */}
          {/* <a class="dropdown-item" href="#"> */}
          {/* Logout */}
          {/* </a> */}
          {/* </div> */}
          {/* </div> */}
        </nav>
      </div>
    </>
  );
}

export default Navbar;
