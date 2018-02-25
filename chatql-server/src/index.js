const { GraphQLServer } = require('graphql-yoga')
const azure = require('azure-storage');

const Query = require('./resolvers/Query'); 
const Mutation = require('./resolvers/Mutation'); 
const Subscription = require('./resolvers/Subscription'); 

const { CONNECTION_STRING } = require('./constants');

const resolvers = {
    Query,
    Mutation,
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        azure: azure,
    })
})

server.start(() => console.log('Server is running on http://localhost:4000'));
