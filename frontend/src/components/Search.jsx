import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../css/main.css";
import "../css/search.css";

function Search(props) {
  // const [user, setUser] = useState(null);
  // useEffect(()=>{
  // setUser(props.userobj);
  // },[props.userobj]);

  const data = props.userobj.data;
  const user = props.userobj.data.foundUser;
  console.log(props.userobj.data.foundUser);

  // state
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("Youtube");

  const [apiresponsetest, setApiResponseTest] = React.useState("");

  let encodedSearchQuery;
  encodedSearchQuery ? encodeURIComponent(searchQuery) : "United States";

  // fetch recent-search
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  const [userSearchList, setUserSearchList] = useState([]);
  const [responseResult, setResponseResult] = useState(null);
  const [youtubeResponse, setYoutubeResponse] = useState([]);

  const userid = props.userid;
  console.log(`userid: ${userid}`);
  const [recentSearch, setRecentSearch] = useState(null);
  // checking localStorage jwtToken
  const jwtToken = localStorage.getItem("jwtToken");
  if (!jwtToken) {
    return null;
  }
  useEffect(() => {
    if (!jwtToken) {
      Navigate("/");
    }
  }, [jwtToken]);

  useEffect(() => {
    const fetchRecentSearch = async () => {
      try {
        console.log("This is from useEffect from GET method.");
        const response = await fetch(
          `http://localhost/esound/backend/router.php?userid=${userid}`,
          {
            method: "GET",
            headers: {
              Authorization: jwtToken,
            },
          }
        );
        const data = await response.json();
        // response data
        if (data.status == "success") {
          setError(false);
          setUserSearchList(data.data);
        } else {
          setError(true);
          setErrorMessage(data.message);
        }

        console.log(data);
        // console.log(data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentSearch();
  }, [userid, jwtToken]);

  // a from API
  // const fetchData = async () => {
  // try {
  // const response = await fetch(
  // `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCUgLu1-71PdLmmZkDC5y4Kw&key=AIzaSyA8u4gMYhXmVzWc9ykYOynh3gcKmht8hQQ`
  // );
  // const data = await response.json();
  // console.log(data);
  // setSearchResults(data.items);
  // console.log("API response: ", data.items);
  // } catch (error) {
  // alert(error.message);
  // }
  // };
  // const cacheData = fetchData();

  // Search Button Submit
  function handleSearchForm(event) {
    event.preventDefault();
    // get form data
    const element = new FormData(event.currentTarget);
    const formData = element.entries();
    console.log(`formData is ${formData}`);

    // convert formData into javascript object
    const jsObj = Object.fromEntries(formData);
    console.log("jsobj is ", jsObj);

    const searchQuery = jsObj.searchQuery;

    // set state
    // encoded user input into URI patter like 'IU singer = IU%20singer'
    setSearchQuery(searchQuery);
    const encodedSearchQuery = encodeURIComponent(searchQuery);
    console.log(`encodedSearchQuery is ${encodedSearchQuery}`);

    const fetchRecentData = async () => {
      try {
        console.log("hey, this is fetch Recentdata.");
        const response = await fetch(
          `http://localhost/esound/backend/router.php?userid=${userid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: jwtToken,
            },
            credentials: "include",
            body: JSON.stringify({
              action: "recentsearch",
              userid: { userid },
              searchTerm: jsObj.searchQuery,
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`Network error: ${response.ok}`);
        }
        const data = await response.json();
        const arr = data.data;
        setError(false);
        setResponseResult(arr);
        // setRecentSearchList((prevList) => [...prevList, arr]);
        // console.log(`Recent Search data is...`);
        // console.log(error);
        // arr.forEach((element) => {
        // console.log(element);
        // });

        // 2nd api call: Youtube
        const youtubeResponse = await fetch(
          "http://localhost/esound/backend/config/YouTubeApiCall.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: jwtToken,
            },
            credentials: "include",
            body: JSON.stringify({
              userid: { userid },
              searchTerm: jsObj.searchQuery,
              jwtToken: jwtToken,
            }),
          }
        );
        if (!youtubeResponse.ok) {
          throw new Error(
            `response status from youtube api is ${youtubeResponse.ok}`
          );
        }
        const youtubeData = await youtubeResponse.json();
        console.log(`Youtube response data is `);
        setYoutubeResponse(youtubeData.data);
        console.log(youtubeData.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentData();

    /* fetch data from youtube api
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost/esound/backend/data1.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(jsObj), // convert JS Object into JSON string
          }
        );
        const data = await response.json();
        console.log("data is ", data);
        setApiResponseTest(data.message);
        console.log("API response: ", data.message);
        // setSearchResults(data.items);
        // console.log("API response: ", data.items);
      } catch (error) {
        console.log(`error from React :${error.message} <br/>`);
      }
    };
    fetchData();
    */
  }

  // const [data, setData] = useState(null);
  return (
    <>
      <div className="row my-3">
        <h3 className="col ms-4 text-success  font-weight-bold">
          Welcome, {user.username}!
        </h3>
        <div className="col me-5">
          <form onSubmit={handleSearchForm}>
            <div className="d-flex">
              <input
                className="form-control mr-sm-2"
                name="searchQuery"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ marginRight: "10px", minWidth: "150px" }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0 "
                type="submit"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-2" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row mx-3">
        <h5>Recent Search for userid {props.userid}</h5>
        {error && <div className="alert alert-warning">{errorMsg}</div>}
        {!error && (
          <div>
            <div className="border rounded p-3 mb-3 cus-recent-search">
              {userSearchList.length === 0 ? (
                <div className="text-muted text-center">
                  No recent searches found.
                </div>
              ) : (
                <ul
                  // className="list-group list-group-flush"
                  className="cus-recent-search-ul"
                >
                  {userSearchList.map((item, index) => (
                    <li
                      key={index}
                      // className="list-group-item d-flex flex-column align-items-start mb-2 rounded shadow-sm"
                      className="cus-recent-search-li"
                    >
                      <span className="fw-bold text-success">
                        {item.search_term}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* api card list */}
            <div className="mt-5">
              {youtubeResponse &&
                youtubeResponse.map((item, index) => (
                  <div
                    key={index}
                    className="card my-3"
                    style={{ maxWidth: "300px" }}
                  >
                    <div className="card-body">
                      <img
                        src={item.image_link}
                        alt="youtube img link"
                        className="card-img-top"
                      />
                      <p className="card-text">{item.keyword}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
