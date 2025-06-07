import { useEffect, useState } from "react";

function Playlist() {
  let [userData, setUserData] = useState();

  let [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://random-data-api.com/api/users/random_user?size=10"
        );
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2>user information</h2>
        {Array.isArray(userList) &&
          userList.map((user, index) => <p key={index}>{user.username}</p>)}
      </div>
    </>
  );
}

export default Playlist;
