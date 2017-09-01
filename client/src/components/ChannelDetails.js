import React, { Component } from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';

import {
    gql,
    graphql,
} from 'react-apollo';

const NotFound = () => {
  return (
    <div className="NotFound">Channel Not Found</div>
  );
};

const messagesSubscription = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
    }
  }
`

class ChannelDetails extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: this.props.match.params.channelId,
      },
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newMessage = subscriptionData.data.messageAdded;

        // don't double add the message
        if (!prev.channel.messages.find((msg) => msg.id === newMessage.id)) {
          return Object.assign({}, prev, {
            channel: Object.assign({}, prev.channel, {
              messages: [...prev.channel.messages, newMessage]
            })
          });
        } else {
          return prev;
        }
      }
    })
  }

  render() {
    const { data: {loading, error, channel }, match } = this.props;

    return (<div>
        {loading && <ChannelPreview channelId={match.params.channelId}/>}
        {error && <p>{error.message}</p>}
        {!loading && channel && <div>
          <div className="channelName">
            {channel.name}
          </div>
          <MessageList messages={channel.messages}/>
        </div>}
        {!loading && channel == null && <NotFound />}
        </div>
    );
  }
}

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    channel(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId },
  }),
})(ChannelDetails));
