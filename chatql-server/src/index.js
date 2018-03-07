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
const app = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        azure: azure,
        pubSub
    })
})

app.express.post(app.options.endpoint, (req, res, done) => getUser(req, res, done, azure));

// app.use((req, res, next) => {
//     const options = { Keys: [COOKIE_SECRET_KEY]};
//     req.cookies = new Cookies(req, res, options);
//     next();
// })

app.start(() => console.log('Server is running on http://localhost:4000'));
