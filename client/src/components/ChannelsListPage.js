import React, { Component } from 'react'

import PageWrapper from '../lib/page/PageWrapper';
import PageHeader from '../lib/page/PageHeader';
import Breadcrumb from '../lib/page/Breadcrumb';
import PageContent from '../lib/page/PageContent';

import ChannelsListWithData from '../components/ChannelsListWithData'

class ChannelsListPage extends Component {

  render() {
    return (
    <PageWrapper>
      <PageHeader
        title="Channel List page"
        description="Welcome to channel list page"
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'channel list' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <ChannelsListWithData />
      </PageContent>
    </PageWrapper>

    )
  }
}

export default ChannelsListPage