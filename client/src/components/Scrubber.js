import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Search from "./Search";
import Results from "./Results";
import SavedArticles from "./SavedArticles";

import "../css/Scrubber.css";

class Scrubber extends Component {
  state = {
    search: "",
    startDate: "",
    endDate: "",
    articles: [],
    savedArticles: []
  };

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  handleStartChange = event => {
    this.setState({ startDate: event.target.value });
  };

  handleEndChange = event => {
    this.setState({ endDate: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let beginDate = this.state.startDate || 1900;
    beginDate += "0101";
    let endDate = this.state.endDate || 2018;
    endDate += "1231";

    fetch(`/api/scrub/${this.state.search}/${beginDate}/${endDate}`)
      .then(res => res.json())
      .then(articles => {
        this.setState({ articles });
      });
  };

  handleSave = event => {
    event.persist();
    fetch("/api/saveArticle", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: event.target.parentElement.firstChild.firstChild.textContent,
        url: event.target.parentElement.firstChild.firstChild.getAttribute(
          "href"
        )
      })
    }).then(res => {
      let articles = this.state.articles;
      const splicedArticle = articles.splice(
        event.target.parentElement.getAttribute("data-id"),
        1
      )[0];
      const savedArticle = {
        title: splicedArticle.title,
        url: splicedArticle.url,
        date: "Just Now"
      };

      this.setState({
        savedArticles: [...this.state.savedArticles, savedArticle]
      });
      this.setState({
        articles
      });
    });
  };

  handleRemove = event => {
    event.persist();
    fetch(
      `/api/deletedSavedArticle/${event.target.parentElement.getAttribute(
        "data-id"
      )}`,
      { method: "DELETE" }
    ).then(res => {
      let articles = this.state.savedArticles;
      articles.splice(event.target.parentElement.getAttribute("data-index"), 1);

      this.setState({
        savedArticles: articles
      });
    });
  };

  getSavedArticles = event => {
    fetch("/api/savedArticles")
      .then(res => res.json())
      .then(savedArticles => {
        this.setState({ savedArticles });
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <div className="nav-wrapper blue">
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li>
                  <Link to="/">Search</Link>
                </li>
                <li>
                  <Link to="/savedArticles">Saved Articles</Link>
                </li>
              </ul>
            </div>
          </nav>
          <header className="App-header">
            <div className="container">
              <h1>New York Times Article Scrubber</h1>
              <h4>Search for and annotate articles of interest!</h4>
            </div>
          </header>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <Search
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleStartChange={this.handleStartChange}
                  handleEndChange={this.handleEndChange}
                />
                <Results
                  articles={this.state.articles}
                  handleSave={this.handleSave}
                />
              </div>
            )}
          />

          <Route
            exact
            path="/savedArticles"
            render={props => (
              <SavedArticles
                handleRemove={this.handleRemove}
                savedArticles={this.state.savedArticles}
                getSavedArticles={this.getSavedArticles}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Scrubber;
