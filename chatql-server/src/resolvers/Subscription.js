const { MESSAGE_SUBSCRIPTION_TOPIC } = require('../constants');

const newMessage = {
    subscribe: (parent, args, context) => {
        return context.pubSub.asyncIterator(MESSAGE_SUBSCRIPTION_TOPIC)
    }
}

module.exports = {
    newMessage,
}