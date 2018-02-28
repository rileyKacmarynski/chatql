const { GraphQLServer, PubSub } = require('graphql-yoga')
const azure = require('azure-storage');
const { getUser } = require('./middleware/get-user');

const Query = require('./resolvers/Query'); 
const Mutation = require('./resolvers/Mutation'); 
const Subscription = require('./resolvers/Subscription'); 

const { CONNECTION_STRING } = require('./constants');

const resolvers = {
    Query,
    Mutation,
    Subscription
};

const pubSub = new PubSub();
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        azure: azure,
        pubSub
    })
})

server.express.post(server.options.endpoint, (req, res, done) => getUser(req, res, done, azure));
server.start(() => console.log('Server is running on http://localhost:4000'));
