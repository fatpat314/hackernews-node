const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const fs = require('fs');
const path = require('path');

const { ApolloServer } = require('apollo-server');



let links = [{
  id: 'link-0',
  url: 'howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context, info) => {
      return context.prisma.link.findMany()
    },
    // link(id: ID!): Link,
  },
  Mutation: {
    // updateLink(id: ID!, url: String, description:String): Link

    // deleteLink(id: ID!) Link
    // 2
    post: (parent, args, context) => {
       const newLink = context.prisma.link.create({
         data: {
           url: args.url,
           description: args.description,
         },
       })
       return newLink
    }
  },
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
  context: {
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );
