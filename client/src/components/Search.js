import React from "react";

const Search = props => (
  <div className="container">
    <h2>Search</h2>
    <div className="row">
      <form className="col s12" onSubmit={props.handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">title</i>
            <input
              id="topic"
              type="text"
              className="validate"
              onChange={props.handleChange}
            />
            <label htmlFor="topic">Topic</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">date_range</i>
            <input
              id="start_year"
              type="number"
              className="validate"
              min="1800"
              max="2018"
              onChange={props.handleStartChange}
            />
            <label htmlFor="start_year">Start Year</label>
          </div>

          <div className="input-field col s6">
            <i className="material-icons prefix">date_range</i>
            <input
              id="end_year"
              type="number"
              className="validate"
              min="1800"
              max="2018"
              onChange={props.handleEndChange}
            />
            <label htmlFor="end_year">End Year</label>
          </div>
        </div>
        <button className="btn">Search</button>
      </form>
    </div>
  </div>
);

export default Search;
