import React, { Component } from 'react'

import PageWrapper from '../lib/page/PageWrapper';
import PageHeader from '../lib/page/PageHeader';
import Breadcrumb from '../lib/page/Breadcrumb';
import PageContent from '../lib/page/PageContent';

import ChannelDetails from './ChannelDetails'

class ChannelDetailsPage extends Component {

  render() {
    return (
    <PageWrapper>
      <PageHeader
        title="Channel detail page"
        description="Welcome to channel detail page"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'channel detail' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <ChannelDetails channelId={this.props.match.params.channelId}/>
      </PageContent>
    </PageWrapper>

    )
  }
}

export default ChannelDetailsPage