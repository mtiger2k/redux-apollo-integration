import React from 'react';
import {
  Link
} from 'react-router-dom'

import {
    gql,
    graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';

const ChannelsList = ({ data: {loading, error, channels }}) => {
  return (<div>
         {loading && <p>Loading ...</p>}
        {error && <p>{error.message}</p>}
        {!loading && <div className="channelsList">
          { channels.map( ch =>
            (<div key={ch.id} className={'channel ' + (ch.id < 0 ? 'optimistic' : '')}>
              <Link to={ch.id < 0 ? `/` : `channel/${ch.id}`}>
                {ch.name}
              </Link>
            </div>)
          )}
          <AddChannel />
        </div>}
        </div>
  );
};

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery, {
  options: { pollInterval: 5000 },
})(ChannelsList);
