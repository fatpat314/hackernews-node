function newLinkSubscription(parent, args, context, info) {
    return context.pubsub.asyncIterator("NEW_LINK")
}

function newVoteSubscription(parent, args, context, info){
    return context.pubsub.asyncIterator("NEW_VOTE")
}

const newLink = {
    subscribe: newLinkSubscription,
    resolve: payload => {
        return payload
    },
}

const newVote = {
    subscribe: newVoteSubscription,
    resolve: payload => {
        return payload
    },
}

module.exports = {
    newLink,
    newVote,
}
