import React, { useState } from "react";
import { useEffect } from "react";
function Testing() {
  const [playlistItems, setPlaylistItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=25&q=linear%20regression&key=AIzaSyA8u4gMYhXmVzWc9ykYOynh3gcKmht8hQQ"
        );
        const data = await response.json();
        console.log("API response: ", data.items);
        await setPlaylistItems(data.items);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Testing YouTube PlaylistItems</h1>
      {playlistItems &&
        playlistItems.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.snippet.title}</h2>
              <a
                href={"https://www.youtube.com/watch?v=" + item.id.videoId}
                target="_blank"
              >
                <img src={item.snippet.thumbnails.default.url} alt="" />
              </a>
            </div>
          );
        })}
    </>
  );
}
export default Testing;
