'use strict';

module.exports = function(mongoose, models){
  let BlogSchema = new mongoose.Schema({
    title: String,
    auther: String,
    body: String,
    comments: [
      {body: String, date: Date}
    ],
    date: {
      type: Date, default: Date.now
    },
    hidden: Boolean
  });

  let Blog = mongoose.model('Blog', BlogSchema);
  models.Blog = Blog;
};
