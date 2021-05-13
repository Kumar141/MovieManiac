import React, { useState, useEffect } from "react";
import axios from "axios";

// import ShowPosts from "./ShowPosts";

function GetPosts() {
  const [posts, setPosts] = useState();
  var setIt;
  useEffect(() => {
    getEm();
  }, []);

  const getEm = () => {
    axios
      .get("/posts")
      .then((res) => {
        // posts = res.data;
        setIt = res.data;
        // setPosts(setIt.map((obj) => ({ ...obj })));
        // console.log(posts);
        console.log(setIt);
      })
      .catch((err) => console.log(err));
  };
  console.log("hey" + setIt);
  // posts[0].title;
  return <div></div>;
}

export default GetPosts;
