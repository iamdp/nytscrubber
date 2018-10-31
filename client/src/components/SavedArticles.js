import React, { Component } from "react";
import "../css/SavedArticles.css";
import moment from "moment";

class SavedArticles extends Component {
  componentDidMount() {
    this.props.getSavedArticles();
  }

  render() {
    return (
      <div className="container">
        <h2>Saved Articles</h2>
        {this.props.savedArticles.map((article, index) => (
          <div
            className="saved-article"
            key={index}
            data-id={article._id}
            data-index={index}
          >
            <p>
              <a href={article.url} target="_new">
                {article.title}
              </a>
            </p>
            <p>Date Saved: {moment(article.date).format("MMMM Do YYYY")}</p>
            <button className="btn" onClick={this.props.handleRemove}>
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default SavedArticles;
