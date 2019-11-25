const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  genre: {
    type:[String],
    default:undefined
  },
  authorId: String,
  year: {
    type:Number,
    default:undefined,
    min:1500,
    max:2050
  },
  description:{
    type:String,
    required:true
  },
  pages:{
    type:Number,
    min:5,
    max:10000
  },
  language:{
    type:String
  }
});

module.exports = mongoose.model('Book', booksSchema);