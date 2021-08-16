import React, { useState, useEffect } from "react";
import "./App.css";
import CommentSection from "./Components/CommentSection";

function App() {
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    getComments(0);
  }, []);

  const getComments = (pageLimit) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${limit+pageLimit}`)  //Limit has been changed dynamically on every click of see more button
      .then((response) => response.json())
      .then((json) => setComments(json));
  };

  return (
    <div className="CommentSection__container">
      <h1>Comments</h1>
      <CommentSection comments={comments} />
      <div className="input-group-append">
        <button
          className="btn btn-primary btn-outline-secondary"
          type="button"
          onClick={() => {
            setLimit(limit + 3);
            getComments(3);
          }}
          style={{ marginLeft: "20%" }}
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default App;
