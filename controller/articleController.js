const request = require("request");
const mongoose = require("mongoose");
const Article = require("../models/Article");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact");

module.exports = {
  scrub: function(query, cb) {
    request.get(
      {
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        qs: {
          "api-key": process.env.NYT_API_KEY,
          q: query.q,
          begin_date: query.begin_date,
          end_date: query.end_date
        }
      },
      function(err, response, body) {
        body = JSON.parse(body);

        const article = [];

        for (let i = 0; i < 5; i++)
          article.push({
            title: body.response.docs[i].headline.main,
            url: body.response.docs[i].web_url,
            date: body.response.docs[0].pub_date
          });

        cb(article);
      }
    );
  },

  saveArticle: function({ title, url }, cb) {
    const article = new Article({
      title,
      url
    });
    article.save().then(() => cb(article));
  },

  getSavedArticles: function(cb) {
    Article.find({}).then(result => cb(result));
  },

  deleteSavedArticle: function(id, cb) {
    Article.findByIdAndDelete(id, (err, response) => {
      cb(response);
    });
  }
};
