const graphql = require('graphql');
const _ = require('lodash');

// Models from mongoDb
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) },
    language: { type: GraphQLString },
    pages: { type: GraphQLInt },
    year: { type: GraphQLInt },
    authorId: { type: GraphQLID },
    description: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve (parent, args) {
        return Author.findById(parent.authorId);
      } 
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name:'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nationality: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return Book.find({ authorId: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve (parent, args) {
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType), 
      resolve (parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        nationality: { type: GraphQLString }
      },

      resolve (parent, args) { 
        let author = new Author({
          name: args.name,
          nationality: args.nationality
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLList(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        language: { type: GraphQLString },
        pages: { type: GraphQLInt },
        year: { type:GraphQLInt },
        authorId: { type: GraphQLID}
      },

      resolve (parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          description: args.description,
          language: args.language,
          pages: args.pages,
          year:  args.year,
          authorId: args.authorId
        });

        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
