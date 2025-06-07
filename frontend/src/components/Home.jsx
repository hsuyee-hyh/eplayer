import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "../css/main.css";
import Sidebar from "./Sidebar";
import Search from "./Search";
import Navbar from "./Navbar";

function Home() {
  const location = useLocation();
  const dataObj = location.state?.user;
  // console.log("data: ", dataObj);

  const UrlParams = new URLSearchParams(location.search);
  const userid = UrlParams.get("userid");
  // console.log(`userid: ${userid}`);

  // will render whether dataObj exist or not
  const navigate = useNavigate();
  useEffect(() => {
    if (!dataObj) {
      navigate("/");
    }
  }, [dataObj, navigate]);

  // doesn't render the HOME return component
  // return as 'null'
  // and then navigate to ("/")
  if (!dataObj) {
    return null;
  }
  return (
    <>
      <div className="container-fluid px-0">
        <Sidebar />
        <div style={{ paddingLeft: "320px" }}>
          <Navbar userobj={dataObj} />
          <Search userobj={dataObj} userid={userid} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
