const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');

const { getUserId } = require('./utils');



let links = [{
  id: 'link-0',
  url: 'howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query,
  Mutation,
  User,
  Link
}


//   Link: {
//     id: (parent) => parent.id,
//     description: (parent) => parent.description,
//     url: (parent) => parent.url,
//   }
// }

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({req}) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
