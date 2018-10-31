import React from "react";
import moment from "moment";
import "../css/Results.css";

const Results = props => {
  return (
    <div className="container">
      <h2>Results</h2>
      {props.articles.length ? null : (
        <p>Perform a search to display results.</p>
      )}
      {props.articles.map((article, index) => (
        <div className="article" key={index} data-id={index}>
          <p>
            <a href={article.url}>{article.title}</a>
          </p>
          <p>Date Published: {moment(article.date).format("MMMM Do YYYY")}</p>
          <button className="btn" onClick={props.handleSave}>
            Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default Results;
